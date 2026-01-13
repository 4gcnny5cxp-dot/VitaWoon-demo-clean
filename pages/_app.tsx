import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className="topbar">
        <div className="topbarInner">
          <a className="brand" href="/">
            VitaWoon <span className="pill">wonen centraal</span>
          </a>

          <nav className="nav">
            <a href="/woningen">Woningen</a>
            <a href="/woningen/kaart">Kaart</a>
            <a href="/vitacheck">VitaCheck</a>
            <a href="/voor-naasten">Voor naasten</a>
            <a href="/voor-aanbieders">Voor aanbieders</a>
            <a href="/vitadomus">VitaDomus</a>            
          </nav>
        </div>
      </header>

      <Component {...pageProps} />

      <footer className="footer">
        <div className="footerInner">
          <div>Demo • VitaWoon / VitaDomus</div>
          <div>Hulp, ondersteuning en zorg optioneel</div>
        </div>
      </footer>
    </>
  );
}
