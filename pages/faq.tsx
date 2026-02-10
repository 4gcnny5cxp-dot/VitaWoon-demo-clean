export default function FAQ() {
  return (
    <main>
      <div className="container">
        <h1>FAQ</h1>
        <p className="muted" style={{ maxWidth: 900 }}>
          Antwoorden op veelgestelde vragen over wonen, wachtlijsten, ondersteuning en het proces.
        </p>

        <div className="card">
          <h3>Hoe werkt de VitaCheck?</h3>
          <p className="muted">
            U vult in wat u nu heeft en wat u later wilt kunnen organiseren. Daarna ziet u woningen en concepten die daar bij passen (demo).
          </p>

          <h3>Is “zorg” verplicht?</h3>
          <p className="muted">
            Nee. Wonen en welzijn staan centraal. Hulp, ondersteuning en zorg zijn optioneel en te organiseren wanneer nodig.
          </p>

          <h3>Hoe werkt inschrijven / wachtlijst?</h3>
          <p className="muted">
            Bij een passend complex kunt u zich inschrijven. In de echte versie ontvangt u updates over beschikbaarheid en doorlooptijd.
          </p>

          <h3>Wat bedoelen jullie met welzijn & community?</h3>
          <p className="muted">
            Ontmoeting, activiteiten, omkijken, wegwijs worden in de buurt — zodat u prettig kunt landen en eenzaamheid wordt tegengegaan.
          </p>

          <h3>Helpen jullie met documenten?</h3>
          <p className="muted">
            Ja, via Vita Advies kunt u een documentencheck of inschrijfhulp afnemen (eenmalig of als abonnement).
          </p>

          <div className="btnRow" style={{ marginTop: 12 }}>
            <a className="btn btnGhost" href="/documenten">Documenten op orde</a>
            <a className="btn btnPrimary" href="/vita-advies">Vita Advies</a>
          </div>
        </div>

        <p style={{ marginTop: 24 }}>
          <a href="/" style={{ textDecoration: "underline" }}>← Terug</a>
        </p>
      </div>
    </main>
  );
}
