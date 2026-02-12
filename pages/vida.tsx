export default function Vida() {
  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Vida</h1>

      <p style={{ color: "#555", lineHeight: 1.7 }}>
        Vida is het gezicht van het vaste begeleidteam van VitaWoon. We denken onafhankelijk met u mee bij uw volgende
        woonstap — digitaal voor snelle vragen, en persoonlijk als u liever even belt of wilt dat we met u meekijken.
      </p>

      <div style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>💬 Snelle vraag (chat – demo)</h2>
        <p style={muted}>
          Voor vragen als: “Wat bedoelen jullie met ondersteuning?”, “Hoe werkt een wachtlijst?” of “Wanneer komt een woning vrij?”.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <QuickButton>Hoe werkt de wachtlijst?</QuickButton>
          <QuickButton>Wat is VPT?</QuickButton>
          <QuickButton>Wanneer komt er aanbod vrij?</QuickButton>
          <QuickButton>Wat bedoelen jullie met “binnen bereik”?</QuickButton>
        </div>

        <p style={{ ...muted, marginTop: 12 }}>
          (Demo) In een volgende stap koppelen we dit aan een echte chatmodule.
        </p>
      </div>

      <div id="meekijken" style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>📩 Laat ons met u meekijken</h2>
        <p style={muted}>
          Wilt u dat we met u meekijken naar uw situatie? Laat kort uw vraag achter — het Vida-team neemt contact op.
        </p>

        <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
          <input placeholder="Naam" style={inputStyle} />
          <input placeholder="E-mail" style={inputStyle} />
          <input placeholder="Telefoon (optioneel)" style={inputStyle} />
          <textarea placeholder="Uw vraag" style={{ ...inputStyle, minHeight: 110 }} />
          <button style={primaryBtn}>Verstuur (demo)</button>
        </div>
      </div>

      <div id="bellen" style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>📞 Plan een belmoment</h2>
        <p style={muted}>
          Wilt u uw situatie persoonlijk bespreken? Plan een moment dat u uitkomt. Vida of één van het vaste team neemt de tijd voor u.
        </p>
        <p style={{ ...muted, marginTop: 10 }}>
          (Demo) Hier kun je later een belafspraak-link (bijv. Calendly) toevoegen.
        </p>
      </div>

      <div style={{ marginTop: 22, fontSize: 12, color: "#666" }}>
        VitaWoon werkt samen met verschillende aanbieders om aanbod zichtbaar te maken. Het Vida-team denkt onafhankelijk met u mee.
      </div>

      <p style={{ marginTop: 24 }}>
        <a href="/" style={{ textDecoration: "underline" }}>← Terug naar Home</a>
      </p>
    </main>
  );
}

function QuickButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        padding: "10px 12px",
        borderRadius: 999,
        border: "1px solid #e6e6e6",
        background: "#fff",
        cursor: "pointer",
        fontWeight: 700,
      }}
      onClick={() => alert("Demo: hier zou Vida direct antwoorden geven.")}
    >
      {children}
    </button>
  );
}

const cardStyle: React.CSSProperties = {
  marginTop: 14,
  padding: 16,
  border: "1px solid #eee",
  borderRadius: 16,
  background: "#fafafa",
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
  cursor: "pointer",
  fontWeight: 800,
};
