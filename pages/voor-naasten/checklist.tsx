export default function Checklist() {
  return (
    <main style={{ padding: 40, maxWidth: 980, margin: "0 auto" }}>
      <h1>Bezichtigings-checklist (voor naasten)</h1>

      <p style={{ marginTop: 12, color: "#444", lineHeight: 1.6, maxWidth: 820 }}>
        Praktische checklist om te zien of een woning nu prettig is én later goed blijft passen.
        Wonen en welzijn centraal; hulp en zorg zijn optioneel.
      </p>

      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr", marginTop: 18 }}>
        <Section
          title="Toegankelijkheid & comfort"
          items={[
            "Is er een lift of is alles gelijkvloers?",
            "Hoe zijn drempels, deuren en doorgangen?",
            "Is de badkamer veilig en ruim genoeg?",
            "Is er voldoende licht en overzicht in huis?",
            "Is de indeling logisch (slaapkamer/badkamer bereikbaar)?"
          ]}
        />
        <Section
          title="Voorzieningen & bereik"
          items={[
            "Winkels, huisarts, apotheek: dichtbij of goed te organiseren?",
            "OV / parkeren / halen & brengen: hoe makkelijk is het?",
            "Looproutes: veilig en prettig (stoep, oversteek, bankjes)?",
            "Rust vs prikkels: voelt het hier prettig?",
            "Is er groen of buitenruimte in de buurt?"
          ]}
        />
        <Section
          title="Welzijn & community"
          items={[
            "Is ontmoeting mogelijk (ruimte, activiteiten, buurt)?",
            "Voelt de omgeving veilig en vertrouwd?",
            "Is er een beheerder/organisatie die ‘omkijken’ stimuleert?",
            "Zijn er gezamenlijke ruimtes of laagdrempelig contact?",
            "Past de sfeer bij de bewoner (rust / levendigheid)?"
          ]}
        />
        <Section
          title="Later organiseren (optioneel)"
          items={[
            "Is hulp te organiseren (schoonmaak, maaltijden, klusjes)?",
            "Is ondersteuning mogelijk (daginvulling, begeleiding)?",
            "Als zorg later nodig is: zijn er opties in de buurt?",
            "Kun je hier blijven wonen als mobiliteit afneemt?",
            "Is er een netwerk (naaste/community) om mee te regelen?"
          ]}
        />
      </div>

      <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16, marginTop: 18, background: "#fafafa" }}>
        <strong>Tip</strong>
        <p style={{ marginTop: 8, color: "#444", lineHeight: 1.6 }}>
          Spreek af: “We kijken eerst of het hier nú prettig woont. Daarna pas hoe we later dingen kunnen organiseren.”
          Dat haalt druk van het gesprek.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          <a
            href="/vitacheck"
            style={{ padding: "10px 14px", borderRadius: 10, background: "#111", color: "#fff", textDecoration: "none" }}
          >
            Doe de VitaCheck
          </a>
          <a
            href="/woningen/kaart"
            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #111", color: "#111", textDecoration: "none" }}
          >
            Bekijk aanbod op kaart
          </a>
        </div>
      </div>

      <p style={{ marginTop: 24 }}>
        <a href="/voor-naasten" style={{ textDecoration: "underline", color: "#111" }}>
          ← Terug naar Voor naasten
        </a>
      </p>
    </main>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16 }}>
      <strong>{title}</strong>
      <ul style={{ marginTop: 10, lineHeight: 1.8 }}>
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}
