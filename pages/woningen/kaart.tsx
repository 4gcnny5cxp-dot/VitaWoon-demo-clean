import { useRouter } from "next/router";

type Listing = {
  id: string;
  title: string;
  place: string;
  label: "Huur" | "Koop" | "Nieuwbouw" | "Concept";
  price: string;
  lat: number;
  lon: number;
};

const LISTINGS: Listing[] = [
  { id: "vw-1", title: "Licht appartement met lift", place: "Amsterdam", label: "Huur", price: "€ 1.450 p/m", lat: 52.3676, lon: 4.9041 },
  { id: "vw-2", title: "Gelijkvloers wonen nabij winkels", place: "Utrecht", label: "Koop", price: "€ 425.000 k.k.", lat: 52.0907, lon: 5.1214 },
  { id: "vw-3", title: "Serviceflat met ontmoetingsruimte", place: "Haarlem", label: "Nieuwbouw", price: "n.v.t. (demo)", lat: 52.3874, lon: 4.6462 },
  { id: "vw-4", title: "Seniorenappartement met binnentuin", place: "Amstelveen", label: "Huur", price: "€ 1.650 p/m", lat: 52.3080, lon: 4.8746 },
  { id: "vw-5", title: "Geclusterd wonen (concept)", place: "Uithoorn", label: "Concept", price: "n.v.t. (concept)", lat: 52.2370, lon: 4.8256 }
];

export default function Kaart() {
  const router = useRouter();
  const focus = String(router.query.focus || "");

  const selected = LISTINGS.find((x) => x.id === focus) || LISTINGS[0];

  return (
    <main style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap"
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Kaart</h1>
          <p style={{ marginTop: 8, color: "#444" }}>
            Klik links een woning → de kaart focust op die locatie.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href="/woningen"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: "#111",
              color: "#fff",
              textDecoration: "none"
            }}
          >
            Terug naar overzicht
          </a>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 16,
          marginTop: 20
        }}
      >
        {/* LIJST */}
        <div
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: 16,
            padding: 12
          }}
        >
          {LISTINGS.map((x) => {
            const active = x.id === selected.id;
            return (
              <a
                key={x.id}
                href={`/woningen/kaart?focus=${encodeURIComponent(x.id)}`}
                style={{
                  display: "block",
                  padding: 10,
                  borderRadius: 12,
                  textDecoration: "none",
                  color: "#111",
                  background: active ? "#f5f5f5" : "transparent",
                  border: active ? "1px solid #e6e6e6" : "1px solid transparent"
                }}
              >
                <div style={{ fontSize: 12, color: "#666" }}>
                  {x.place} • {x.label}
                </div>
                <div style={{ fontWeight: 700 }}>{x.title}</div>
                <div style={{ marginTop: 4, fontSize: 12, color: "#444" }}>
                  {x.price}
                </div>
              </a>
            );
          })}
        </div>

        {/* KAART */}
        <div
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: 16,
            overflow: "hidden",
            minHeight: 560
          }}
        >
          <iframe
            title="Google Maps"
            src={`https://www.google.com/maps?q=${selected.lat},${selected.lon}&z=13&output=embed`}
            style={{ width: "100%", height: "560px", border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div style={{ padding: 12, borderTop: "1px solid #e6e6e6", background: "#fafafa" }}>
            <div style={{ fontSize: 12, color: "#666" }}>Geselecteerd</div>
            <div style={{ fontWeight: 700 }}>{selected.title}</div>
            <div style={{ marginTop: 4, fontSize: 13, color: "#444" }}>{selected.place} • {selected.label} • {selected.price}</div>
            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href={`/woningen/${encodeURIComponent(selected.id)}`}
                style={{ textDecoration: "underline", color: "#111" }}
              >
                Bekijk detail →
              </a>
              <a
                href="/vitacheck"
                style={{ textDecoration: "underline", color: "#111" }}
              >
                VitaCheck →
              </a>
            </div>
          </div>
        </div>
      </div>

      <p style={{ marginTop: 24 }}>
        <a href="/" style={{ textDecoration: "underline", color: "#111" }}>← Terug</a>
      </p>
    </main>
  );
}
