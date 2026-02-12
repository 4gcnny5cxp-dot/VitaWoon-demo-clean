import { useMemo, useState } from "react";

type Horizon = "orientatie" | "nu" | "3-12m" | "1-2j" | "2-5j";
type Support = "geen" | "licht" | "regelmatig" | "dagelijks" | "indicatie";
type Community = "rust" | "gemengd" | "actief";

type Listing = {
  id: string;
  title: string;
  city: string;
  type: string;
  isNewBuild: boolean;
  careLevel: "nvt" | "licht" | "middel" | "hoog";
  tags: string[];
  description: string;
};

const DEMO_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "De Hofjes – senior appartementen met lift",
    city: "Amsterdam",
    type: "Appartement",
    isNewBuild: false,
    careLevel: "licht",
    tags: ["lift", "voorzieningen", "community"],
    description: "Comfortabel wonen, gelijkvloers, met voorzieningen binnen bereik.",
  },
  {
    id: "2",
    title: "Parkzicht – rustige woonomgeving",
    city: "Amstelveen",
    type: "Appartement",
    isNewBuild: false,
    careLevel: "nvt",
    tags: ["rust", "groen"],
    description: "Rustige ligging, privacy, nabij park en winkels.",
  },
  {
    id: "3",
    title: "Nieuwbouw: Vitaal Wonen aan het Plein",
    city: "Haarlem",
    type: "Nieuwbouw",
    isNewBuild: true,
    careLevel: "middel",
    tags: ["nieuwbouw", "community", "voorzieningen"],
    description: "Nieuwbouw met gemeenschappelijke ruimte en services die te organiseren zijn.",
  },
  {
    id: "4",
    title: "Toekomstbestendig complex – ondersteuning te organiseren",
    city: "Utrecht",
    type: "Appartement",
    isNewBuild: false,
    careLevel: "hoog",
    tags: ["zorggeschikt", "lift", "voorzieningen"],
    description: "Wonen met opties voor hulp, ondersteuning en zorg wanneer dat later nodig is.",
  },
];

