import { useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { LISTINGS } from "../../lib/demoData";

type Horizon = "nu" | "3-12m" | "1-2j" | "2-5j" | "orientatie";
type Support = "geen" | "licht" | "regelmatig" | "dagelijks" | "indicatie";
type Community = "rust" | "gemengd" | "actief";

export default function VitaCheckPage() {
  const [horizon, setHorizon] = useState<Horizon>("orientatie");
  const [support, setSupport] = useState<Support>("licht");
  const [community, setCommunity] = useState<Community>("gemengd");
  const [submitted, setSubmitted] = useState(false);

  const results = useMemo(() => {
    // simpele demo-filter: laat altijd iets zien, maar sorteer “ruwweg”
    const arr = [...(LISTINGS || [])];

    const score = (x: any) => {
      let s = 0;
      // voorkeur community match (demo)
      if (community === "actief" && (x.tags || []).join(" ").toLowerCase().includes("community")) s += 2;
      if (community === "rust" && (x.tags || []).join(" ").toLowerCase().includes("rust")) s += 2;

      // support match (demo)
      if (support === "indicatie") s += (x.careLevel === "hoog" ? 3 : 0);
      if (support === "dagelijks") s += (x.careLevel === "middel" || x.careLevel === "hoog" ? 2 : 0);
      if (support === "licht") s += (x.careLevel === "licht" || x.careLevel === "middel" ? 1 : 0);

      // horizon (demo): nieuwbouw iets hoger bij langer
      if ((horizon === "2-5j" || horizon === "1-2j") && x.isNewBuild) s += 2;
      if ((horizon === "nu" || horizon === "3-12m") && !x.isNewBuild) s += 1;

      return s;
    };

    return arr
      .map((x) => ({ ...x, _score: score(x) }))
      .sort((a, b) => (b._score || 0) - (a._score || 0))
      .slice(0, 12);
  }, [horizon, support, community]);

  return (
    <main style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>VitaCheck</h1>

      <p style={{ color: "#555", lineHeight: 1.7 }}>
        Gebruik de VitaCheck als woonkompas. U kunt vrij rondkijken en aanbod bekijken zonder gegevens achter te laten.
        Wilt u straks meldingen, wachtlijst-inschrijving of persoonlijke hulp? Dan vragen we pas om uw e-mailadres.
      </p>

      <div style={card}>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr" }}>
          <SelectBlock title="Wanneer zoekt u?" value={horizon} onChange={setHorizon} options={[
            ["orientatie", "Ik oriënteer me"],
            ["nu", "Binnen 3 maanden"],
            ["3-12m", "3–12 maanden"],
            ["1-2j", "1–2 jaar"],
            ["2-5j", "2–5 jaar"],
          ]} />

          <SelectBlock title="Hulp/ondersteuning nu" value={support} onChange={setSupport} options={[
            ["geen", "Geen"],
            ["licht", "Lichte hulp"],
            ["regelmatig", "Regelmatig"],
            ["dagelijks", "Dagelijks"],
            ["indicatie", "Indicatie aanwezig"],
          ]} />

          <SelectBlock title="Welzijn / community" value={community} onChange={setCommunity} options={[
            ["rust", "Rust & privacy"],
            ["gemengd", "Gemengd"],
            ["actief", "Actieve woonomgeving"],
          ]} />
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button style={primaryBtn} onClick={() => setSubmitted(true)}>
            Toon passend aanbod
          </button>
          <button style={ghostBtn} onClick={() => setSubmitted(false)}>
            Reset
          </button>
        </div>
      </div>

      {submitted && (
        <>
          <div style={card}>
            <strong>Uw VitaProfiel in het kort</strong>
            <p style={{ ...muted, marginTop: 8 }}>
              Op basis van uw antwoorden lijkt vooral belangrijk: comfortabel wonen nu, met voorzieningen en ondersteuning binnen bereik,
              en de mogelijkheid om hulp of zorg later te organiseren als dat nodig wordt.
            </p>
          </div>

          {/* ✅ VIDA BLOK (Gegarandeerd zichtbaar) */}
          <VidaSupportBlock />

          <h2 style={{ marginTop: 18 }}>Passend aanbod (demo)</h2>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
            {(results || []).map((w: any) => (
              <a key={w.id} href={`/woningen/${w.id}`} style={{ textDecoration: "none", color: "#111" }}>
                <div style={tile}>
                  <div style={{ fontWeight: 900 }}>{w.title || "Woning"}</div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
                    {(w.city || "Onbekend")} • {(w.type || "Appartement")}
                  </div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 8 }}>
                    {w.isNewBuild ? "Nieuwbouw / op termijn" : "Beschikbaar / bestaande bouw"}
                  </div>
                  <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
                    Klik voor details →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

function VidaSupportBlock() {
  return (
    <div style={{ ...card, background: "#fafafa" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div>
          <strong>Twijfelt u nog?</strong>
          <div style={{ ...muted, marginTop: 6, maxWidth: 760 }}>
            Het Vida-team kijkt graag onafhankelijk met u mee naar wat bij uw situatie past.
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a style={ghostLinkBtn} href="/vida">💬 Snelle vraag</a>
          <a style={ghostLinkBtn} href="/vida#meekijken">📩 Laat ons meekijken</a>
          <a style={primaryLinkBtn} href="/vida#bellen">📞 Plan een belmoment</a>
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
        VitaWoon werkt samen met verschillende aanbieders om aanbod zichtbaar te maken. Het Vida-team denkt onafhankelijk met u mee.
      </div>
    </div>
  );
}

import type { Dispatch, SetStateAction } from "react";

// ...

function SelectBlock<T extends string>(props: {
  title: string;
  value: T;
  onChange: Dispatch<SetStateAction<T>>;
  options: readonly [T, string][];
}) {
  const { title, value, onChange, options } = props;

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6 }}>{title}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #ddd",
          background: "#fff",
        }}
      >
        {options.map(([v, label]) => (
          <option key={v} value={v}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
  const { title, value, onChange, options } = props;

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6 }}>{title}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #ddd",
          background: "#fff",
        }}
      >
        {options.map(([v, label]) => (
          <option key={v} value={v}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

const card: React.CSSProperties = {
  marginTop: 14,
  padding: 16,
  border: "1px solid #eee",
  borderRadius: 16,
  background: "#fff",
};

const tile: React.CSSProperties = {
  padding: 14,
  borderRadius: 16,
  border: "1px solid #eee",
  background: "#fff",
  minHeight: 110,
};

const muted: React.CSSProperties = { color: "#555", lineHeight: 1.7 };

const primaryBtn: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};

const ghostBtn: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #e6e6e6",
  background: "#fff",
  color: "#111",
  fontWeight: 800,
  cursor: "pointer",
};

const ghostLinkBtn: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 12px",
  borderRadius: 999,
  border: "1px solid #e6e6e6",
  background: "#fff",
  color: "#111",
  fontWeight: 800,
  textDecoration: "none",
};

const primaryLinkBtn: React.CSSProperties = {
  ...ghostLinkBtn,
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
};
