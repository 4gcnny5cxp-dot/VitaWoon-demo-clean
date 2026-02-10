export default function Page() {
  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>VitaWoon</h1>

      <h2>
        Ontdek woningen waar u nu prettig woont —<br />
        met voorzieningen, hulp en ondersteuning binnen bereik,
        en zorg beschikbaar wanneer dat later nodig is.
      </h2>

      <p>Demo-omgeving om look &amp; feel en functies te testen met collega’s.</p>

      <ul>
        <li><a href="/woningen">Woningen</a></li>
        <li><a href="/vitacheck">VitaCheck</a></li>
        <li><a href="/dolce-vita">Dolce Vita</a></li>
        <li><a href="/voor-aanbieders">Voor aanbieders</a></li>
        <li><a href="/vita-advies">Vita Advies</a></li>
      </ul>
    </main>
  );
}
