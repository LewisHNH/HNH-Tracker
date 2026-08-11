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
{"date":"YYYY-MM-DD","selection":"","track":"","sport":"horse"|"greyhound","type":"single"|"ew"|"multi","odds":"fraction or decimal","stake":"number","slipTotalStake":"number","ewTerms":"1/5","result":"pending"|"won"|"placed"|"lost"|"void","legs":[{"selection":"","odds":"","result":"pending"}]}

"slipTotalStake" is the total stake printed on the slip, exactly as shown (£30.00 -> 30). This lets us check the arithmetic, so copy it faithfully.
BET TYPE — read this carefully, it is the most common mistake:
Phrases like "Win or Each Way", "Win and Each-way", "Win/EW" describe the market the bookmaker OFFERED. They do NOT mean an each-way bet was placed. Default to "single".
Only use "ew" when the slip shows the bet was actually placed each-way, for example:
  - the bet type line reads "Each Way" / "E/W" on its own, without "Win or"
  - the stake is written as two parts, e.g. "£15 E/W" alongside a £30 total, or "2 x £15"
  - the return is broken into separate win and place parts
If in doubt, use "single". A wrongly marked each-way bet doubles the recorded stake and corrupts the figures.

STAKE — give the single-side stake as a plain number. For a genuine each-way bet where the slip shows a £30 total made of £15 win and £15 place, the stake is 15. For everything else it is the stake exactly as printed.

RESULT — read only what is shown. A slip marked Lost with £0.00 returned is "lost". A slip marked Won, or showing a positive return, is "won". If nothing indicates the outcome, use "pending" — never guess.

OTHER: Only include "legs" for multiples. Use "" for anything not visible, and today (${today}) if no date shows. Mark "greyhound" when the context indicates dogs — trap numbers ("Trap 4"), or greyhound tracks such as Monmore, Romford, Nottingham, Crayford, Hove, Sheffield, Newcastle, Sunderland, Perry Barr, Towcester, Central Park, Doncaster, Harlow, Kinsley, Pelaw Grange, Swindon, Yarmouth. Otherwise use "horse".
Return [] if there are no bets.`;

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

    /* Guard against the classic misread: "Win or Each Way" is the market on
       offer, not the bet placed. An each-way bet stakes twice, so if doubling
       the stake doesn't match the total printed on the slip, it wasn't one. */
    bets = bets.map((b) => {
      const stake = parseFloat(b.stake);
      const total = parseFloat(b.slipTotalStake);
      if (b.type === "ew" && isFinite(stake) && isFinite(total) && total > 0) {
        const doubled = Math.abs(stake * 2 - total) < 0.01;
        const singled = Math.abs(stake - total) < 0.01;
        if (singled && !doubled) {
          b.type = "single";           // total matches a single stake
        } else if (!doubled && !singled) {
          b.type = "single";           // can't reconcile — the safer reading
        }
      }
      // A genuine each-way slip listing only the combined total: halve it.
      if (b.type === "ew" && isFinite(stake) && isFinite(total)
          && Math.abs(stake - total) < 0.01 && total > 0) {
        b.stake = total / 2;
      }
      delete b.slipTotalStake;
      return b;
    });

    return json(200, { bets });
  } catch (err) {
    console.error(err);
    return json(502, { error: "Could not read the slip." });
  }
};

export const config = { path: "/api/read-slip" };
