import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header
        style={{
          borderBottom: "1px solid #eee",
          padding: "14px 20px",
          position: "sticky",
          top: 0,
          background: "#fff",
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <a href="/" style={{ fontWeight: 900, textDecoration: "none", color: "#111" }}>
            VitaWoon
          </a>

          <nav style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="/woningen">Woningen</a>
            <a href="/vitacheck">VitaCheck</a>
            <a href="/dolce-vita">Dolce Vita</a>
            <a href="/voor-aanbieders">Voor aanbieders</a>
            <a href="/vita-advies">Vita Advies</a>
          </nav>
        </div>
      </header>

      <Component {...pageProps} />
    </>
  );
}
