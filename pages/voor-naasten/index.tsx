export default function VoorNaasten() {
  return (
    <main style={{ padding: 40, maxWidth: 980, margin: "0 auto" }}>
      <h1>Voor naasten</h1>

      <p style={{ marginTop: 12, color: "#444", lineHeight: 1.6, maxWidth: 820 }}>
        Samen vooruitkijken zonder dat het meteen “over zorg” hoeft te gaan.
        VitaWoon helpt om te starten bij prettig wonen en welzijn — en pas later (optioneel) hulp, ondersteuning of zorg te organiseren.
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
        <a
          href="/vitacheck"
          style={{ padding: "10px 14px", borderRadius: 10, background: "#111", color: "#fff", textDecoration: "none" }}
        >
          Start met VitaCheck
        </a>
        <a
          href="/woningen/kaart"
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #111", color: "#111", textDecoration: "none" }}
        >
          Bekijk op kaart
        </a>
        <a
          href="/voor-naasten/checklist"
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #111", color: "#111", textDecoration: "none" }}
        >
          Checklist
        </a>
      </div>

      <hr style={{ margin: "28px 0" }} />

      <h2>Wat je vaak ziet</h2>
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr", marginTop: 12 }}>
        <Card
          title="“Het gaat nog prima.”"
          text="Meestal klopt dat. Maar het gesprek start vaak pas als er druk ontstaat. Door nu rustig te kijken naar wonen en welzijn ontstaat keuzevrijheid."
        />
        <Card
          title="“Zorg? Dat is nog niet nodig.”"
          text="Precies. Daarom begint VitaWoon bij wonen. Hulp/ondersteuning/zorg kan later, maar het is fijn om te weten wat er mogelijk is."
        />
      </div>

      <hr style={{ margin: "28px 0" }} />

      <h2>De rustige route in 3 stappen</h2>
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr 1fr", marginTop: 12 }}>
        <Step number="1" title="Prettig wonen nu" text="Comfort, bereikbaarheid, logische indeling en een fijne omgeving." />
        <Step number="2" title="Welzijn & omkijken" text="Ontmoeting, activiteiten en verbondenheid maken langer prettig wonen vaak makkelijker." />
        <Step number="3" title="Zekerheid voor later" text="Hulp, ondersteuning en zorg zijn optioneel en later te organiseren — als dat nodig is." />
      </div>

      <hr style={{ margin: "28px 0" }} />

      <h2>Gespreksstarter (5 minuten)</h2>
      <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16, background: "#fafafa" }}>
        <ul style={{ lineHeight: 1.8, marginTop: 6 }}>
          <li>Waar woon je nu het prettigst aan — en wat wil je behouden?</li>
          <li>Wat zou het wonen makkelijker maken (lift, gelijkvloers, winkels dichtbij)?</li>
          <li>Welke dingen geven plezier of structuur (ontmoeting, activiteiten, buurt)?</li>
          <li>Als er later hulp nodig is: wat zou je dan fijn vinden om te kunnen regelen?</li>
          <li>Welke plek/omgeving voelt “thuis” (dichtbij familie, groen, stad/dorp)?</li>
        </ul>
        <p style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
          Tip: doe de VitaCheck samen. Dat maakt wensen concreet zonder druk.
        </p>
      </div>

      <hr style={{ margin: "28px 0" }} />

      <h2>Als er (nog) geen passend aanbod is</h2>
      <p style={{ color: "#444", lineHeight: 1.6, maxWidth: 820 }}>
        Dat is normaal. In de VitaCheck kun je je e-mailadres achterlaten om op de hoogte te blijven zodra er passend aanbod beschikbaar komt.
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
        <a
          href="/vitacheck"
          style={{ padding: "10px 14px", borderRadius: 10, background: "#111", color: "#fff", textDecoration: "none" }}
        >
          VitaCheck starten
        </a>
        <a
          href="/woningen"
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #111", color: "#111", textDecoration: "none" }}
        >
          Bekijk woningen
        </a>
      </div>

      <p style={{ marginTop: 24 }}>
        <a href="/" style={{ textDecoration: "underline", color: "#111" }}>
          ← Terug
        </a>
      </p>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16 }}>
      <strong>{title}</strong>
      <p style={{ marginTop: 8, color: "#444", lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16 }}>
      <div style={{ fontSize: 12, color: "#666" }}>Stap {number}</div>
      <strong>{title}</strong>
      <p style={{ marginTop: 8, color: "#444", lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}
