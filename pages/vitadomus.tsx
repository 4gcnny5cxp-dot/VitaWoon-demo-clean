export default function VitaDomus() {
  return (
    <main>
      <div className="container">
        <h1>VitaDomus</h1>
        <p className="muted" style={{ maxWidth: 820 }}>
          VitaDomus is het platform achter VitaWoon. Wij organiseren de verbinding tussen wonen, welzijn
          en (optioneel) hulp, ondersteuning en zorg — vanuit één regiepunt, met bewoners en naasten centraal.
        </p>

        <div className="btnRow">
          <a className="btn btnPrimary" href="/voor-aanbieders">Samenwerken als aanbieder</a>
          <a className="btn btnGhost" href="/woningen">Bekijk VitaWoon</a>
        </div>

        <hr style={{ margin: "28px 0" }} />

        <h2>Het probleem dat we oplossen</h2>
        <div className="card">
          <p style={{ margin: 0, color: "#444", lineHeight: 1.6 }}>
            De woonvraag ontstaat vroeg, maar aanbod en dienstverlening sluiten vaak pas laat aan.
            VitaDomus brengt vraag en aanbod samen rondom wonen en welzijn, zonder dat alles meteen “zorg” hoeft te zijn.
            Daardoor ontstaat rust, keuzevrijheid en beter passende doorstroming.
          </p>
        </div>

        <hr style={{ margin: "28px 0" }} />

        <h2>Wat VitaDomus organiseert</h2>
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr", marginTop: 12 }}>
          <Card
            title="Vraag- en aanbodmatching"
            text="Via VitaWoon, VitaCheck en gedragsdata wordt matching slimmer en eerder in de keten."
          />
          <Card
            title="Inzichten (VitaCheck)"
            text="Wat beweegt bewoners en naasten écht? Inzichten helpen aanbod, concepten en communicatie verbeteren."
          />
          <Card
            title="Keten-orkestratie"
            text="Optioneel: verhuurservice, beheer en community rondom woonlocaties en wijken."
          />
          <Card
            title="Later te organiseren"
            text="Hulp/ondersteuning/zorg zijn beschikbaar wanneer nodig, zonder dat het de instap bepaalt."
          />
        </div>

        <hr style={{ margin: "28px 0" }} />

        <h2>Waarom de scheiding werkt</h2>
        <div className="card">
          <ul style={{ marginTop: 0, lineHeight: 1.8 }}>
            <li><strong>VitaWoon</strong> is het merk voor zoekers (bewoners & naasten).</li>
            <li><strong>VitaDomus</strong> is de organisatie die de keten organiseert (platform/regie).</li>
            <li>Dit maakt het helder, betrouwbaar en schaalbaar.</li>
          </ul>
        </div>

        <p style={{ marginTop: 22 }}>
          <a className="link" href="/">← Terug</a>
        </p>
      </div>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="card">
      <strong>{title}</strong>
      <p style={{ marginTop: 8, color: "#444", lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}