export default function VitaCheckPage() {
  // Inputs (anoniem)
  const [horizon, setHorizon] = useState<Horizon>("orientatie");
  const [support, setSupport] = useState<Support>("licht");
  const [community, setCommunity] = useState<Community>("gemengd");

  // Flow
  const [submitted, setSubmitted] = useState(false);
  const [wantsMore, setWantsMore] = useState(false);
  const [email, setEmail] = useState("");

  const results = useMemo(() => {
    const score = (x: Listing) => {
      let s = 0;
      const tagText = x.tags.join(" ").toLowerCase();

      // Community match
      if (community === "actief" && tagText.includes("community")) s += 2;
      if (community === "rust" && (tagText.includes("rust") || tagText.includes("groen"))) s += 2;

      // Support match (globaal)
      if (support === "indicatie") s += x.careLevel === "hoog" ? 3 : 0;
      if (support === "dagelijks") s += x.careLevel === "middel" || x.careLevel === "hoog" ? 2 : 0;
      if (support === "regelmatig") s += x.careLevel === "middel" ? 2 : 1;
      if (support === "licht") s += x.careLevel === "licht" || x.careLevel === "middel" ? 1 : 0;
      if (support === "geen") s += x.careLevel === "nvt" ? 2 : 0;

      // Horizon match (nieuwbouw hoger bij langere termijn)
      if ((horizon === "2-5j" || horizon === "1-2j") && x.isNewBuild) s += 2;
      if ((horizon === "nu" || horizon === "3-12m") && !x.isNewBuild) s += 1;

      return s;
    };

    return [...DEMO_LISTINGS]
      .map((x) => ({ ...x, _score: score(x) }))
      .sort((a: any, b: any) => (b._score || 0) - (a._score || 0));
  }, [horizon, support, community]);

  const shortResults = results.slice(0, 3);
  const fullResults = results.slice(0, 12);

  return (
    <main style={{ padding: "40px", maxWidth: "1050px", margin: "0 auto" }}>
      <h1>VitaCheck</h1>

      <p style={muted}>
        Gebruik de VitaCheck als woonkompas. U kunt vrij rondkijken en aanbod bekijken zonder gegevens achter te laten.
        Wilt u straks meldingen, wachtlijst-inschrijving of persoonlijke hulp? Dan kunt u dat later kiezen.
      </p>

      <div style={card}>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr" }}>
          <SelectBlock<Horizon>
            title="Wanneer zoekt u?"
            value={horizon}
            onChange={setHorizon}
            options={[
              { value: "orientatie", label: "Ik oriënteer me" },
              { value: "nu", label: "Binnen 3 maanden" },
              { value: "3-12m", label: "3–12 maanden" },
              { value: "1-2j", label: "1–2 jaar" },
              { value: "2-5j", label: "2–5 jaar" },
            ]}
          />

          <SelectBlock<Support>
            title="Hulp/ondersteuning nu"
            value={support}
            onChange={setSupport}
            options={[
              { value: "geen", label: "Geen" },
              { value: "licht", label: "Lichte hulp" },
              { value: "regelmatig", label: "Regelmatig" },
              { value: "dagelijks", label: "Dagelijks" },
              { value: "indicatie", label: "Indicatie aanwezig" },
            ]}
          />

          <SelectBlock<Community>
            title="Welzijn / community"
            value={community}
            onChange={setCommunity}
            options={[
              { value: "rust", label: "Rust & privacy" },
              { value: "gemengd", label: "Gemengd" },
              { value: "actief", label: "Actieve woonomgeving" },
            ]}
          />
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button style={primaryBtn} onClick={() => setSubmitted(true)}>
            Toon passend aanbod
          </button>
          <button
            style={ghostBtn}
            onClick={() => {
              setSubmitted(false);
              setWantsMore(false);
              setEmail("");
              setHorizon("orientatie");
              setSupport("licht");
              setCommunity("gemengd");
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {!submitted ? null : (
        <>
          <div style={card}>
            <strong>Uw VitaProfiel in het kort</strong>
            <p style={{ ...muted, marginTop: 8 }}>
              Comfortabel wonen staat centraal. U wilt kunnen kiezen voor voorzieningen en ondersteuning binnen bereik,
              en hulp of zorg kunnen organiseren wanneer dat later nodig is.
            </p>
            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
              <MiniInfo title="Termijn" text={labelHorizon(horizon)} />
              <MiniInfo title="Zelf regie" text="U kunt vrij rondkijken. Verdieping is altijd optioneel." />
            </div>
          </div>

          {/* VIDA (op het juiste moment: na resultaat) */}
          <VidaSupportBlock />

          <h2 style={{ marginTop: 18 }}>Passend aanbod (demo)</h2>

          <p style={muted}>
            Hieronder ziet u alvast een eerste selectie. Wilt u meer resultaten en updates ontvangen? Dat kan optioneel.
          </p>

          <Grid>
            {(wantsMore ? fullResults : shortResults).map((w) => (
              <a key={w.id} href={`/woningen/${w.id}`} style={{ textDecoration: "none", color: "#111" }}>
                <div style={tile}>
                  <div style={{ fontWeight: 900 }}>{w.title}</div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
                    {w.city} • {w.type}
                  </div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 8 }}>
                    {w.isNewBuild ? "Nieuwbouw / op termijn" : "Beschikbaar / bestaande bouw"}
                  </div>
                  <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>Klik voor details →</div>
                </div>
              </a>
            ))}
          </Grid>

          {!wantsMore ? (
            <div style={{ ...card, background: "#fafafa" }}>
              <strong>Wilt u meer resultaten en updates?</strong>
              <p style={{ ...muted, marginTop: 8 }}>
                Voor het volledige overzicht (meer woningen, nieuwbouw op termijn) en om op de hoogte te blijven,
                kunt u uw e-mailadres invullen. Dit is optioneel.
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mailadres"
                  style={{ ...inputStyle, minWidth: 260 }}
                />
                <button
                  style={primaryBtn}
                  onClick={() => {
                    if (!email.trim()) {
                      alert("Vul een e-mailadres in (demo).");
                      return;
                    }
                    setWantsMore(true);
                  }}
                >
                  Toon volledig overzicht
                </button>

                <button style={ghostBtn} onClick={() => setWantsMore(true)}>
                  Liever zonder e-mail (demo)
                </button>
              </div>

              <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
                U kunt zich later weer uitschrijven. (Demo)
              </div>
            </div>
          ) : null}
        </>
      )}
    </main>
  );
}

/** ---------- Components ---------- */

function VidaSupportBlock() {
  return (
    <div style={{ ...card, background: "#fafafa" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div>
          <strong>Twijfelt u nog?</strong>
          <div style={{ ...muted, marginTop: 6, maxWidth: 760 }}>
            Het Vida-team denkt onafhankelijk met u mee — digitaal voor snelle vragen, en persoonlijk als u liever even belt.
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

function MiniInfo(props: { title: string; text: string }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 12, background: "#fff" }}>
      <div style={{ fontSize: 12, color: "#666" }}>{props.title}</div>
      <div style={{ fontWeight: 900, marginTop: 4 }}>{props.text}</div>
    </div>
  );
}

function Grid(props: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
      {props.children}
    </div>
  );
}

type SelectOption<T extends string> = { value: T; label: string };

function SelectBlock<T extends string>(props: {
  title: string;
  value: T;
  onChange: (v: T) => void;
  options: SelectOption<T>[];
}) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6 }}>{props.title}</div>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value as T)}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #ddd",
          background: "#fff",
        }}
      >
        {props.options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** ---------- Helpers ---------- */

function labelHorizon(h: Horizon) {
  if (h === "nu") return "Binnen 3 maanden";
  if (h === "3-12m") return "3–12 maanden";
  if (h === "1-2j") return "1–2 jaar";
  if (h === "2-5j") return "2–5 jaar";
  return "Oriëntatie";
}

/** ---------- Styles ---------- */

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

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #ddd",
  width: "100%",
};

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
