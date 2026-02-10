export default function DolceVita() {
  return (
    <main>
      <div className="container">
        <h1>Dolce Vita (demo)</h1>
        <p className="muted" style={{ maxWidth: 900 }}>
          Een lichte community rondom uw nieuwe woonomgeving. U bepaalt zelf wat u doet: contact leggen, wegwijs worden, activiteiten vinden.
        </p>

        <div className="card">
          <h3>Wat u hier kunt doen</h3>
          <ul style={{ lineHeight: 1.9 }}>
            <li>Nieuw in de buurt: wie is ook net verhuisd?</li>
            <li>Wegwijs: tips, plekken, services en activiteiten</li>
            <li>Bakkie doen? laagdrempelig contact leggen</li>
          </ul>

          <div className="card" style={{ marginTop: 12, background: "#fafafa" }}>
            <strong>Contact (via WhatsApp – demo)</strong>
            <p className="muted" style={{ marginTop: 8 }}>
              In de echte versie kiest u interesses/voorkeuren en wordt contact veilig gefaciliteerd. In de demo linken we door naar WhatsApp.
            </p>
            <div className="btnRow" style={{ marginTop: 10 }}>
              <a
                className="btn btnPrimary"
                href="https://wa.me/?text=Hoi!%20Ik%20ben%20nieuw%20in%20de%20buurt.%20Zin%20in%20een%20bakkie%20koffie%3F"
                target="_blank"
                rel="noreferrer"
              >
                Stuur bericht →
              </a>
              <a className="btn btnGhost" href="/woningen">Terug naar woningen</a>
            </div>
          </div>
        </div>

        <p style={{ marginTop: 24 }}>
          <a href="/" style={{ textDecoration: "underline" }}>← Terug</a>
        </p>
      </div>
    </main>
  );
}
