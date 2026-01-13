export default function VoorNaasten() {
  return (
    <main style={{ padding: "40px", maxWidth: "980px", margin: "0 auto" }}>
      {/* Titel */}
      <h1 style={{ margin: 0 }}>Voor naasten</h1>

      {/* Actieknoppen */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
        <a
          href="/vitacheck"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            background: "#111",
            color: "#fff",
            textDecoration: "none"
          }}
        >
          Start met VitaCheck
        </a>

        <a
          href="/woningen/kaart"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #111",
            textDecoration: "none",
            color: "#111"
          }}
        >
          Bekijk aanbod op kaart
        </a>

        <a
          href="/voor-naasten/checklist"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #111",
            textDecoration: "none",
            color: "#111"
          }}
        >
          Checklist
        </a>
      </div>

      {/* Intro */}
      <p style={{ marginTop: 20, color: "#444", lineHeight: 1.6, maxWidth: 820 }}>
        Als naaste wil je het goed doen. Voor nu én voor later.  
        Toch is het gesprek over wonen en ouder worden niet altijd makkelijk.
        VitaWoon helpt om rustig te beginnen bij prettig wonen, welzijn en overzicht —
        zonder dat het meteen over zorg hoeft te gaan.
      </p>

      <hr style={{ margin: "30px 0" }} />

      {/* Herkenning */}
      <h2>Herkenbaar?</h2>
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr", marginTop: 12 }}>
        <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16 }}>
          <strong>“Het gaat nog prima.”</strong>
          <p style={{ marginTop: 8, color: "#444", lineHeight: 1.6 }}>
            Vaak klopt dat ook. Maar het gesprek begint meestal pas als er druk ontstaat.
            Door nu al te kijken naar wonen en welzijn, ontstaat rust en keuzevrijheid.
          </p>
        </div>

        <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16 }}>
          <strong>“Zorg is nog helemaal niet nodig.”</strong>
          <p style={{ marginTop: 8, color: "#444", lineHeight: 1.6 }}>
            Precies daarom begint VitaWoon niet bij zorg.
            Hulp en zorg zijn later optioneel — maar het is prettig om te weten wat er kan.
          </p>
        </div>
      </div>

      <hr style={{ margin: "30px 0" }} />

      {/* 3 stappen */}
      <h2>De rustige route in 3 stappen</h2>
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr 1fr", marginTop: 12 }}>
        <Step
          number="1"
          title="Prettig wonen nu"
          text="Comfort, bereikbaarheid, logische indeling en een fijne omgeving."
        />
        <Step
          number="2"
          title="Welzijn & omkijken"
          text="Ontmoeting, activiteiten en een gevoel van verbondenheid."
        />
        <Step
          number="3"
          title="Zekerheid voor later"
          text="Hulp, ondersteuning en zorg kunnen later georganiseerd worden — als dat nodig is."
        />
      </div>

      <hr style={{ margin: "30px 0" }} />

      {/* Gespreksstarter */}
      <h2>Gespreksstarter (5 minuten)</h2>
      <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16, background: "#fafafa" }}>
        <ul style={{ lineHeight: 1.8 }}>
          <li>Wat maakt het wonen nu prettig?</li>
          <li>Wat zou het wonen makkelijker maken?</li>
          <li>Wat geeft plezier of structuur in de week?</li>
          <li>Als er later hulp nodig is, wat zou dan fijn zijn?</li>
          <li>Welke omgeving voelt als ‘thuis’?</li>
        </ul>
        <p style={{ marginTop: 10, fontSize: 13, color: "#666" }}>
          Tip: doe samen de VitaCheck. Dat maakt wensen concreet zonder druk.
        </p>
      </div>

      <hr style={{ margin: "30px 0" }} />

      {/* Geen aanbod */}
      <h2>Geen passend aanbod gevonden?</h2>
      <p style={{ color: "#444", lineHeight: 1.6, maxWidth: 820 }}>
        Dat is heel normaal. Via de VitaCheck kun je je e-mailadres achterlaten.
        We houden je dan op de hoogte zodra er passend aanbod beschikbaar komt.
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
        <a
          href="/vitacheck"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            background: "#111",
            color: "#fff",
            textDecoration: "none"
          }}
        >
          Start VitaCheck
        </a>
        <a
          href="/woningen"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #111",
            textDecoration: "none",
            color: "#111"
          }}
        >
          Bekijk woningen
        </a>
      </div>

      <p style={{ marginTop: 30 }}>
        <a href="/">← Terug naar VitaWoon</a>
      </p>
    </main>
  );
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16 }}>
      <div style={{ fontSize: 12, color: "#666" }}>Stap {number}</div>
      <div style={{ fontWeight: 700, marginTop: 6 }}>{title}</div>
      <p style={{ marginTop: 8, color: "#444", lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}
