import { useMemo, useState } from "react";

type Listing = {
  id: string;
  title: string;
  place: string;
  label: "Huur" | "Koop" | "Nieuwbouw" | "Concept";
  price: string;
  lat: number;
  lon: number;
  tags: string[]; // lift, gelijkvloers, community, welzijn, hulp, ondersteuning, zorg
};

const LISTINGS: Listing[] = [
  { id: "vw-1", title: "Licht appartement met lift", place: "Amsterdam", label: "Huur", price: "€ 1.450 p/m", lat: 52.3676, lon: 4.9041, tags: ["lift", "community", "welzijn", "hulp"] },
  { id: "vw-2", title: "Gelijkvloers wonen nabij winkels", place: "Utrecht", label: "Koop", price: "€ 425.000 k.k.", lat: 52.0907, lon: 5.1214, tags: ["gelijkvloers", "welzijn", "hulp"] },
  { id: "vw-3", title: "Serviceflat met ontmoetingsruimte", place: "Haarlem", label: "Nieuwbouw", price: "n.v.t. (demo)", lat: 52.3874, lon: 4.6462, tags: ["community", "welzijn", "ondersteuning"] },
  { id: "vw-4", title: "Seniorenappartement met binnentuin", place: "Amstelveen", label: "Huur", price: "€ 1.650 p/m", lat: 52.3080, lon: 4.8746, tags: ["lift", "welzijn"] },
  { id: "vw-5", title: "Geclusterd wonen (concept)", place: "Uithoorn", label: "Concept", price: "n.v.t. (concept)", lat: 52.2370, lon: 4.8256, tags: ["community", "welzijn", "omkijken"] }
];

