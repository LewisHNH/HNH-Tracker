import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  HOOVES & HOUNDS — THE TRACKER                                      */
/*  Singles · each-way · multiples · Rule 4 · points or pounds         */
/* ------------------------------------------------------------------ */

const MARK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACaCAMAAACg5DWcAAAAflBMVEUAAAD+zmr88Gz6ryf+3on+uk7+/AL7sF/386D+0mT8qyb80mL+sTP5/vj3egf+sC3+AAD+6ZD86pH9fn77ukf+u0e6dRavrl39xDX7+da4tiGv//x6enp/fwB0DwAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM0/W0AAAAIHRSTlMA9gwQ+PIBBxKgXV3iBQWfAZ1fAlqhBANlXwQDAgICAU8MZZAAABQSSURBVHja7V2Heps8FxaSkcSQwMZ2RtP2/u/yP0MSYBvwwBl/P54+bdI4Ni9nTwnx33XV5f9D/P99KfVPIdZC1UaYfwpwnhkh/xnAUpgsy5Tu/hXAQFwAXLx4989QuMoQsZD/CGLFgGcQO2elNMZaa4w0UuqfbXsjYEB8LsdaSntBzyn141ArUZbajwBvCqtHNNaWjZW1u912W9BVVZVkhS5V97PoW9aANcrwZldsNput7XrEjMvutpt0ZfEqKqKwVrL9QRSuS0KMgDebQiCw7V/LrKqJtglsduEC0PRGRv8YwLVXGs2SRUhW7BBxcrleKnoCu93O8iXhAoYuhqAr+c4irfyPAEwklgR4Y+FfgFgJVFJOVsU2CuuZ4ZZD2MXe/BgK54TYMeAdOpeA2MK/2gSw2kgkraOrAxIrI1lVKXgkRZ4j5Dw/lKU6fnvAqs7zWmktOrEhZgY8wNaZBX2kSTefmR6tvVIGLLKxAfUerkPT/ADAmgDnSGLJ+gp4WaMCI6Y+52YQ1B/qcISr9Qi4PnpQU6iuNqINKltqPRk4l2UDVw1XgzZZKrZsUpsfIMRNTiQGoWStRYwsRVFcCo6PqiScQmQ5X8k6sXmS3908GVHhbddetlIwYMm+ZGHac3fCA3H5Igoj3nxokvEZ2e8dU+tfSKsMSMw8veMcADB1tZT/OAJvH/JLfoj5xhEXeBrEnQoobDPWWmyK9uICd4J+RgWNf4efKj32QrJCfm8yS4E2NGu0MQI86UwmnEsOcqsBeMfRVDXCvIOH5qz+roAtOsnlC8gtJj0qbUc2dwk2oCbW7zGjKijwTaz7rky9KYxokQkrjIdPRReszkK4D6B1whyDKiTz9+Rsh2ILVtcjU2dggOVIZP+EV6n55I9EzOBpZn0cubvou3wLfwugiqowRstsMySxUa9CHMC54PvuzOzts1UqesQQWn9PyBDAyyJTGP+CGMsxU8ughUPkO4tZI2a7G0Amnf3dMkEv4tcuy1B/wR9APLhBr8VAIxXIpELO6l+E/HeQIIEHpb8ZmaVw24AXfU0DekuNNRK9qmB9RJhnPQtS83YbsyQbzBCAOKjvorPRw0I+ltG7NhAq6VON1PaJrS3p39nbR+3MkIfeiPwWyS8r3jYjuYUvXsvzIJA10nZgcmYhOxNefZL8ksp013o2T8Q78ps1lU7bC6za9ZBR/9p5ScFX7E4c7XdGCj6OtV9EX7FBSyRPpHoGhItUlmIhvPjAH5962lWfJPsCTeaQvpvCnUaxelYJDyAvVKKcHdi1IWy4ttvKOP35eOGSN5WF3QBytcTXwW5jru8EM6k+8SV4d7cW/pFuu2BkpZDd5dyR8uCYajDkjvQdZjirKtRpWOF1n05ftxll3W8w3WC7d2xkK7HAHw7CKSlPHTT5+QLs7K9Nn9S5Q9uBws4Ckc9J5TkTlIoRBFph4gA19Jf4mpbysinFcXPEYYivqdRyQV0DNM731TXmq0NW86sdDi6u3OvyyRcgMitdM3JGB7ABdI4pJECtxJe61E66oGexPKbvfWixqiyFas+1lo6Y6TpU6usiJ7At7Oo++tioF4bYWl7M+UnCXIcUdlF9YNrvi/Bm5DsYA2ZCPRB6yBAuT2hrjfoZyIycTU9GfQGVnSePMnj2YBjN/TUSCIBCsKym7JvH56mKvpwsPrkBTra/RIhVIdZ7NEzlNAleU6oLBNqAd2KGkD9TfbnWMV7gaEfO34MsZiKWacTshPfZ6yt80vXwOsf8vNm6aBz9o4gFIy5nEBNRE+TCflpBxgX53bxhuZu6zB7WIR01AYFS2s8hRohBxSF3fRKRwYMWm9DdIHsH4UEat7HPa5bGmEAKr+McgvwUwG9EYHApP7TYUZ9Z3Sj/KJUxF4Y0XkCsZUoH3uvG35HjIAJr8/I3JJ0Oa+SXrkSMGKtUm/gEQeZeDn66O8ZbreP8KKGoELmEGO1YKk0I/fFkwC370Bv0tgoCXKzl7Bmi8TJi7IKLmXqwFPLZOotLICK4wUUlVssWG/SnQlfQFHkpCSJjyuT5qss6iyoDnX3sapjP2BFH3CYvqllATC9T0n4WYhLhDAv9gZfW9fG88Ii4nkKMXTGcBHnhriEunssn4qV6f8hEyyXyipunt7yjRqgpxL8VxIo1hMbyjxgg1s9CTHks9mUN+VyLkYEAetzE1VrPIkZJ3x+C8mB1go9fuycy9IYyFN2VLFou6txz1wJzHFOIKVYMwUYlw+0U7jmzJdijhCFhVlybmvWghW4EjHZ2DjHEipKrr6BKtjEmf4oHIrVFfZVZ0tHX3bxQ9c0dskuIKdhAyHQ3cbZErj88EfJYVmYv13oaCPj2IcxWYx/2HOIIeVBu+rv65CO7kuC/FlcTGAB7uO3bO/vVImKCPOxnK5RQK+O1KDYQFRZXE5go3NxzIzRcMI94nBGAS6+a0Oy8paKdcNX1BEalBYDv4bVrEFMbzQBytWYOlxKz2cbJD9O1t9x23oi71AmOFywiFmNRxteuFsngk7w55EbA9d1upmoYcTuv0iNkCLRyrMiYFbrMTRTgG9NIL+A21X/uDpA91tNKoWe1nsPeiYoRY1pMkXuCkzP3Nwg4SQK8u9VLpyGQWtzrE2g0T3XdtAtqz1HRicicrzMEJSmNCu7MjY/M6DLPm/sNZKuQretm0eJoKk6URZiiyLn5RZqHBDizN49/GwwEmkfs41Eckchqga1FbOLEkZkDDRYU95eA2AJn9mZKea2Wo/nl8BKJXIp53cX6ax0N7UwQYHO71jngOMSD+z3AFy+Jra95cJrmKTqN/fn3loBMEOCbg2ypDY34PBrHeI0lYiSyXtd5nBXgX7c/LiBwdkUO8qp3ipCFfnZtOCQnbXs7gcUef1O1K9yiJsgNd3o89dLvlnsw7F148+x1pQxbMDwAeVF5PcjQBXdg3MkZmVqNBzXqYP3kMXJLAjynsPSU7yNDe86aYblXnyTA0wkjfwmyTtX6avWU8aIDIlqaQnfuDs6HG2cqTd21blV5Fp3IPn4pxGfYEb4VKS3ugRk4V9IYubYAg4VsKG8KwYnWupPKtH1QDs53+xlQ7XhQJiyUGHqct1jgeY8DUxpibCxSDqISzx5/diZxl8NNMDtsMO77qXhOQl9b7GMBXiqGKmGaLD9QcII7Ovr0g3wqXpcaiK2thnNOWQS86edhzHUCzBZ4aScYKJF9fr6Cpfol3s2zeNgEUbHhAY+hnu6EqV6uQqxIgJfNijlJEKf+/HcpzOqQOxuCXHuy7iXBLOJSmMErqisaq7itZnGuHRS5Ca2DFW9Swg8MunpfrMnUSFiWtQtjH/SQLfF3NdRfyVwszQtEAZaL5K16Uel/24J/ZYr1zJKLG7nOCEsfHhsgyW03xjmNK2EsaWjLq9z+zquuKMDzBW8IKLiOV8BTfcG5aI/TCTiC4T6YQVYAjJvWWDnttufzPMPBNWlaPV5VRuOq5grvOAnwXOdq55I/Jbw8sc9y3mW5Fqwbgd2cT2yN8/BOmdEumJADwBfNjoWwBa5QAAozVeWPPaHVX+HN5SBaPtS/FdjYxinN4UyejO7VUGMW+4u5Lm7lLGaYNTT0hodXXiaTEgor8ZW9xAPRZzH387Hhf3oTyxQuwoCWCU28g/oSrkGhUZhAolaYkknC6xjEZGu5Cc2tqHnhTS5GeIqsbzHB8k5ktOJCPoJ2tFguDeKSBRjcOHwZiYw52roejLYew5IQ7tYtqvfLo8tauCQU8Pjy8gKhCC/CveiHhXVid2X+eVHAJbAuULY9+zSaT8ScdN6Up+8XNFaRuunPV0e4ABhepo4vl/KsrRJllu8nK1dcOt/dTmAtL6GNYO3EmouORkHoEuPcJrzfB/oHVWJ81uangH/Rz37LljKtZ4DBHDXZwUxrAc2bl9pr+nx0SkXqOFiZRT8RsG7f3C92IeayiE6FWzGX4zOaso5OCHZbnb4Z/QC7n5RvznoWEK+oZlxyq3fXzKx10XVqfRsMfvKhCOybc2IZbMoMaPxz7iwoNkhmABlldSjMqZSE8lw34uVUfpvazAVRzNHWyTm99B4+qyxfS0UDSgOPcbsLvpO0qwwaaqZ+iF03p8IcrOiLpnBXnWRVtHidj7gkcfR0aVU75ju7A4Q4ZMfLeJLTFCQWRNbdnMP3sxmgTuHmSRYZhByzAx0Xk3BaDBMa/uQty9f5dDj3FU8MJYbNrY48p7wOuYOT7SaC/dPbk3wCbNK8z2xFWrFR9K2TwRBLj+sLok7hhHo7/K8JAksqRdmLKQryF3ERRp5RvQg1eXTIA9j7mfiqxj/zEu1AtpWhdh1iB3K4fS8GbR/zzwZa5MjZC3ILv+jesFeEuimxO+EIQeQhgYXP7R4T1bI+JUerz2JhXrFB/fwxv8HOJfZ+6wTSxy1neiFixF89Z2j63gW0OTVjAFr1KmJoqVbol3Sqro8XaHy6+5aXfrm+adRpOY7u4LmV1xURKLV7FozRqoO3bUBLcPFPVbyGrut1GgePohQgKINCcXRHhBrdUQeCDBo7BfzsXfaAlTjXXjOZktOogeFuhnCl/q3KV/RuxVp7tYF5vTpy9RyMPLteZYPdyAdsdXHDXdbmAxVHvxnakyBGJwh7pkIH4cK9dZ2kTGc7kl3UygEueKQouy01e4vVRmO1iRRU2GUxShyb/QE+9qDILoXPc1hEKmzfbyMFmg0wD7pFj6+sryzzKl6a5kb1qZ66WV4Y0U+F3NDJPmdttCTX6Mg0VdRgjqtu4wV+TRX9aGw/pvjD4siyG9ylxV6Y8B0IBuNdYmuDNdJRphOeKMOl4G0yvrrmWeppb0Lg+tewIgFsU0MrQtNeVFxtfDiMUge45ceNYgFHrYZFpd+1bkTTqd/ANhrtnJ6LBORYYaHwvm1ieP4AXI+Fw9/mUnovBIcZxobktL1w8RwvpO9+fzjk+SgRRtDsuH/MSbdNmYQ8NtOVjfLtHEMfRgOitGsofdBe3F2LaFH7qAu/b9lviqoQn4y/cA4BPCtZjdakVmczG44Wv0XaAPv/Aemo1RyBFTD0AK+TQ7ggvB8PpfTKOj/Nr/StpQdMZ8lEDWo9NEFRKxWNngkuLMI515aOssBVtd8nSs+rrk6YepCJpo07wwWsD8FtwbpSjkUONUagSVEt6fvWGxWWzHn1PhH8pB2kcfr+oOaCJLBhEEpGDQzSOyDvGp3MHg/8wY0ffdHDpneXV9bLGPXk6RJa0vJcXmEv1bwVhjC5SUI2Jq9ZZYANYnBQPlEnwpNl8laWczzX+yeLueNoLuU83rKJYSOYdbsd1E1XanxQ1AjF9a6kH+xTllxoOUqNTuA1Ae+IvCv25WuNTJ3h8m5gZ5KzrRPPbWOaDsx6Z3sovaBlVhwMfKfevgI9BhbfHfhN4ovwlqEmA4xgU1mkEqu2taiWLMY+lK6wwfeLVk6h+hO/mbx/UyVocgHc3dUmEGJ0yBPer1s3ZTqirx5MqwO/rX1DuO4DXWT2NuzXnsKHqkO6NLhNk9trD0AiS6eYwH79GXwm7W+kRSrysad3kcKHLJ4Ogc6h/tKlcdqkmW0k72Mb3i82oThhsngehknxGDtHyvtPRo+bF+K+80edAX95S5hiEUbARbVP2aqBN2/Ushu1GjvbuDJm+6i10F5RDvfsv002OPIkbMo7cNTbH09lPuOYKlpu15N3BfXUNP60UxM9yzxkMNIVvuVsB7bMA1zpP4GdqyytTllhOl1DpFnvxWhMU7ckwcWeyBmu0dkvePoLz7881x9p4ya/K8nbat0uSRqErIfs4EfZsa4qjJqV/JJOvLl25Odu8urUVrKblV4KwpNtdqhdp+2K1yrDorsakl3wWXJGxsvwwS/0f/xrtAYTIf9+Fl+rlB8oZpRzq3uN6uHqKWwmjgA0tHxpXCmaT9mDrjOC12BSMv4pfA36QfaBwlQ/OCf0NR2lVYeLcorxKSh5nhtkHbW/jTlbxExzx8/h67SyDck7EQdSPV0NoNZ8tFRQr3HXLpD6hH6YA6U1ee0k23gwRszSeugAJchuXcimb5Gaa/kAtK8jetJuYS76hKsJB+I5EEYffQcvKd4vz80MVkPUqTEw6cEg5LAlQoQ9+utkQYSvUpg/GQfSsWHq4pNW/aZddCEGr+qw0S5Gg80gZ6JJ8YVvjr1d4kNw0st8F4hcXpvfuyZtKvZXpGCR5RgcuLuBdmCX0uFStHc2uBA5n/aYRrG84uAI62CaTjFKP1C95aUrFFl6LaICkVGU9SpLAZJynk9a8fmzekK6pUqYs5HLeMDySPKm8lgN/KOC4st7oAl2XZcDRQV8rdhEleK0OnyHpyHUngfuK7uUgvXtQqBgKD/3esh7nzE78SDhy+YweghB3SE7+F40EHIip+LaaeiuEHcffIIq4VhyNbCSYoW0Qzi/Rr+K/MRTzkde8wBrc3o6CrWR8iKudEftkfkaOcagjN8zQ42Rm6d3WXXxcSuZ6fRrdRieADmkNH9RJ6zwKxoPZQPrRC19oarWDIisP5ivaSmAPAZBup7SWsl+oXclV97mDYQOTURK7flQh8N+v39V8fDP1/I1KHK4kZN4vzU8XhOIrAbKBvi6P/X3BofT++i4YcxSiacsL9dmqeMDeGHic1GX0N2hak7vQn5I39RY0379dim8CaYiKIfm9bnr6YFFU6VTYclDxm/NfBZLysDBIyITobSsqv347IhFN5KDr3AAwWeMUd5nLlUkcqd6H+kGzXr0LEPDMya+8WHfWg2I/NI7eLpjrpFmKevlWWEkV1h/9yOTVSAyjwMo/wgruh9xQHTbK6/yrt/XIQLzP+Y0bB1SHySF31j+1lVe4ezusmz/BcCc+vjHLopBlfbiv2t8/Q/K4cEL+ZkXKwAAAABJRU5ErkJggg==";

