type Listing = {
  id: string;
  title: string;
  place: string;
  label: "Huur" | "Koop" | "Nieuwbouw" | "Concept";
  price: string;
};

const LISTINGS: Listing[] = [
  { id: "vw-1", title: "Licht appartement met lift", place: "Amsterdam", label: "Huur", price: "€ 1.450 p/m" },
  { id: "vw-2", title: "Gelijkvloers wonen nabij winkels", place: "Utrecht", label: "Koop", price: "€ 425.000 k.k." },
  { id: "vw-3", title: "Serviceflat met ontmoetingsruimte", place: "Haarlem", label: "Nieuwbouw", price: "n.v.t. (demo)" },
  { id: "vw-4", title: "Seniorenappartement met binnentuin", place: "Amstelveen", label: "Huur", price: "€ 1.650 p/m" },
  { id: "vw-5", title: "Geclusterd wonen (concept)", place: "Uithoorn", label: "Concept", price: "n.v.t. (concept)" }
];

export default function Woningen() {
  return (
    <main>
      <div className="container">
        <h1>Woningen</h1>
        <p className="muted">
          Eén overzicht met huur, koop, nieuwbouw en concepten (demo).
        </p>

        <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
          {LISTINGS.map((x) => (
            <a
              key={x.id}
              href={`/woningen/${encodeURIComponent(x.id)}`}
              className="card"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 13, color: "#666" }}>
                    {x.place} • {x.label}
                  </div>
                  <div style={{ fontWeight: 700, marginTop: 4 }}>
                    {x.title}
                  </div>
                </div>
                <div style={{ textAlign: "right", fontWeight: 700 }}>
                  {x.price}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="btnRow" style={{ marginTop: 20 }}>
          <a className="btn btnPrimary" href="/woningen/kaart">Bekijk op kaart</a>
          <a className="btn btnGhost" href="/vitacheck">VitaCheck</a>
        </div>
      </div>
    </main>
  );
}
