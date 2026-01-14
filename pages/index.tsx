export default function Home() {
  return (
    <main>
      <div className="container">
        <div className="card" style={{ padding: 22 }}>
          <div style={{ fontSize: 13, color: "#666" }}>VitaWoon • wonen centraal</div>

          <h1 style={{ marginTop: 10, marginBottom: 8 }}>
            Ontdek woningen waar u nu prettig woont —{" "}
            <span style={{ whiteSpace: "nowrap" }}>met hulp</span>,{" "}
            <span style={{ whiteSpace: "nowrap" }}>ondersteuning</span> en{" "}
            <span style={{ whiteSpace: "nowrap" }}>zorg</span> binnen bereik wanneer dat later nodig is.
          </h1>

          <p className="muted" style={{ maxWidth: 900, lineHeight: 1.7 }}>
            VitaWoon helpt ouderen en hun naasten om rustig vooruit te kijken.  
            U begint bij wat telt: comfortabel wonen, een fijne omgeving en welzijn.  
            En als er later iets verandert, helpt VitaWoon om hulp, ondersteuning of zorg te organiseren — zonder dat het nu al “over zorg” hoeft te gaan.
          </p>

          <div className="btnRow" style={{ marginTop: 14 }}>
            <a className="btn btnPrimary" href="/woningen">Bekijk woningen</a>
            <a className="btn btnGhost" href="/vitacheck">Doe de VitaCheck</a>
            <a className="btn btnGhost" href="/voor-naasten">Voor naasten</a>
          </div>

          <div style={{ marginTop: 16, display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr" }}>
            <Feature title="Wonen & welzijn eerst" text="Start bij prettig wonen en kwaliteit van leven." />
            <Feature title="Zekerheid voor later" text="Hulp, ondersteuning en zorg zijn te organiseren wanneer nodig." />
            <Feature title="Samen beslissen" text="Naasten zoeken makkelijk mee met duidelijke handvatten." />
          </div>
        </div>

        <div style={{ marginTop: 18, display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
          <div className="card">
            <strong>Nieuw: VitaCheck</strong>
            <p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
              Geef aan wat u nu heeft en wat u later wilt kunnen organiseren.  
              U ziet direct het aanbod dat daarbij past (demo).
            </p>
            <a href="/vitacheck" style={{ textDecoration: "underline" }}>Start VitaCheck →</a>
          </div>

          <div className="card">
            <strong>Voor aanbieders</strong>
            <p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
              Positioneer huur, koop, nieuwbouw en woonconcepten vroeg bij een relevante doelgroep.
            </p>
            <a href="/voor-aanbieders" style={{ textDecoration: "underline" }}>Bekijk mogelijkheden →</a>
          </div>
        </div>
      </div>
    </main>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div style={{ border: "1px solid #e7e7e7", borderRadius: 16, padding: 14, background: "#fff" }}>
      <strong>{title}</strong>
      <p className="muted" style={{ marginTop: 6, lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}
