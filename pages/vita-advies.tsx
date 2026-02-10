export default function VitaAdvies() {
  return (
    <main>
      <div className="container">
        <h1>Vita Advies</h1>
        <p className="muted" style={{ maxWidth: 900 }}>
          Hulp bij documenten, inschrijven en het voorbereiden van de verhuizing — zodat u (en uw naasten) overzicht houdt.
        </p>

        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
          <div className="card">
            <h3>Eenmalig advies</h3>
            <ul style={{ lineHeight: 1.9 }}>
              <li>Documentencheck</li>
              <li>Inschrijfhulp / profiel aanscherpen</li>
              <li>Korte planning “wat nu, wat later”</li>
            </ul>
            <p className="muted">Ideaal als u snel duidelijkheid wilt.</p>
            <a className="btn btnPrimary" href="/contact">Vraag aan →</a>
          </div>

          <div className="card">
            <h3>Abonnement tot verhuizing</h3>
            <ul style={{ lineHeight: 1.9 }}>
              <li>Periodieke check-ins</li>
              <li>Wachtlijst & aanbod-updates (concept)</li>
              <li>Begeleiding tot en met de match</li>
            </ul>
            <p className="muted">Ideaal als u nog in oriëntatie zit.</p>
            <a className="btn btnPrimary" href="/contact">Vraag aan →</a>
          </div>
        </div>

        <div className="card" style={{ marginTop: 14, background: "#fafafa" }}>
          <strong>Voor aanbieders (VitaDomus)</strong>
          <p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
            VitaDomus borgt randvoorwaarden in het proces: transparantie, wachtlijstbeheer en nazorg — omdat de reis na de match pas begint.
          </p>
          <a href="/voor-aanbieders" style={{ textDecoration: "underline" }}>Lees meer →</a>
        </div>

        <p style={{ marginTop: 24 }}>
          <a href="/" style={{ textDecoration: "underline" }}>← Terug</a>
        </p>
      </div>
    </main>
  );
}