export default function VitaCheck() {
  const [who, setWho] = useState<"bewoner" | "naaste" | "samen">("bewoner");
  const [area, setArea] = useState("");
  const [type, setType] = useState<"all" | "Huur" | "Koop" | "Nieuwbouw" | "Concept">("all");
  const [needsCommunity, setNeedsCommunity] = useState(true);

  const [laterHelp, setLaterHelp] = useState(true);
  const [laterSupport, setLaterSupport] = useState(false);
  const [laterCare, setLaterCare] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [email, setEmail] = useState("");
  const [notifyDone, setNotifyDone] = useState(false);
  const [notifyError, setNotifyError] = useState<string | null>(null);

  const matches = useMemo(() => {
    if (!submitted) return [];

    const a = area.trim().toLowerCase();

    return LISTINGS.filter((x) => {
      if (a && !x.place.toLowerCase().includes(a)) return false;

      if (type !== "all" && x.label !== type) return false;

      if (needsCommunity && !x.tags.includes("community")) return false;

      const laterWants: string[] = [];
      if (laterHelp) laterWants.push("hulp");
      if (laterSupport) laterWants.push("ondersteuning");
      if (laterCare) laterWants.push("zorg");

      if (laterWants.length > 0) {
        const ok = laterWants.some((t) => x.tags.includes(t));
        if (!ok) return false;
      }

      return true;
    });
  }, [submitted, area, type, needsCommunity, laterHelp, laterSupport, laterCare]);

  function focusUrl() {
    const first = matches[0] || LISTINGS[0];
    return `/woningen/kaart?focus=${encodeURIComponent(first.id)}`;
  }

  async function submitNotify() {
    setNotifyDone(false);
    setNotifyError(null);

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          who,
          area,
          type,
          needsCommunity,
          later: { hulp: laterHelp, ondersteuning: laterSupport, zorg: laterCare }
        })
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Fout bij opslaan");
      }

      setNotifyDone(true);
    } catch (e: any) {
      setNotifyError(e?.message || "Er ging iets mis");
    }
  }

  return (
    <main style={{ padding: 40, maxWidth: 980, margin: "0 auto" }}>
      <h1>VitaCheck</h1>
      <p style={{ color: "#444", lineHeight: 1.6, maxWidth: 820 }}>
        Rustig vooruitkijken. Wonen en welzijn centraal. Hulp, ondersteuning en zorg zijn optioneel en later te organiseren.
      </p>

      <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16, marginTop: 16 }}>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <div style={{ fontSize: 13, color: "#666" }}>Voor wie?</div>
            <select value={who} onChange={(e) => setWho(e.target.value as any)} style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }}>
              <option value="bewoner">Voor mezelf</option>
              <option value="naaste">Ik ben naaste</option>
              <option value="samen">Samen</option>
            </select>
          </div>

          <div>
            <div style={{ fontSize: 13, color: "#666" }}>Plaats/regio</div>
            <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Bijv. Amsterdam, Utrecht…" style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }} />
          </div>

          <div>
            <div style={{ fontSize: 13, color: "#666" }}>Type</div>
            <select value={type} onChange={(e) => setType(e.target.value as any)} style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }}>
              <option value="all">Alles</option>
              <option value="Huur">Huur</option>
              <option value="Koop">Koop</option>
              <option value="Nieuwbouw">Nieuwbouw</option>
              <option value="Concept">Concept</option>
            </select>
          </div>

          <label style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 18 }}>
            <input type="checkbox" checked={needsCommunity} onChange={(e) => setNeedsCommunity(e.target.checked)} />
            <div>
              <div style={{ fontWeight: 700 }}>Welzijn / community belangrijk</div>
              <div style={{ fontSize: 12, color: "#666" }}>Ontmoeting, omkijken, activiteiten</div>
            </div>
          </label>
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 13, color: "#666" }}>Later kunnen organiseren (optioneel)</div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="checkbox" checked={laterHelp} onChange={(e) => setLaterHelp(e.target.checked)} /> Hulp
            </label>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="checkbox" checked={laterSupport} onChange={(e) => setLaterSupport(e.target.checked)} /> Ondersteuning
            </label>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="checkbox" checked={laterCare} onChange={(e) => setLaterCare(e.target.checked)} /> Zorg
            </label>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
          <button
            onClick={() => { setSubmitted(true); setNotifyDone(false); setNotifyError(null); }}
            style={{ padding: "10px 14px", borderRadius: 10, background: "#111", color: "#fff", border: 0, cursor: "pointer" }}
          >
            Toon actueel aanbod
          </button>
          <a
            href="/voor-naasten"
            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #111", color: "#111", textDecoration: "none" }}
          >
            Voor naasten
          </a>
        </div>
      </div>

      {submitted && (
        <div style={{ marginTop: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <h2 style={{ margin: 0 }}>Resultaat</h2>
            <a href={focusUrl()} style={{ textDecoration: "underline", color: "#111" }}>Bekijk op kaart →</a>
          </div>

          {matches.length > 0 ? (
            <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
              {matches.map((x) => (
                <a
                  key={x.id}
                  href={`/woningen/${encodeURIComponent(x.id)}`}
                  style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16, textDecoration: "none", color: "inherit" }}
                >
                  <div style={{ fontSize: 13, color: "#666" }}>{x.place} • {x.label}</div>
                  <div style={{ fontWeight: 700, marginTop: 4 }}>{x.title}</div>
                  <div style={{ marginTop: 6, color: "#444" }}>{x.price}</div>
                </a>
              ))}
            </div>
          ) : (
            <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16, marginTop: 14 }}>
              <div style={{ fontWeight: 700 }}>Geen passend aanbod gevonden (demo)</div>
              <p style={{ color: "#444", lineHeight: 1.6 }}>
                Laat je e-mailadres achter. Dan houden we je op de hoogte zodra er passend aanbod beschikbaar is.
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mailadres"
                  style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd", minWidth: 260 }}
                />
                <button
                  onClick={submitNotify}
                  disabled={!email.includes("@")}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: email.includes("@") ? "#111" : "#999",
                    color: "#fff",
                    border: 0,
                    cursor: email.includes("@") ? "pointer" : "not-allowed"
                  }}
                >
                  Houd mij op de hoogte
                </button>
              </div>

              {notifyDone && <div style={{ marginTop: 10, fontSize: 13, color: "#0a7" }}>Dank! (demo) We hebben je verzoek ontvangen.</div>}
              {notifyError && <div style={{ marginTop: 10, fontSize: 13, color: "#b00" }}>{notifyError}</div>}

              <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
                In productie: koppeling met Brevo/Mailchimp + alerts op nieuw aanbod.
              </div>
            </div>
          )}
        </div>
      )}

      <p style={{ marginTop: 24 }}>
        <a href="/" style={{ textDecoration: "underline", color: "#111" }}>← Terug</a>
      </p>
    </main>
  );
}
