type Listing = {
  id: string;
  title: string;
  place: string;
  label: "Huur" | "Koop" | "Nieuwbouw" | "Concept";
  price: string;
  tags: string[];
};

const LISTINGS: Listing[] = [
  { id: "vw-1", title: "Licht appartement met lift", place: "Amsterdam", label: "Huur", price: "€ 1.450 p/m", tags: ["lift", "community", "welzijn"] },
  { id: "vw-2", title: "Gelijkvloers wonen nabij winkels", place: "Utrecht", label: "Koop", price: "€ 425.000 k.k.", tags: ["gelijkvloers", "rust", "welzijn"] },
  { id: "vw-3", title: "Serviceflat met ontmoetingsruimte", place: "Haarlem", label: "Nieuwbouw", price: "n.v.t. (demo)", tags: ["community", "ontmoeting"] },
  { id: "vw-4", title: "Seniorenappartement met binnentuin", place: "Amstelveen", label: "Huur", price: "€ 1.650 p/m", tags: ["lift", "groen", "welzijn"] },
  { id: "vw-5", title: "Geclusterd wonen (concept)", place: "Uithoorn", label: "Concept", price: "n.v.t. (concept)", tags: ["community", "omkijken"] }
];

export default function Woningen() {
  return (
    <main style={{ padding: 40, maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0 }}>Woningen</h1>
          <p style={{ marginTop: 8, color: "#444" }}>
            Eén overzicht met huur, koop, nieuwbouw en concepten – demo.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="/woningen/kaart" style={{ padding: "10px 14px", borderRadius: 10, background: "#111", color: "#fff", textDecoration: "none" }}>
            Kaart
          </a>
          <a href="/vitacheck" style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #111", color: "#111", textDecoration: "none" }}>
            VitaCheck
          </a>
        </div>
      </div>

      <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
        {LISTINGS.map((x) => (
          <a
            key={x.id}
            href={`/woningen/${encodeURIComponent(x.id)}`}
            style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16, textDecoration: "none", color: "inherit" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 13, color: "#666" }}>{x.place} • {x.label}</div>
                <div style={{ fontWeight: 700, marginTop: 4 }}>{x.title}</div>
                <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {x.tags.map((t) => (
                    <span key={t} style={{ fontSize: 12, color: "#444", border: "1px solid #eee", padding: "4px 8px", borderRadius: 999 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "#666" }}>Prijs</div>
                <div style={{ fontWeight: 700 }}>{x.price}</div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <p style={{ marginTop: 24 }}>
        <a href="/" style={{ textDecoration: "underline", color: "#111" }}>← Terug</a>
      </p>
    </main>
  );
}
