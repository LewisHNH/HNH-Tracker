// Netlify Function: reads a betting slip screenshot and returns structured bets.
// The API key lives here as an environment variable — never in the browser.

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // ~5MB decoded

// Best-effort throttle. Serverless instances are recycled, so this slows abuse
// rather than stopping it. Add Netlify's own rate limiting if it becomes a problem.
const hits = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;

function throttled(ip) {
  const now = Date.now();
  const rec = hits.get(ip) || { count: 0, reset: now + WINDOW_MS };
  if (now > rec.reset) { rec.count = 0; rec.reset = now + WINDOW_MS; }
  rec.count += 1;
  hits.set(ip, rec);
  if (hits.size > 5000) hits.clear(); // crude memory guard
  return rec.count > MAX_PER_WINDOW;
}

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

export default async (request) => {
  if (request.method !== "POST") return json(405, { error: "Use POST." });

  const key = Netlify.env.get("ANTHROPIC_API_KEY");
  if (!key) return json(500, { error: "Server is not configured." });

  const ip = request.headers.get("x-nf-client-connection-ip") || "unknown";
  if (throttled(ip)) return json(429, { error: "Too many requests." });

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: "Bad request body." });
  }

  const { media_type, data } = payload || {};
  if (!data || typeof data !== "string") return json(400, { error: "No image supplied." });
  if (data.length * 0.75 > MAX_IMAGE_BYTES) return json(413, { error: "Image too large." });
  if (!/^image\/(png|jpeg|jpg|webp|gif)$/.test(media_type || "")) {
    return json(400, { error: "Unsupported image type." });
  }

  const today = new Date().toISOString().slice(0, 10);

  const prompt = `Read this betting slip or bet history screenshot. Return ONLY a JSON array — no prose, no markdown fences.
One object per bet:
{"date":"YYYY-MM-DD","selection":"","track":"","sport":"horse"|"greyhound","type":"single"|"ew"|"multi","odds":"fraction or decimal","stake":"number","ewTerms":"1/5","result":"pending"|"won"|"placed"|"lost"|"void","legs":[{"selection":"","odds":"","result":"pending"}]}
Rules: stake is the unit stake — for each-way give the single-side stake, not the doubled total. Only include "legs" for multiples. Use "" for anything not visible, and today (${today}) if no date shows. Only mark "greyhound" when the track or context clearly indicates dogs. Never invent a result you cannot see — use "pending". Return [] if there are no bets.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type, data } },
            { type: "text", text: prompt },
          ],
        }],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Anthropic error", res.status, detail);
      // Surfaced so the cause is visible without digging through logs.
      return json(502, { error: "Could not read the slip.", status: res.status, detail: detail.slice(0, 300) });
    }

    const out = await res.json();
    const text = (out.content || []).map((c) => c.text || "").join("\n");

    let bets;
    try {
      bets = JSON.parse(text.replace(/```json|```/g, "").trim());
    } catch {
      return json(422, { error: "Could not read the slip." });
    }
    if (!Array.isArray(bets)) bets = [];

    return json(200, { bets });
  } catch (err) {
    console.error(err);
    return json(502, { error: "Could not read the slip." });
  }
};

export const config = { path: "/api/read-slip" };
