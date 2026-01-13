import { useRouter } from "next/router";

export default function WoningDetail() {
  const router = useRouter();
  const id = String(router.query.id || "");

  return (
    <main style={{ padding: 40, maxWidth: 980, margin: "0 auto" }}>
      <h1>Woning detail (demo)</h1>
      <p style={{ color: "#444" }}>ID: <strong>{id}</strong></p>

      <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16, marginTop: 14 }}>
        <strong>Wat je hier straks kunt tonen</strong>
        <ul style={{ lineHeight: 1.8, marginTop: 10 }}>
          <li>Foto’s / plattegrond</li>
          <li>Kenmerken (lift, gelijkvloers, winkels dichtbij)</li>
          <li>Welzijn/community</li>
          <li>“Later te organiseren”: hulp / ondersteuning / zorg</li>
        </ul>
      </div>

      <p style={{ marginTop: 24 }}>
        <a href="/woningen" style={{ textDecoration: "underline", color: "#111" }}>← Terug naar woningen</a>
      </p>
    </main>
  );
}