/* Storage: uses whatever the host provides. Inside Claude that's the built-in
   store; on the website it's the browser's localStorage. Falls back to memory
   if both are unavailable (private browsing) so the app still runs. */
if (typeof window !== "undefined" && !window.storage) {
  const mem = new Map();
  const hasLocal = (() => {
    try {
      const k = "__hnh_test__";
      window.localStorage.setItem(k, "1");
      window.localStorage.removeItem(k);
      return true;
    } catch { return false; }
  })();
  window.storage = {
    async get(key) {
      const v = hasLocal ? window.localStorage.getItem(key) : (mem.has(key) ? mem.get(key) : null);
      if (v === null || v === undefined) throw new Error("Not found");
      return { key, value: v };
    },
    async set(key, value) {
      if (hasLocal) window.localStorage.setItem(key, value);
      else mem.set(key, value);
      return { key, value };
    },
    async delete(key) {
      if (hasLocal) window.localStorage.removeItem(key);
      else mem.delete(key);
      return { key, deleted: true };
    },
  };
}


const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Barlow:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.hnh { --ink:#000000; --panel:#0C0C0E; --panel2:#131318; --line:#232329;
  --goldhi:#F9D173; --gold:#EFB94C; --golddeep:#C0862B; --golddim:#6E5320;
  --white:#FFFFFF; --bone:#E9E7E2; --mute:#8A8A93; --loss:#D2604A;
  --grad:linear-gradient(180deg,#F9D173 0%,#EFB94C 46%,#C0862B 100%);
  background:var(--ink); color:var(--bone); min-height:100vh;
  font-family:'Barlow',system-ui,sans-serif; -webkit-font-smoothing:antialiased; }
.hnh *{box-sizing:border-box;}
.hnh button{font-family:inherit;cursor:pointer;}
.hnh input{font-family:inherit;}
.wrap{max-width:560px;margin:0 auto;padding:0 0 120px;}

/* ---- brand block ---- */
.brand{position:relative;padding:24px 18px 18px;text-align:center;}
.brand img{height:66px;width:auto;display:block;margin:0 auto 12px;}
.wordmark{font-family:'Montserrat';font-weight:400;font-size:19px;letter-spacing:.30em;
  text-transform:uppercase;color:var(--white);margin:0;line-height:1;padding-left:.30em;}
.rule{display:flex;align-items:center;gap:12px;margin:11px auto 0;max-width:280px;}
.rule i{flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--golddeep),transparent);}
.rule span{font-family:'Montserrat';font-weight:500;font-size:15px;
  background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.sub{font-family:'Montserrat';font-weight:500;font-size:10.5px;letter-spacing:.42em;
  text-transform:uppercase;color:var(--mute);margin:11px 0 0;padding-left:.42em;}
.unit-tog{position:absolute;top:22px;right:16px;background:none;border:1px solid var(--line);
  color:var(--mute);padding:6px 11px;font-family:'Montserrat';font-size:11px;
  letter-spacing:.16em;font-weight:600;}
.unit-tog:hover{border-color:var(--golddeep);color:var(--gold);}

/* ---- tote ---- */
.tote{border-top:1px solid var(--golddim);border-bottom:1px solid var(--golddim);
  background:linear-gradient(180deg,#0B0B0D,#000);padding:20px 18px 0;position:relative;overflow:hidden;}
.tote:before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:.5;}
.tote-wm{position:absolute;right:-26px;top:8px;width:190px;opacity:.055;pointer-events:none;}
.pnl{font-family:'Montserrat';font-weight:700;font-size:clamp(52px,16vw,84px);
  line-height:.9;letter-spacing:-.02em;font-variant-numeric:tabular-nums;position:relative;}
.pnl.up{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.pnl-unit{font-size:.28em;letter-spacing:.2em;margin-left:.4em;vertical-align:.7em;
  color:var(--mute);font-weight:600;-webkit-text-fill-color:var(--mute);}
.metrics{display:flex;margin-top:16px;border-top:1px solid var(--line);position:relative;}
.metric{flex:1;padding:11px 0 13px;border-right:1px solid var(--line);}
.metric:last-child{border-right:0;}
.metric-k{font-family:'Montserrat';font-size:9.5px;letter-spacing:.26em;
  text-transform:uppercase;color:var(--mute);font-weight:600;}
.metric-v{font-family:'JetBrains Mono';font-size:17px;margin-top:4px;font-variant-numeric:tabular-nums;}

/* ---- tabs ---- */
.tabs{display:flex;border-bottom:1px solid var(--line);}
.tab{flex:1;background:none;border:0;border-bottom:2px solid transparent;padding:15px 0;
  color:var(--mute);font-family:'Montserrat';font-size:11.5px;letter-spacing:.26em;
  text-transform:uppercase;font-weight:600;padding-left:.26em;}
.tab.on{color:var(--gold);border-bottom-color:var(--gold);}

.acts{display:flex;gap:8px;padding:16px 18px 12px;}
.btn{flex:1;border:1px solid var(--line);background:var(--panel);color:var(--bone);
  padding:13px 10px;font-family:'Montserrat';font-size:11.5px;letter-spacing:.18em;
  text-transform:uppercase;font-weight:600;border-radius:0;padding-left:calc(10px + .18em);
  transition:border-color .15s,background .15s;}
.btn:hover{border-color:var(--golddeep);}
.btn:focus-visible{outline:2px solid var(--gold);outline-offset:2px;}
.btn-gold{background:var(--grad);color:#000;border-color:var(--goldhi);font-weight:700;}
.btn-gold:hover{filter:brightness(1.08);}
.btn[disabled]{opacity:.45;cursor:default;}

.filters{display:flex;gap:18px;padding:4px 18px 14px;align-items:center;}
.fil{background:none;border:0;padding:4px 0;color:var(--mute);
  font-family:'Montserrat';font-size:11px;letter-spacing:.2em;text-transform:uppercase;
  font-weight:600;white-space:nowrap;border-bottom:1px solid transparent;}
.fil.on{color:var(--gold);border-bottom-color:var(--gold);}
.pill{margin-left:auto;background:none;border:1px solid var(--golddeep);color:var(--gold);
  padding:7px 11px;font-family:'Montserrat';font-size:10px;letter-spacing:.18em;
  text-transform:uppercase;font-weight:600;}

/* ---- rows ---- */
.row{display:block;width:100%;text-align:left;background:none;border:0;
  border-bottom:1px solid var(--line);padding:14px 18px;}
.row:hover{background:var(--panel);}
.row:focus-visible{outline:2px solid var(--gold);outline-offset:-2px;}
.row.flag{border-left:2px dashed var(--gold);}
.r-top{display:flex;justify-content:space-between;align-items:baseline;gap:10px;}
.r-sel{font-family:'Montserrat';font-size:15px;font-weight:500;text-transform:uppercase;
  letter-spacing:.06em;line-height:1.2;}
.r-ret{font-family:'JetBrains Mono';font-size:15px;font-variant-numeric:tabular-nums;white-space:nowrap;}
.r-bot{display:flex;justify-content:space-between;align-items:center;margin-top:6px;gap:10px;}
.r-meta{font-size:12.5px;color:var(--mute);}
.r-odds{font-family:'JetBrains Mono';font-size:12.5px;color:var(--bone);}
.stamp{font-family:'Montserrat';font-size:9px;letter-spacing:.2em;font-weight:600;
  text-transform:uppercase;padding:3px 7px;border:1px solid currentColor;white-space:nowrap;
  padding-right:calc(7px - .2em);}

.empty{padding:52px 26px;text-align:center;}
.empty h3{font-family:'Montserrat';font-size:13px;text-transform:uppercase;
  letter-spacing:.24em;font-weight:600;margin:0 0 10px;color:var(--white);padding-left:.24em;}
.empty p{color:var(--mute);font-size:14px;line-height:1.6;margin:0;}

/* ---- insights ---- */
.sec{padding:22px 18px 4px;}
.sec-h{font-family:'Montserrat';font-size:9.5px;letter-spacing:.28em;text-transform:uppercase;
  color:var(--gold);font-weight:600;margin:0 0 12px;padding-left:.28em;}
.card{border:1px solid var(--line);background:var(--panel);padding:15px 16px;margin-bottom:10px;}
.card p{margin:0;font-size:14px;line-height:1.6;}
.card .k{font-family:'Montserrat';font-size:9.5px;letter-spacing:.24em;text-transform:uppercase;
  color:var(--mute);font-weight:600;margin-bottom:7px;}
.big{font-family:'Montserrat';font-weight:700;font-size:30px;line-height:1;
  font-variant-numeric:tabular-nums;}
.brk{display:flex;justify-content:space-between;align-items:center;gap:12px;
  padding:12px 18px;border-bottom:1px solid var(--line);}
.brk-l{font-size:14px;}
.brk-s{font-size:11.5px;color:var(--mute);margin-top:3px;}
.brk-v{font-family:'JetBrains Mono';font-size:13.5px;font-variant-numeric:tabular-nums;white-space:nowrap;}
.bar{height:2px;background:var(--line);margin-top:7px;position:relative;}
.bar i{position:absolute;top:0;bottom:0;display:block;}

/* ---- sheet ---- */
.scrim{position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:40;}
.sheet{position:fixed;left:0;right:0;bottom:0;z-index:50;background:var(--panel);
  border-top:1px solid var(--golddeep);max-height:92vh;overflow-y:auto;
  max-width:560px;margin:0 auto;animation:rise .22s ease-out;}
@keyframes rise{from{transform:translateY(16px);opacity:.6}to{transform:none;opacity:1}}
.sheet-h{display:flex;justify-content:space-between;align-items:center;padding:16px 18px;
  border-bottom:1px solid var(--line);position:sticky;top:0;background:var(--panel);z-index:2;}
.sheet-t{font-family:'Montserrat';font-size:12px;letter-spacing:.24em;
  text-transform:uppercase;font-weight:600;color:var(--white);padding-left:.24em;}
.x{background:none;border:0;color:var(--mute);font-size:22px;line-height:1;padding:2px 6px;}
.body{padding:16px 18px 22px;}
.fld{margin-bottom:14px;}
.lab{display:block;font-family:'Montserrat';font-size:9.5px;letter-spacing:.24em;
  text-transform:uppercase;color:var(--mute);font-weight:600;margin-bottom:7px;padding-left:.24em;}
.inp{width:100%;background:var(--panel2);border:1px solid var(--line);color:var(--bone);
  padding:12px;font-size:16px;border-radius:0;}
.inp:focus{outline:none;border-color:var(--gold);}
.two{display:flex;gap:10px;}
.two>*{flex:1;min-width:0;}
.seg{display:flex;}
.seg button{flex:1;background:var(--panel2);border:1px solid var(--line);color:var(--mute);
  padding:12px 4px;font-family:'Montserrat';font-size:10.5px;letter-spacing:.14em;
  text-transform:uppercase;font-weight:600;margin-left:-1px;padding-left:calc(4px + .14em);}
.seg button:first-child{margin-left:0;}
.seg button.on{background:var(--grad);color:#000;border-color:var(--goldhi);font-weight:700;}
.hint{font-size:12px;color:var(--mute);margin:-8px 0 14px;line-height:1.55;}
.note{font-size:12.5px;color:var(--mute);line-height:1.6;padding:0 18px 26px;text-align:center;}
.err{background:#2A1512;border:1px solid var(--loss);color:#F0BDB1;padding:11px 13px;
  font-size:13px;line-height:1.5;margin-bottom:14px;}
.leg{border:1px solid var(--line);padding:12px;margin-bottom:8px;background:var(--panel2);}
.leg-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
.leg-n{font-family:'Montserrat';font-size:9.5px;letter-spacing:.2em;color:var(--mute);font-weight:600;}
.lnk{background:none;border:0;color:var(--gold);text-decoration:underline;font:inherit;padding:0;}

.welcome{position:fixed;inset:0;z-index:70;background:var(--ink);overflow-y:auto;
  display:flex;flex-direction:column;justify-content:center;padding:34px 22px;}
.welcome-in{max-width:420px;margin:0 auto;width:100%;text-align:center;}
.welcome img{height:58px;width:auto;display:block;margin:0 auto 18px;}
.welcome h2{font-family:'Montserrat';font-weight:400;font-size:21px;letter-spacing:.02em;
  color:var(--white);margin:0 0 10px;line-height:1.35;}
.welcome .lead{color:var(--mute);font-size:14px;line-height:1.6;margin:0 0 26px;}
.chips{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px;}
.chip{background:var(--panel2);border:1px solid var(--line);color:var(--bone);
  padding:15px 4px;font-family:'Montserrat';font-size:14px;font-weight:600;}
.chip.on{background:var(--grad);color:#000;border-color:var(--goldhi);font-weight:700;}
.welcome .eg{font-size:13px;color:var(--mute);line-height:1.6;margin:16px 0 22px;
  border-top:1px solid var(--line);padding-top:16px;}
.welcome .eg b{color:var(--gold);font-weight:600;}
.skip{background:none;border:0;color:var(--mute);font-size:13px;text-decoration:underline;
  padding:14px;margin-top:4px;}

.stack{padding:18px;}
.rs{border:1px solid var(--line);background:var(--panel2);padding:16px;margin-bottom:12px;}
.rs-t{font-family:'Montserrat';font-size:15px;font-weight:500;text-transform:uppercase;letter-spacing:.06em;}
.rs-m{font-size:12.5px;color:var(--mute);margin:5px 0 12px;}

.install{margin:0 18px 14px;border:1px solid var(--golddeep);background:linear-gradient(180deg,#141109,#0C0C0E);
  padding:15px 16px;position:relative;}
.install h4{font-family:'Montserrat';font-size:10px;letter-spacing:.24em;text-transform:uppercase;
  font-weight:600;color:var(--gold);margin:0 0 8px;padding-left:.24em;}
.install p{margin:0;font-size:13.5px;line-height:1.6;color:var(--bone);}
.install .row2{display:flex;gap:10px;margin-top:13px;}
.share-ico{display:inline-block;vertical-align:-3px;margin:0 2px;}
.dismiss{position:absolute;top:10px;right:10px;background:none;border:0;color:var(--mute);
  font-size:18px;line-height:1;padding:4px 7px;}

.toast{position:fixed;left:18px;right:18px;bottom:22px;z-index:60;max-width:524px;margin:0 auto;
  background:var(--panel2);border:1px solid var(--golddeep);padding:13px 15px;
  display:flex;justify-content:space-between;align-items:center;gap:12px;animation:rise .18s ease-out;}
.toast span{font-size:13.5px;}

@media (prefers-reduced-motion:reduce){ .hnh *{animation:none!important;transition:none!important;} }
`;

/* ---------------- odds ---------------- */
function toFrac(raw) {
  if (raw === 0) return 0;
  if (!raw) return null;
  const s = String(raw).trim().toLowerCase();
  if (["evens", "evs", "even", "1/1"].includes(s)) return 1;
  if (s.includes("/")) {
    const [a, b] = s.split("/").map(parseFloat);
    if (!isFinite(a) || !isFinite(b) || b <= 0) return null;
    return a / b;
  }
  const d = parseFloat(s);
  if (!isFinite(d) || d <= 0) return null;
  return d > 1 ? d - 1 : d;
}
const fracLabel = (f) => (f == null ? "—" : Math.abs(f - 1) < 0.001 ? "evens" : (f + 1).toFixed(2));

function multiFrac(legs) {
  let acc = 1;
  for (const l of legs) {
    if (l.result === "void") continue;
    const f = toFrac(l.odds);
    if (f == null) return null;
    acc *= 1 + f;
  }
  return acc - 1;
}
function multiResult(legs) {
  if (!legs.length) return "pending";
  if (legs.some((l) => l.result === "lost")) return "lost";
  if (legs.some((l) => l.result === "pending")) return "pending";
  if (legs.every((l) => l.result === "void")) return "void";
  return "won";
}

/* ---------------- P&L ---------------- */
function totalStake(b) {
  const s = parseFloat(b.stake) || 0;
  return b.type === "ew" ? s * 2 : s;
}
function profitOf(b) {
  const s = parseFloat(b.stake) || 0;
  const r4 = Math.min(Math.max(parseFloat(b.rule4) || 0, 0), 90) / 100;
  const res = b.type === "multi" ? multiResult(b.legs || []) : b.result;
  if (res === "pending" || res === "void") return 0;
  if (b.type === "multi") {
    if (res === "lost") return -s;
    const f = multiFrac(b.legs || []);
    return f == null ? 0 : s * f * (1 - r4);
  }
  const f = toFrac(b.odds);
  if (b.type === "ew") {
    const pf = toFrac(b.ewTerms) ?? 0.2;
    if (f == null) return 0;
    const winPart = s * f * (1 - r4);
    const plcPart = s * f * pf * (1 - r4);
    if (res === "won") return winPart + plcPart;
    if (res === "placed") return plcPart - s;
    return -2 * s;
  }
  if (res === "won") return f == null ? 0 : s * f * (1 - r4);
  return -s;
}
const resultOf = (b) => (b.type === "multi" ? multiResult(b.legs || []) : b.result);

const uid = () => Math.random().toString(36).slice(2, 10);
const today = () => new Date().toISOString().slice(0, 10);
const RESULTS = {
  pending: { label: "Pending", col: "var(--mute)" },
  won: { label: "Won", col: "var(--gold)" },
  placed: { label: "Placed", col: "var(--golddeep)" },
  lost: { label: "Lost", col: "var(--loss)" },
  void: { label: "Void", col: "var(--mute)" },
};

const blank = () => ({
  id: uid(), date: today(), selection: "", track: "", sport: "horse",
  type: "single", odds: "", stake: "1", rule4: "", ewTerms: "1/5", ewPlaces: "",
  source: "Own selection", result: "pending", legs: [], flagged: false,
});

/* ---------------- analytics ---------------- */
const BANDS = [
  { k: "Odds-on", t: 1 },
  { k: "Evens–2/1", t: 2 },
  { k: "9/4–4/1", t: 4 },
  { k: "9/2–8/1", t: 8 },
  { k: "9/1+", t: Infinity },
];
function bandOf(b) {
  const f = b.type === "multi" ? multiFrac(b.legs || []) : toFrac(b.odds);
  return f == null ? null : BANDS.find((x) => f <= x.t)?.k ?? null;
}
function group(bets, keyFn) {
  const m = new Map();
  for (const b of bets) {
    const k = keyFn(b);
    if (!k) continue;
    const g = m.get(k) || { key: k, n: 0, staked: 0, pnl: 0, wins: 0 };
    g.n += 1; g.staked += totalStake(b); g.pnl += profitOf(b);
    if (["won", "placed"].includes(resultOf(b))) g.wins += 1;
    m.set(k, g);
  }
  return [...m.values()].map((g) => ({ ...g, roi: g.staked ? (g.pnl / g.staked) * 100 : 0 }));
}
function runAnalysis(settled) {
  const chron = settled.slice().sort((a, b) => (a.date < b.date ? -1 : 1));
  let run = 0, peak = 0, maxDd = 0, streak = 0, worstStreak = 0;
  for (const b of chron) {
    run += profitOf(b);
    peak = Math.max(peak, run);
    maxDd = Math.max(maxDd, peak - run);
    if (profitOf(b) < 0) { streak += 1; worstStreak = Math.max(worstStreak, streak); }
    else if (resultOf(b) !== "void") streak = 0;
  }
  return { maxDd, currentDd: peak - run, worstStreak, currentStreak: streak };
}
function insights(settled, unit, pv) {
  const out = [];
  const u = unit === "gbp" ? "£" : "pts";
  const money = (n) => {
    const v = unit === "gbp" ? n * pv : n;
    return (v >= 0 ? "+" : "−") + (unit === "gbp" ? "£" : "") +
      Math.abs(v).toFixed(2) + (unit === "gbp" ? "" : ` ${u}`);
  };

  const byBand = group(settled, bandOf).filter((g) => g.n >= 4).sort((a, b) => b.roi - a.roi);
  if (byBand.length >= 2) {
    const best = byBand[0], worst = byBand[byBand.length - 1];
    if (worst.roi < -5)
      out.push(`Your weakest price range is ${worst.key.toLowerCase()} — ${worst.n} bets at ${worst.roi.toFixed(0)}% ROI, costing you ${money(worst.pnl)}.`);
    if (best.roi > 5)
      out.push(`${best.key} is where you make money: ${best.n} bets at ${best.roi.toFixed(0)}% ROI.`);
  }
  const byTrack = group(settled, (b) => b.track?.trim() || null)
    .filter((g) => g.n >= 3).sort((a, b) => b.roi - a.roi);
  if (byTrack.length >= 2) {
    const t = byTrack[0], w = byTrack[byTrack.length - 1];
    if (t.roi > 10) out.push(`${t.key} has been your best track — ${money(t.pnl)} from ${t.n} bets.`);
    if (w.roi < -20) out.push(`${w.key} has cost you ${money(w.pnl)} across ${w.n} bets. Worth asking why.`);
  }
  const bySrc = group(settled, (b) => b.source?.trim() || null)
    .filter((g) => g.n >= 5).sort((a, b) => b.roi - a.roi);
  if (bySrc.length >= 2)
    out.push(`By source: ${bySrc[0].key} is returning ${bySrc[0].roi.toFixed(0)}% ROI, ${bySrc[bySrc.length - 1].key} ${bySrc[bySrc.length - 1].roi.toFixed(0)}%.`);

  const a = runAnalysis(settled);
  if (a.currentDd > 0.5 && a.currentDd >= a.maxDd * 0.8)
    out.push(`You're ${Math.abs(a.currentDd).toFixed(1)} ${u} below your high-water mark — near your deepest drawdown so far. Flat stakes ride this out better than chasing.`);
  if (a.currentStreak >= 5)
    out.push(`${a.currentStreak} losers in a row. Your longest run is ${a.worstStreak}, so this is normal variance rather than a signal to change anything.`);
  return out.slice(0, 4);
}

/* ---------------- ticker ---------------- */
function useTicker(target) {
  const [val, setVal] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVal(target); from.current = target; return;
    }
    const start = performance.now(), a = from.current;
    let raf;
    const step = (t) => {
      const p = Math.min((t - start) / 460, 1);
      setVal(a + (target - a) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step); else from.current = target;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return val;
}

/* ---------------- curve ---------------- */
function Curve({ bets }) {
  const settled = bets.filter((b) => resultOf(b) !== "pending")
    .slice().sort((a, b) => (a.date < b.date ? -1 : 1));
  const W = 560, H = 92, PAD = 8;
  if (settled.length < 2)
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none"
        style={{ display: "block", opacity: .45 }} aria-hidden="true">
        <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="#232329" strokeDasharray="3 5" />
      </svg>
    );
  let run = 0;
  const pts = [0, ...settled.map((b) => (run += profitOf(b)))];
  const min = Math.min(...pts, 0), max = Math.max(...pts, 0), span = max - min || 1;
  const x = (i) => (i / (pts.length - 1)) * W;
  const y = (v) => PAD + (1 - (v - min) / span) * (H - PAD * 2);
  const line = pts.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const up = pts[pts.length - 1] >= 0;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none"
      style={{ display: "block" }} aria-label="Running profit and loss">
      <defs>
        <linearGradient id="hnhline" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={up ? "#C0862B" : "#D2604A"} />
          <stop offset="100%" stopColor={up ? "#F9D173" : "#E0836F"} />
        </linearGradient>
        <linearGradient id="hnhfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={up ? "#EFB94C" : "#D2604A"} stopOpacity=".22" />
          <stop offset="100%" stopColor={up ? "#EFB94C" : "#D2604A"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1={y(0)} x2={W} y2={y(0)} stroke="#3A3A42" strokeDasharray="2 4" />
      <path d={`${line} L${W},${y(min)} L0,${y(min)} Z`} fill="url(#hnhfill)" />
      <path d={line} fill="none" stroke="url(#hnhline)" strokeWidth="1.9"
        vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}

/* ================= app ================= */
export default function Tracker() {
  const [bets, setBets] = useState([]);
  const [unit, setUnit] = useState("pts");
  const [pointValue, setPointValue] = useState(1);
  const [pvText, setPvText] = useState("1");
  const [onboarded, setOnboarded] = useState(true); // assume until loaded, avoids a flash
  const [wPick, setWPick] = useState("5");
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState("log");
  const [filter, setFilter] = useState("all");
  const [sheet, setSheet] = useState(null);
  const [draft, setDraft] = useState(blank());
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [toast, setToast] = useState(null);
  const [installDismissed, setInstallDismissed] = useState(false);
  const [deferred, setDeferred] = useState(null);
  const fileRef = useRef(null);
  const restoreRef = useRef(null);
  const timer = useRef(null);
  const stateRef = useRef({ bets: [], unit: "pts", pointValue: 1,
    onboarded: false, installDismissed: false });

  /* already running from the home screen? */
  const isStandalone = typeof window !== "undefined" &&
    (window.navigator?.standalone === true ||
      window.matchMedia?.("(display-mode: standalone)").matches);
  const isIOS = typeof navigator !== "undefined" &&
    /iphone|ipad|ipod/i.test(navigator.userAgent);

  /* Android fires this; iOS never does */
  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setDeferred(e); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  useEffect(() => {
    (async () => {
      let seen = false;
      try {
        const r = await window.storage.get("hnh-tracker:data");
        if (r?.value) {
          const d = JSON.parse(r.value);
          stateRef.current = { bets: d.bets || [], unit: d.unit || "pts",
            pointValue: Number(d.pointValue) > 0 ? Number(d.pointValue) : 1,
            onboarded: !!d.onboarded,
            installDismissed: !!d.installDismissed };
          seen = !!d.onboarded;
          setBets(stateRef.current.bets);
          setUnit(stateRef.current.unit);
          setPointValue(stateRef.current.pointValue);
          setPvText(String(stateRef.current.pointValue));
          setInstallDismissed(stateRef.current.installDismissed);
        }
      } catch { /* first run */ }
      setOnboarded(seen);
      setReady(true);
    })();
  }, []);

  const persist = useCallback(async (patch) => {
    stateRef.current = { ...stateRef.current, ...patch };
    try {
      await window.storage.set("hnh-tracker:data", JSON.stringify(stateRef.current));
    } catch {
      setErr("Couldn't save to this device. Your bets are still on screen — back them up to be safe.");
    }
  }, []);

  const apply = (nextBets, msg) => {
    const prev = bets;
    setBets(nextBets);
    persist({ bets: nextBets });
    if (msg) {
      setToast({ msg, prev });
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(null), 6000);
    }
  };
  const undo = () => { if (toast) { setBets(toast.prev); persist({ bets: toast.prev }); setToast(null); } };
  const setUnits = (u) => { setUnit(u); persist({ unit: u }); };
  const finishWelcome = (value) => {
    const n = Number(value);
    const safe = isFinite(n) && n > 0 ? n : 1;
    setPointValue(safe); setPvText(String(safe)); setOnboarded(true);
    persist({ pointValue: safe, onboarded: true });
  };

  const onPvChange = (text) => {
    setPvText(text);                       // always show what was typed
    const n = Number(text);
    if (text.trim() !== "" && isFinite(n) && n > 0) {
      setPointValue(n); persist({ pointValue: n });
    }
  };
  // Only tidy up once they've finished, so an empty box mid-edit is fine.
  const onPvBlur = () => {
    const n = Number(pvText);
    if (pvText.trim() === "" || !isFinite(n) || n <= 0) setPvText(String(pointValue));
    else setPvText(String(n));
  };
  const dismissInstall = () => { setInstallDismissed(true); persist({ installDismissed: true }); };

  const installNow = async () => {
    if (!deferred) return;
    deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    dismissInstall();
  };

  const shown = useMemo(() => {
    const f = filter === "all" ? bets : bets.filter((b) => b.sport === filter);
    return f.slice().sort((a, b) => (a.date === b.date ? 0 : a.date < b.date ? 1 : -1));
  }, [bets, filter]);

  const settled = useMemo(() => shown.filter((b) => resultOf(b) !== "pending"), [shown]);
  const pending = useMemo(() => shown.filter((b) => resultOf(b) === "pending"), [shown]);

  const stats = useMemo(() => {
    const counting = settled.filter((b) => resultOf(b) !== "void");
    const pnl = settled.reduce((s, b) => s + profitOf(b), 0);
    const staked = counting.reduce((s, b) => s + totalStake(b), 0);
    const wins = counting.filter((b) => ["won", "placed"].includes(resultOf(b))).length;
    return { pnl, roi: staked ? (pnl / staked) * 100 : 0,
      sr: counting.length ? (wins / counting.length) * 100 : 0, n: counting.length };
  }, [settled]);

  const week = useMemo(() => {
    const cut = new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
    const w = settled.filter((b) => b.date >= cut);
    return { n: w.length, pnl: w.reduce((s, b) => s + profitOf(b), 0) };
  }, [settled]);

  const ticked = useTicker(stats.pnl);
  const sym = unit === "gbp" ? "£" : "";
  const suffix = unit === "gbp" ? "" : "PTS";
  /* Everything is stored in points. Pounds is a display conversion only. */
  const conv = (pts) => (unit === "gbp" ? pts * pointValue : pts);
  const money = (n, dp = 2) => {
    const v = conv(n);
    return (v > 0 ? "+" : v < 0 ? "−" : "") + sym + Math.abs(v).toFixed(dp);
  };
  const plain = (pts, dp = 2) => sym + conv(pts).toFixed(dp);
  const stakeLabel = (b) => unit === "gbp"
    ? `£${(totalStake(b) * pointValue).toFixed(2)}`
    : `${totalStake(b)}pt`;
  const posCol = "var(--gold)";

  /* ---- import ---- */
  const readImage = useCallback(async (file) => {
    setBusy(true); setErr("");
    try {
      const b64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(String(r.result).split(",")[1]);
        r.onerror = () => rej(new Error("read"));
        r.readAsDataURL(file);
      });
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000,
          messages: [{ role: "user", content: [
            { type: "image", source: { type: "base64", media_type: file.type || "image/jpeg", data: b64 } },
            { type: "text", text:
`Read this betting slip or bet history screenshot. Return ONLY a JSON array — no prose, no markdown fences.
One object per bet:
{"date":"YYYY-MM-DD","selection":"","track":"","sport":"horse"|"greyhound","type":"single"|"ew"|"multi","odds":"fraction or decimal","stake":"number","ewTerms":"1/5","result":"pending"|"won"|"placed"|"lost"|"void","legs":[{"selection":"","odds":"","result":"pending"}]}
Rules: stake is the unit stake — for each-way give the single-side stake, not the doubled total. Only include "legs" for multiples. Use "" for anything not visible, and today (${today()}) if no date shows. Only mark "greyhound" when the track or context clearly indicates dogs. Never invent a result you cannot see — use "pending". Return [] if there are no bets.` }
          ] }]
        })
      });
      const data = await res.json();
      const text = (data.content || []).map((c) => c.text || "").join("\n");
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      if (!Array.isArray(parsed) || !parsed.length) {
        setErr("No bets found in that image. Try a clearer screenshot, or add the bet by hand.");
      } else {
        const add = parsed.map((p) => ({
          ...blank(), ...p, id: uid(),
          // Slips are written in money; the tracker counts in points.
          stake: String(((parseFloat(p.stake) || 1) / (pointValue || 1)).toFixed(2).replace(/\.00$/, "")),
          date: p.date || today(), source: "Imported", result: p.result || "pending",
          legs: Array.isArray(p.legs) ? p.legs.map((l) => ({ ...l, result: l.result || "pending" })) : [],
          flagged: true,
        }));
        apply([...add, ...bets], `${add.length} bet${add.length > 1 ? "s" : ""} imported — check the details`);
      }
    } catch {
      setErr("Import failed. Check the image is a readable screenshot, then try again.");
    }
    setBusy(false);
  }, [bets, unit]);

  useEffect(() => {
    const onPaste = (e) => {
      const item = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith("image/"));
      if (!item) return;
      const f = item.getAsFile();
      if (f) { e.preventDefault(); readImage(f); }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [readImage]);

  /* ---- form ---- */
  const openAdd = () => { setDraft(blank()); setErr(""); setSheet({ mode: "form" }); };
  const openEdit = (b) => { setDraft({ ...b, legs: b.legs || [] }); setErr(""); setSheet({ mode: "form" }); };

  const commit = () => {
    const d = { ...draft, flagged: false };
    if (d.type === "multi") {
      if (d.legs.length < 2) { setErr("A multiple needs at least two legs."); return; }
      if (d.legs.some((l) => toFrac(l.odds) == null)) { setErr("Every leg needs valid odds."); return; }
      d.selection = d.selection.trim() || `${d.legs.length}-fold`;
    } else {
      if (!d.selection.trim()) { setErr("Give the selection a name so you can find it later."); return; }
      if (["won", "placed"].includes(d.result) && toFrac(d.odds) == null) {
        setErr("Odds don't parse. Use a fraction like 11/4, or a decimal like 3.75."); return;
      }
    }
    const exists = bets.some((b) => b.id === d.id);
    apply(exists ? bets.map((b) => (b.id === d.id ? d : b)) : [d, ...bets], exists ? "Bet updated" : "Bet added");
    setSheet(null);
  };

  const settle = (bet, result) =>
    apply(bets.map((b) => (b.id === bet.id ? { ...b, result, flagged: false } : b)), "Bet settled");
  const remove = (bet) => { apply(bets.filter((b) => b.id !== bet.id), "Bet deleted"); setSheet(null); };

  const exportCsv = () => {
    const head = `Date,Sport,Type,Selection,Track,Odds,Stake (pts),Total staked (pts),Rule 4 %,Source,Result,P&L (pts),P&L (£ at ${pointValue}/pt)`;
    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = shown.map((b) => [b.date, b.sport, b.type, b.selection, b.track,
      b.type === "multi" ? fracLabel(multiFrac(b.legs || [])) : b.odds,
      b.stake, totalStake(b).toFixed(2), b.rule4, b.source, resultOf(b), profitOf(b).toFixed(2),
      (profitOf(b) * pointValue).toFixed(2)]
      .map(esc).join(","));
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([[head, ...rows].join("\n")], { type: "text/csv" }));
    a.download = "hooves-and-hounds-bets.csv";
    a.click(); URL.revokeObjectURL(a.href);
  };

  /* full backup — reloadable, unlike the CSV */
  const backup = () => {
    const payload = { app: "hooves-and-hounds-tracker", version: 1,
      exported: new Date().toISOString(), unit, bets };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    a.download = `hnh-backup-${today()}.json`;
    a.click(); URL.revokeObjectURL(a.href);
  };

  const restore = async (file) => {
    setErr("");
    try {
      const d = JSON.parse(await file.text());
      const incoming = Array.isArray(d) ? d : d.bets;
      if (!Array.isArray(incoming)) throw new Error("shape");
      const seen = new Set(bets.map((b) => b.id));
      const fresh = incoming
        .filter((b) => b && b.id && !seen.has(b.id))
        .map((b) => ({ ...blank(), ...b, legs: Array.isArray(b.legs) ? b.legs : [] }));
      if (!fresh.length) {
        setErr("Nothing new in that file — those bets are already here.");
        return;
      }
      if (d.unit) setUnits(d.unit);
      apply([...fresh, ...bets], `${fresh.length} bet${fresh.length > 1 ? "s" : ""} restored`);
    } catch {
      setErr("That file couldn't be read. Use a backup file exported from this tracker.");
    }
  };

  const tips = useMemo(() => insights(settled.filter((b) => resultOf(b) !== "void"), unit, pointValue), [settled, unit, pointValue]);
  const risk = useMemo(() => runAnalysis(settled), [settled]);

  const Breakdown = ({ title, rows }) => {
    if (rows.length < 2) return null;
    const scale = Math.max(...rows.map((r) => Math.abs(r.roi)), 1);
    return (
      <>
        <div className="sec"><h3 className="sec-h">{title}</h3></div>
        {rows.map((r) => (
          <div className="brk" key={r.key}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="brk-l">{r.key}</div>
              <div className="brk-s">{r.n} bets · {((r.wins / r.n) * 100).toFixed(0)}% strike</div>
              <div className="bar">
                <i style={{
                  left: r.roi >= 0 ? "50%" : `${50 - (Math.abs(r.roi) / scale) * 50}%`,
                  width: `${(Math.abs(r.roi) / scale) * 50}%`,
                  background: r.roi >= 0 ? "var(--gold)" : "var(--loss)" }} />
              </div>
            </div>
            <div className="brk-v" style={{ color: r.pnl >= 0 ? posCol : "var(--loss)" }}>
              {money(r.pnl, 1)}<span style={{ color: "var(--mute)" }}> · {r.roi.toFixed(0)}%</span>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="hnh">
      <style>{CSS}</style>
      <div className="wrap">

        <header className="brand">
          <img src={MARK} alt="" />
          <h1 className="wordmark">Hooves</h1>
          <div className="rule"><i /><span>&amp;</span><i /></div>
          <h1 className="wordmark" style={{ marginTop: 11 }}>Hounds</h1>
          <p className="sub">The Tracker</p>
          <button className="unit-tog" onClick={() => { setPvText(String(pointValue)); setSheet({ mode: "settings" }); }}>
            {unit === "pts" ? "PTS" : `£${pointValue}`}
          </button>
        </header>

        <section className="tote">
          <img className="tote-wm" src={MARK} alt="" />
          <div className={`pnl ${stats.pnl >= 0 ? "up" : ""}`}
            style={stats.pnl < 0 ? { color: "var(--loss)" } : undefined}>
            {money(ticked)}{suffix && <span className="pnl-unit">{suffix}</span>}
          </div>
          <div className="metrics">
            <div className="metric">
              <div className="metric-k">ROI</div>
              <div className="metric-v" style={{ color: stats.roi >= 0 ? "var(--bone)" : "var(--loss)" }}>
                {stats.roi >= 0 ? "+" : "−"}{Math.abs(stats.roi).toFixed(1)}%
              </div>
            </div>
            <div className="metric">
              <div className="metric-k">Strike</div>
              <div className="metric-v">{stats.sr.toFixed(0)}%</div>
            </div>
            <div className="metric">
              <div className="metric-k">Settled</div>
              <div className="metric-v">{stats.n}</div>
            </div>
          </div>
          <Curve bets={shown} />
        </section>

        <div className="tabs">
          <button className={`tab ${tab === "log" ? "on" : ""}`} onClick={() => setTab("log")}>Log</button>
          <button className={`tab ${tab === "insights" ? "on" : ""}`} onClick={() => setTab("insights")}>Insights</button>
        </div>

        {tab === "log" && (
          <>
            <div className="acts">
              <button className="btn btn-gold" onClick={openAdd}>Add bet</button>
              <button className="btn" onClick={() => fileRef.current?.click()} disabled={busy}>
                {busy ? "Reading…" : "Import slip"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
                onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) readImage(f); }} />
            </div>

            {err && <div className="err" style={{ margin: "0 18px 14px" }}>{err}</div>}

            {ready && !isStandalone && !installDismissed && bets.length > 0 && (
              <div className="install">
                <button className="dismiss" onClick={dismissInstall} aria-label="Dismiss">×</button>
                <h4>Keep your results</h4>
                {deferred ? (
                  <>
                    <p>Install the tracker to your home screen so your bets are kept safely and open in one tap.</p>
                    <div className="row2">
                      <button className="btn btn-gold" onClick={installNow}>Install</button>
                    </div>
                  </>
                ) : isIOS ? (
                  <p>
                    Add this to your home screen and your results are kept safely — otherwise Safari
                    can clear them after a week away. Tap
                    <svg className="share-ico" width="14" height="17" viewBox="0 0 14 17" fill="none"
                      aria-label="Share" role="img">
                      <path d="M7 1v10M7 1L4 4M7 1l3 3" stroke="#EFB94C" strokeWidth="1.4"
                        strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.5 7.5H1.5v8h11v-8h-1" stroke="#EFB94C" strokeWidth="1.4"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    then <strong>Add to Home Screen</strong>.
                  </p>
                ) : (
                  <p>Add this to your home screen or bookmarks so your results stay put. Back up your
                    bets to a file any time from the link below.</p>
                )}
              </div>
            )}

            <div className="filters">
              {[["all", "All"], ["horse", "Horses"], ["greyhound", "Greyhounds"]].map(([k, l]) => (
                <button key={k} className={`fil ${filter === k ? "on" : ""}`} onClick={() => setFilter(k)}>{l}</button>
              ))}
              {pending.length > 0 && (
                <button className="pill" onClick={() => setSheet({ mode: "rapid" })}>Settle {pending.length}</button>
              )}
            </div>

            {!ready ? (
              <div className="empty"><p>Loading your bets…</p></div>
            ) : shown.length === 0 ? (
              <div className="empty">
                <h3>Nothing logged yet</h3>
                <p>Add a bet by hand, or paste a screenshot of your slip straight in and let it fill the details for you.</p>
              </div>
            ) : shown.map((b) => {
              const p = profitOf(b), res = resultOf(b), R = RESULTS[res] || RESULTS.pending;
              const odds = b.type === "multi" ? fracLabel(multiFrac(b.legs || [])) : b.odds;
              return (
                <button key={b.id} className={`row ${b.flagged ? "flag" : ""}`}
                  onClick={() => setSheet({ mode: "row", bet: b })}>
                  <div className="r-top">
                    <span className="r-sel">{b.selection || "Unnamed"}</span>
                    <span className="r-ret" style={{
                      color: res === "pending" ? "var(--mute)"
                        : p > 0 ? posCol : p < 0 ? "var(--loss)" : "var(--mute)" }}>
                      {res === "pending" ? "—" : money(p)}
                    </span>
                  </div>
                  <div className="r-bot">
                    <span className="r-meta">
                      {b.date.slice(8, 10)}/{b.date.slice(5, 7)}
                      {b.track ? ` · ${b.track}` : ""} · {stakeLabel(b)}
                      {b.type === "ew" ? " EW" : b.type === "multi" ? ` · ${(b.legs || []).length} legs` : ""}
                      {odds ? <span className="r-odds"> · {odds}</span> : null}
                      {b.rule4 ? ` · R4 ${b.rule4}%` : ""}
                    </span>
                    <span className="stamp" style={{ color: R.col }}>{b.flagged ? "Check" : R.label}</span>
                  </div>
                </button>
              );
            })}

            {bets.length > 0 && (
              <p className="note" style={{ paddingTop: 24 }}>
                Saved on this device only.<br />
                <button className="lnk" onClick={backup}>Back up</button>
                {" · "}
                <button className="lnk" onClick={() => restoreRef.current?.click()}>Restore</button>
                {" · "}
                <button className="lnk" onClick={exportCsv}>Export CSV</button>
                <input ref={restoreRef} type="file" accept="application/json,.json"
                  style={{ display: "none" }}
                  onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) restore(f); }} />
              </p>
            )}
          </>
        )}

        {tab === "insights" && (
          <>
            <div className="sec">
              <h3 className="sec-h">Last 7 days</h3>
              <div className="card">
                <p className="big" style={{ color: week.pnl >= 0 ? posCol : "var(--loss)" }}>
                  {money(week.pnl)}{suffix ? ` ${suffix}` : ""}
                </p>
                <p style={{ color: "var(--mute)", fontSize: 13, marginTop: 7 }}>
                  {week.n} bet{week.n === 1 ? "" : "s"} settled this week
                </p>
              </div>
            </div>

            {tips.length > 0 && (
              <div className="sec">
                <h3 className="sec-h">What the numbers say</h3>
                {tips.map((t, i) => <div className="card" key={i}><p>{t}</p></div>)}
              </div>
            )}

            {stats.n >= 3 && (
              <div className="sec">
                <h3 className="sec-h">Risk</h3>
                <div className="card">
                  <div className="k">Deepest drawdown</div>
                  <p>{plain(risk.maxDd)}{suffix ? ` ${suffix}` : ""} from your high-water mark
                    {risk.currentDd > 0.01 ? ` · currently ${plain(risk.currentDd)} below it` : " · at a new high"}.</p>
                </div>
                <div className="card">
                  <div className="k">Longest losing run</div>
                  <p>{risk.worstStreak} bet{risk.worstStreak === 1 ? "" : "s"}
                    {risk.currentStreak > 0 ? ` · you're on ${risk.currentStreak} now` : ""}.</p>
                </div>
              </div>
            )}

            <Breakdown title="By price" rows={group(settled, bandOf).sort((a, b) => b.roi - a.roi)} />
            <Breakdown title="By track" rows={group(settled, (b) => b.track?.trim() || null)
              .filter((g) => g.n >= 2).sort((a, b) => b.pnl - a.pnl)} />
            <Breakdown title="By source" rows={group(settled, (b) => b.source?.trim() || null)
              .sort((a, b) => b.roi - a.roi)} />
            <Breakdown title="By day" rows={group(settled, (b) =>
              ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(b.date + "T12:00").getDay()])
              .sort((a, b) => b.pnl - a.pnl)} />

            {stats.n < 3 && (
              <div className="empty">
                <h3>Not enough yet</h3>
                <p>Insights need a handful of settled bets before they mean anything. Keep logging and this fills itself in.</p>
              </div>
            )}
            <p className="note">Small samples lie. Treat anything under about 50 bets as a hint, not a finding.</p>
          </>
        )}
      </div>

      {/* ---- sheets ---- */}
      {sheet && <div className="scrim" onClick={() => setSheet(null)} />}

      {ready && !onboarded && (
        <div className="welcome">
          <div className="welcome-in">
            <img src={MARK} alt="" />
            <h2>What is one point worth to you?</h2>
            <p className="lead">
              Everything here is counted in points, so your results can be compared with
              anyone else's. Tell us your stake and we can also show it in pounds.
            </p>

            <div className="chips">
              {["1", "5", "10", "25"].map((v) => (
                <button key={v} className={`chip ${wPick === v ? "on" : ""}`}
                  onClick={() => setWPick(v)}>£{v}</button>
              ))}
            </div>

            <input className="inp" type="number" min="0.01" step="any" inputMode="decimal"
              value={wPick} aria-label="One point is worth"
              onChange={(e) => setWPick(e.target.value)}
              onFocus={(e) => e.target.select()} />

            <p className="eg">
              {Number(wPick) > 0 ? (
                <>A <b>2pt</b> bet would risk <b>£{(Number(wPick) * 2).toFixed(2)}</b>,
                  and winning it at 5/2 would return <b>£{(Number(wPick) * 2 * 3.5).toFixed(2)}</b>.</>
              ) : <>Enter what you usually stake on a one-point bet.</>}
            </p>

            <button className="btn btn-gold" style={{ width: "100%" }}
              disabled={!(Number(wPick) > 0)}
              onClick={() => finishWelcome(wPick)}>Start tracking</button>

            <button className="skip" onClick={() => finishWelcome(1)}>
              I only count in points
            </button>
          </div>
        </div>
      )}

      {sheet?.mode === "settings" && (
        <div className="sheet">
          <div className="sheet-h">
            <span className="sheet-t">Settings</span>
            <button className="x" onClick={() => setSheet(null)} aria-label="Close">×</button>
          </div>
          <div className="body">
            <span className="lab">Show amounts in</span>
            <div className="seg" style={{ marginBottom: 16 }}>
              {[["pts", "Points"], ["gbp", "Pounds"]].map(([k, l]) => (
                <button key={k} className={unit === k ? "on" : ""}
                  onClick={() => setUnits(k)}>{l}</button>
              ))}
            </div>

            <div className="fld">
              <label className="lab" htmlFor="pv">One point is worth</label>
              <input id="pv" className="inp" type="number" min="0.01" step="any"
                inputMode="decimal" value={pvText} placeholder="5"
                onChange={(e) => onPvChange(e.target.value)}
                onBlur={onPvBlur}
                onFocus={(e) => e.target.select()} />
            </div>
            <p className="hint">
              Stakes are always logged in points, so a 2pt bet is the same size whether you
              stake £2 or £200 a point. Set your own value here and the pounds view converts
              everything for you.
            </p>

            <div className="card" style={{ marginBottom: 18 }}>
              <div className="k">Right now</div>
              <p>1pt = £{Number(pointValue).toFixed(2)} · a 2pt bet risks £{(pointValue * 2).toFixed(2)}
                {stats.n > 0 ? ` · your ${stats.pnl >= 0 ? "profit" : "loss"} is £${Math.abs(stats.pnl * pointValue).toFixed(2)}` : ""}.</p>
            </div>

            <button className="btn btn-gold" style={{ width: "100%" }}
              onClick={() => setSheet(null)}>Done</button>
          </div>
        </div>
      )}

      {sheet?.mode === "rapid" && (
        <div className="sheet">
          <div className="sheet-h">
            <span className="sheet-t">Settle bets</span>
            <button className="x" onClick={() => setSheet(null)} aria-label="Close">×</button>
          </div>
          <div className="stack">
            {pending.length === 0 && <p style={{ color: "var(--mute)", fontSize: 14 }}>All settled. Nothing left here.</p>}
            {pending.map((b) => (
              <div className="rs" key={b.id}>
                <div className="rs-t">{b.selection || "Unnamed"}</div>
                <div className="rs-m">
                  {b.date.slice(8, 10)}/{b.date.slice(5, 7)}{b.track ? ` · ${b.track}` : ""}
                  {b.odds ? ` · ${b.odds}` : ""} · {stakeLabel(b)}
                  {b.type === "ew" ? " EW" : ""}
                </div>
                <div className="seg">
                  <button onClick={() => settle(b, "won")}>Won</button>
                  {b.type === "ew" && <button onClick={() => settle(b, "placed")}>Placed</button>}
                  <button onClick={() => settle(b, "lost")}>Lost</button>
                  <button onClick={() => settle(b, "void")}>Void</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {sheet?.mode === "row" && (
        <div className="sheet">
          <div className="sheet-h">
            <span className="sheet-t">{sheet.bet.selection || "Bet"}</span>
            <button className="x" onClick={() => setSheet(null)} aria-label="Close">×</button>
          </div>
          <div className="body">
            {sheet.bet.type === "multi" ? (
              <>
                <span className="lab">Legs</span>
                {(sheet.bet.legs || []).map((l, i) => (
                  <div className="leg" key={i}>
                    <div className="leg-h">
                      <span className="leg-n">Leg {i + 1} · {l.odds || "—"}</span>
                      <span className="stamp" style={{ color: RESULTS[l.result]?.col }}>
                        {RESULTS[l.result]?.label}
                      </span>
                    </div>
                    <div style={{ fontSize: 15, marginBottom: 9 }}>{l.selection || "Unnamed"}</div>
                    <div className="seg">
                      {["won", "lost", "void"].map((r) => (
                        <button key={r} className={l.result === r ? "on" : ""}
                          onClick={() => {
                            const legs = sheet.bet.legs.map((x, j) => (j === i ? { ...x, result: r } : x));
                            const nb = { ...sheet.bet, legs, flagged: false };
                            apply(bets.map((b) => (b.id === nb.id ? nb : b)), "Leg settled");
                            setSheet({ mode: "row", bet: nb });
                          }}>{RESULTS[r].label}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : resultOf(sheet.bet) === "pending" && (
              <>
                <span className="lab">Settle this bet</span>
                <div className="seg" style={{ marginBottom: 16 }}>
                  <button onClick={() => { settle(sheet.bet, "won"); setSheet(null); }}>Won</button>
                  {sheet.bet.type === "ew" &&
                    <button onClick={() => { settle(sheet.bet, "placed"); setSheet(null); }}>Placed</button>}
                  <button onClick={() => { settle(sheet.bet, "lost"); setSheet(null); }}>Lost</button>
                  <button onClick={() => { settle(sheet.bet, "void"); setSheet(null); }}>Void</button>
                </div>
              </>
            )}
            <div className="acts" style={{ padding: "6px 0 0" }}>
              <button className="btn" onClick={() => openEdit(sheet.bet)}>Edit</button>
              <button className="btn" style={{ color: "var(--loss)" }} onClick={() => remove(sheet.bet)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {sheet?.mode === "form" && (
        <div className="sheet">
          <div className="sheet-h">
            <span className="sheet-t">{bets.some((b) => b.id === draft.id) ? "Edit bet" : "New bet"}</span>
            <button className="x" onClick={() => setSheet(null)} aria-label="Close">×</button>
          </div>
          <div className="body">
            {err && <div className="err">{err}</div>}

            <div className="seg" style={{ marginBottom: 10 }}>
              {[["single", "Single"], ["ew", "Each-way"], ["multi", "Multiple"]].map(([k, l]) => (
                <button key={k} className={draft.type === k ? "on" : ""}
                  onClick={() => setDraft({ ...draft, type: k,
                    legs: k === "multi" && draft.legs.length < 2
                      ? [{ selection: "", odds: "", result: "pending" }, { selection: "", odds: "", result: "pending" }]
                      : draft.legs })}>{l}</button>
              ))}
            </div>
            <div className="seg" style={{ marginBottom: 16 }}>
              {[["horse", "Horse"], ["greyhound", "Greyhound"]].map(([k, l]) => (
                <button key={k} className={draft.sport === k ? "on" : ""}
                  onClick={() => setDraft({ ...draft, sport: k })}>{l}</button>
              ))}
            </div>

            {draft.type === "multi" ? (
              <>
                <span className="lab">Legs</span>
                {draft.legs.map((l, i) => (
                  <div className="leg" key={i}>
                    <div className="leg-h">
                      <span className="leg-n">Leg {i + 1}</span>
                      {draft.legs.length > 2 && (
                        <button className="lnk" onClick={() =>
                          setDraft({ ...draft, legs: draft.legs.filter((_, j) => j !== i) })}>Remove</button>
                      )}
                    </div>
                    <div className="two">
                      <input className="inp" placeholder="Selection" value={l.selection}
                        onChange={(e) => setDraft({ ...draft, legs: draft.legs.map((x, j) =>
                          j === i ? { ...x, selection: e.target.value } : x) })} />
                      <input className="inp" placeholder="11/4" value={l.odds}
                        onChange={(e) => setDraft({ ...draft, legs: draft.legs.map((x, j) =>
                          j === i ? { ...x, odds: e.target.value } : x) })} />
                    </div>
                  </div>
                ))}
                <button className="btn" style={{ width: "100%", marginBottom: 14 }}
                  onClick={() => setDraft({ ...draft, legs: [...draft.legs, { selection: "", odds: "", result: "pending" }] })}>
                  Add leg
                </button>
                <p className="hint">
                  Combined price: {fracLabel(multiFrac(draft.legs))} · settle each leg from the bet itself once it's saved.
                </p>
              </>
            ) : (
              <>
                <div className="fld">
                  <label className="lab" htmlFor="sel">Selection</label>
                  <input id="sel" className="inp" value={draft.selection}
                    onChange={(e) => setDraft({ ...draft, selection: e.target.value })}
                    placeholder={draft.sport === "horse" ? "Horse name" : "Trap / dog name"} />
                </div>
                <div className="two">
                  <div className="fld">
                    <label className="lab" htmlFor="odd">Odds</label>
                    <input id="odd" className="inp" value={draft.odds}
                      onChange={(e) => setDraft({ ...draft, odds: e.target.value })} placeholder="11/4" />
                  </div>
                  <div className="fld">
                    <label className="lab" htmlFor="stk">
                      Stake in points {draft.type === "ew" ? "(each way)" : ""}
                    </label>
                    <input id="stk" className="inp" type="number" step="0.25" min="0" value={draft.stake}
                      onChange={(e) => setDraft({ ...draft, stake: e.target.value })} />
                  </div>
                </div>
                {draft.type === "ew" && (
                  <>
                    <div className="two">
                      <div className="fld">
                        <label className="lab" htmlFor="ewt">Place terms</label>
                        <input id="ewt" className="inp" value={draft.ewTerms}
                          onChange={(e) => setDraft({ ...draft, ewTerms: e.target.value })} placeholder="1/5" />
                      </div>
                      <div className="fld">
                        <label className="lab" htmlFor="ewp">Places paid</label>
                        <input id="ewp" className="inp" type="number" min="1" value={draft.ewPlaces}
                          onChange={(e) => setDraft({ ...draft, ewPlaces: e.target.value })} placeholder="4" />
                      </div>
                    </div>
                    <p className="hint">
                      Total risked is {unit === "gbp"
                        ? `£${((parseFloat(draft.stake) || 0) * 2 * pointValue).toFixed(2)}`
                        : `${(parseFloat(draft.stake) || 0) * 2} pts`} — the stake goes on twice.
                    </p>
                  </>
                )}
              </>
            )}

            <div className="two">
              <div className="fld">
                <label className="lab" htmlFor="trk">Track</label>
                <input id="trk" className="inp" value={draft.track}
                  onChange={(e) => setDraft({ ...draft, track: e.target.value })} placeholder="Ascot" />
              </div>
              <div className="fld">
                <label className="lab" htmlFor="dat">Date</label>
                <input id="dat" className="inp" type="date" value={draft.date}
                  onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
              </div>
            </div>

            <div className="two">
              <div className="fld">
                <label className="lab" htmlFor="r4">Rule 4 (%)</label>
                <input id="r4" className="inp" type="number" min="0" max="90" value={draft.rule4}
                  onChange={(e) => setDraft({ ...draft, rule4: e.target.value })} placeholder="0" />
              </div>
              <div className="fld">
                <label className="lab" htmlFor="src">Source</label>
                <input id="src" className="inp" list="hnh-src" value={draft.source}
                  onChange={(e) => setDraft({ ...draft, source: e.target.value })} />
                <datalist id="hnh-src">
                  <option value="Own selection" />
                  <option value="Hooves &amp; Hounds" />
                  <option value="Imported" />
                </datalist>
              </div>
            </div>
            <p className="hint">Rule 4 comes off winnings only. Leave blank if there wasn't one.</p>

            {draft.type !== "multi" && (
              <>
                <span className="lab">Result</span>
                <div className="seg" style={{ marginBottom: 18 }}>
                  {["pending", "won", ...(draft.type === "ew" ? ["placed"] : []), "lost", "void"].map((k) => (
                    <button key={k} className={draft.result === k ? "on" : ""}
                      onClick={() => setDraft({ ...draft, result: k })}>{RESULTS[k].label}</button>
                  ))}
                </div>
              </>
            )}

            <button className="btn btn-gold" style={{ width: "100%" }} onClick={commit}>Save bet</button>
          </div>
        </div>
      )}

      {toast && !sheet && (
        <div className="toast">
          <span>{toast.msg}</span>
          <button className="lnk" onClick={undo}>Undo</button>
        </div>
      )}
    </div>
  );
}
