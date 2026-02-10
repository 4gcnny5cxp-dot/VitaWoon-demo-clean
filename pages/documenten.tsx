export default function Documenten() {
  return (
    <main>
      <div className="container">
        <h1>Documenten op orde</h1>
        <p className="muted" style={{ maxWidth: 900 }}>
          Een praktische checklist om u (en uw naasten) te helpen bij inschrijving, verhuizing en een goede start.
        </p>

        <div className="card">
          <h3>Algemeen</h3>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Geldig identiteitsbewijs</li>
            <li>Inkomensgegevens / pensioenoverzicht (globaal)</li>
            <li>Contactgegevens van naaste(n) (optioneel)</li>
          </ul>

          <h3>Huur (vaak gevraagd)</h3>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Verhuurdersverklaring (indien van toepassing)</li>
            <li>Recente loon-/pensioenstroken</li>
            <li>Bankafschriften (soms)</li>
          </ul>

          <h3>Koop (vaak gevraagd)</h3>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Financieel overzicht / gesprek met adviseur</li>
            <li>Hypotheek- of overbruggingsinformatie (indien relevant)</li>
          </ul>

          <h3>Als er al zorg/hulp speelt (optioneel)</h3>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Indicatie/route (Wmo/Zvw/Wlz) als u dit heeft</li>
            <li>Overzicht van huidige ondersteuning</li>
            <li>Contact van wijkteam/organisatie (optioneel)</li>
          </ul>

          <div className="card" style={{ marginTop: 14, background: "#fafafa" }}>
            <strong>Vita Advies</strong>
            <p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
              Wilt u hulp bij het verzamelen, invullen en controleren van documenten? Wij kunnen dit samen met u (en uw naasten) doen.
            </p>
            <a className="btn btnPrimary" href="/vita-advies">Bekijk Vita Advies →</a>
          </div>
        </div>

        <p style={{ marginTop: 24 }}>
          <a href="/" style={{ textDecoration: "underline" }}>← Terug</a>
        </p>
      </div>
    </main>
  );
}
