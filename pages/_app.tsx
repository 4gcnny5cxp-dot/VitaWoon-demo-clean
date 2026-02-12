import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #eee",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <a
            href="/"
            style={{
              fontWeight: 900,
              letterSpacing: 0.2,
              textDecoration: "none",
              color: "#111",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 10,
                border: "1px solid #111",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 900,
              }}
            >
              V
            </span>
            VitaWoon
          </a>

          <nav
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <NavLink href="/woningen" label="Woningen" />
            <NavLink href="/vitacheck" label="VitaCheck" />
            <NavLink href="/dolce-vita" label="Dolce Vita" />
            <NavLink href="/voor-naasten" label="Voor naasten" />
            <span style={{ width: 1, height: 22, background: "#e6e6e6", margin: "0 2px" }} />
            <NavLink href="/voor-aanbieders" label="Voor aanbieders" />
            <NavLink href="/vita-advies" label="Vita Advies" />
          </nav>
        </div>
      </header>

      <Component {...pageProps} />
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      style={{
        textDecoration: "none",
        color: "#111",
        fontWeight: 700,
        padding: "8px 12px",
        borderRadius: 999,
        border: "1px solid #e8e8e8",
        background: "#fff",
      }}
    >
      {label}
    </a>
  );
}
