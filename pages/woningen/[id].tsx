import { useRouter } from "next/router";
import { LISTINGS } from "../../lib/demoData";

export default function WoningDetail() {
  const router = useRouter();
  const { id } = router.query;

  const woning = (LISTINGS || []).find((w: any) => String(w.id) === String(id));

  if (!woning) {
    return (
      <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
        <h1>Woning</h1>
        <p style={{ color: "#555" }}>Deze woning is (nog) niet gevonden in de demo-data.</p>
        <p><a href="/woningen" style={{ textDecoration: "underline" }}>← Terug naar overzicht</a></p>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <p><a href="/woningen" style={{ textDecoration: "underline" }}>← Terug naar overzicht</a></p>

      <h1 style={{ marginTop: 10 }}>{woning.title}</h1>
      <p style={{ color: "#666", marginTop: 6 }}>
        {(woning.city || "Onbekend")} • {(woning.type || "Appartement")} • {woning.isNewBuild ? "Nieuwbouw / op termijn" : "Bestaand aanbod"}
      </p>

      <div style={card}>
        <strong>Over deze woning</strong>
        <p style={{ ...muted, marginTop: 8 }}>
          {woning.description || "Demo-omschrijving. Hier komt later een echte omschrijving per complex/woning."}
        </p>

        <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr 1fr", marginTop: 12 }}>
          <Fact label="Type" value={woning.type || "—"} />
          <Fact label="Plaats" value={woning.city || "—"} />
          <Fact label="Zorg/ondersteuning" value={woning.careLevel || "—"} />
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a style={primaryLinkBtn} href="/vitacheck">Doe VitaCheck</a>
          <a style={ghostLinkBtn} href="#inschrijven">Inschrijven (demo)</a>
        </div>
      </div>

      {/* ✅ VIDA BLOK OP DETAIL (Gegarandeerd zichtbaar) */}
      <VidaOnDetail />

      <div id="inschrijven" style={card}>
        <strong>Inschrijven / wachtlijst (demo)</strong>
        <p style={{ ...muted, marginTop: 8 }}>
          Hier komt straks de wachtlijst-inschrijving per complex, inclusief gemiddelde wachttijd en “op de hoogte blijven”.
        </p>

        <div style={{ display: "grid", gap: 10, maxWidth: 520, marginTop: 10 }}>
          <input placeholder="Naam" style={inputStyle} />
          <input placeholder="E-mail" style={inputStyle} />
          <button style={primaryBtn}>Inschrijven (demo)</button>
        </div>
      </div>
    </main>
  );
}

function VidaOnDetail() {
  return (
    <div style={{ ...card, background: "#fafafa" }}>
      <strong>Vragen over deze woning?</strong>
      <p style={{ ...muted, marginTop: 8 }}>
        Vida denkt graag met u mee — ook als u nog twijfelt of dit de juiste stap is.
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
        <a style={ghostLinkBtn} href="/vida">💬 Snelle vraag</a>
        <a style={ghostLinkBtn} href="/vida#meekijken">📩 Laat Vida meekijken</a>
        <a style={primaryLinkBtn} href="/vida#bellen">📞 Plan een belmoment</a>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
        VitaWoon werkt samen met verschillende aanbieders om aanbod zichtbaar te maken. Het Vida-team denkt onafhankelijk met u mee.
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 12, background: "#fff" }}>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontWeight: 900, marginTop: 4 }}>{value}</div>
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
