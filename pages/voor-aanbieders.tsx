export default function VoorAanbieders() {
  return (
    <main>
      <div className="container">
        <h1>Voor aanbieders</h1>
        <p className="muted" style={{ maxWidth: 820 }}>
          VitaWoon is dé plek waar ouderen en hun naasten zich vroeg oriënteren op een volgende woonstap.
          Wonen en welzijn staan centraal; hulp, ondersteuning en zorg zijn optioneel en later te organiseren.
        </p>

        <div className="btnRow">
          <a className="btn btnPrimary" href="/vitadomus">Over VitaDomus</a>
          <a className="btn btnGhost" href="/woningen">Bekijk VitaWoon</a>
        </div>

        <hr style={{ margin: "28px 0" }} />

        <h2>Waarom VitaWoon?</h2>
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr", marginTop: 12 }}>
          <Card
            title="Vroege instroom"
            text="Bezoekers oriënteren vóórdat er druk ontstaat. Dat vergroot keuzevrijheid, doorlooptijd en kwaliteit van matching."
          />
          <Card
            title="Naasten zoeken mee"
            text="De beslissing wordt vaak samen genomen. VitaWoon spreekt bewoners én naasten aan."
          />
          <Card
            title="Wonen centraal"
            text="Geen zorgportaal. Eerst prettig wonen en welzijn, daarna eventueel hulp/ondersteuning/zorg."
          />
          <Card
            title="Nieuwbouw & concepten"
            text="Positioneer projecten vroeg bij een relevante doelgroep (huur/koop/nieuwbouw/concepten)."
          />
        </div>

        <hr style={{ margin: "28px 0" }} />

        <h2>Wat u via VitaWoon kunt</h2>
        <ul style={{ lineHeight: 1.8, marginTop: 10 }}>
          <li>Aanbod plaatsen (huur/koop/nieuwbouw/concepten)</li>
          <li>Bereik bij senioren en naasten in oriëntatiefase</li>
          <li>Gerichte instroom via VitaCheck (demo)</li>
          <li>Optioneel: koppeling met verhuurservice, beheer en community</li>
        </ul>

        <hr style={{ margin: "28px 0" }} />

        <h2>Samenwerken (demo)</h2>
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr 1fr", marginTop: 12 }}>
          <Step number="1" title="Aanbod tonen" text="Plaats woningen en projecten zichtbaar op VitaWoon." />
          <Step number="2" title="Match op behoefte" text="VitaCheck + zoekgedrag helpen vraag en aanbod te verbinden." />
          <Step number="3" title="Opschalen" text="Optioneel: beheer, community en diensten rondom wonen." />
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

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="card">
      <div style={{ fontSize: 12, color: "#666" }}>Stap {number}</div>
      <strong>{title}</strong>
      <p style={{ marginTop: 8, color: "#444", lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}
