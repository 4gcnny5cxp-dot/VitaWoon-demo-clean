export default function VoorNaasten() {
  return (
    <main style={{ padding: 40, maxWidth: 980, margin: "0 auto" }}>
      <h1>Voor naasten</h1>

      <p style={{ marginTop: 12, color: "#444", lineHeight: 1.6, maxWidth: 820 }}>
        Samen vooruitkijken zonder dat het meteen “over zorg” hoeft te gaan.
        VitaWoon helpt om te starten bij prettig wonen en welzijn — en pas later
        (optioneel) hulp, ondersteuning of zorg te organiseren.
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
          Bekijk aanbod op kaart
        </a>
        <a
          href="/voor-naasten-checklist"
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #111", color: "#111", textDecoration: "none" }}
        >
          Checklist
        </a>
      </div>

      <hr style={{ margin: "28px 0" }} />

      <h2>De rustige route</h2>
      <ul style={{ lineHeight: 1.8, marginTop: 10 }}>
        <li>Begin bij prettig wonen en comfort</li>
        <li>Voeg welzijn en ontmoeting toe</li>
        <li>Organiseer hulp of zorg pas wanneer dat nodig is</li>
      </ul>

      <p style={{ marginTop: 24 }}>
        <a href="/" style={{ textDecoration: "underline", color: "#111" }}>
          ← Terug naar home
        </a>
      </p>
    </main>
  );
}
