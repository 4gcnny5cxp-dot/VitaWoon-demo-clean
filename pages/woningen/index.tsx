type NeedLevel = "geen" | "licht" | "regelmatig" | "intensief";
type Domain =
  | "WEL_SOCIAAL"
  | "WEL_ACTIEF"
  | "WEL_VEILIGHEID"
  | "HULP_HUISHOUDEN"
  | "HULP_MAALTIJDEN"
  | "HULP_VERVOER"
  | "ONDER_STRUCTUUR"
  | "ONDER_BEGELEIDING"
  | "ONDER_REABLEMENT"
  | "ZORG_PV"
  | "ZORG_VERPLEGING"
  | "ZORG_24_7_NABIJ";

type Listing = {
  id: string;
  title: string;
  place: string;
  label: "Huur" | "Koop" | "Nieuwbouw" | "Concept";
  price: string;
  capabilities: Partial<Record<Domain, NeedLevel>>;
};

const LEVEL_SCORE: Record<NeedLevel, number> = {
  geen: 0,
  licht: 1,
  regelmatig: 2,
  intensief: 3,
};

const LISTINGS: Listing[] = [
  {
    id: "vw-1",
    title: "Licht appartement met lift",
    place: "Amsterdam",
    label: "Huur",
    price: "€ 1.450 p/m",
    capabilities: {
      WEL_SOCIAAL: "licht",
      WEL_VEILIGHEID: "licht",
      HULP_HUISHOUDEN: "regelmatig",
      HULP_MAALTIJDEN: "licht",
      ONDER_STRUCTUUR: "licht",
      ZORG_PV: "licht",
    },
  },
  {
    id: "vw-2",
    title: "Gelijkvloers wonen nabij winkels",
    place: "Utrecht",
    label: "Koop",
    price: "€ 425.000 k.k.",
    capabilities: {
      WEL_VEILIGHEID: "licht",
      HULP_HUISHOUDEN: "licht",
      HULP_VERVOER: "licht",
      ONDER_REABLEMENT: "licht",
      ZORG_PV: "licht",
    },
  },
  {
    id: "vw-3",
    title: "Serviceflat met ontmoetingsruimte",
    place: "Haarlem",
    label: "Nieuwbouw",
    price: "n.v.t. (demo)",
    capabilities: {
      WEL_SOCIAAL: "intensief",
      WEL_ACTIEF: "regelmatig",
      WEL_VEILIGHEID: "regelmatig",
      HULP_MAALTIJDEN: "regelmatig",
      HULP_HUISHOUDEN: "regelmatig",
      ONDER_BEGELEIDING: "licht",
      ONDER_STRUCTUUR: "licht",
      ZORG_PV: "regelmatig",
      ZORG_VERPLEGING: "licht",
    },
  },
  {
    id: "vw-4",
    title: "Seniorenappartement met binnentuin",
    place: "Amstelveen",
    label: "Huur",
    price: "€ 1.650 p/m",
    capabilities: {
      WEL_SOCIAAL: "regelmatig",
      WEL_VEILIGHEID: "regelmatig",
      HULP_HUISHOUDEN: "regelmatig",
      ONDER_REABLEMENT: "licht",
      ZORG_PV: "licht",
    },
  },
  {
    id: "vw-5",
    title: "Geclusterd wonen (concept)",
    place: "Uithoorn",
    label: "Concept",
    price: "n.v.t. (concept)",
    capabilities: {
      WEL_SOCIAAL: "intensief",
      WEL_ACTIEF: "regelmatig",
      WEL_VEILIGHEID: "licht",
      HULP_MAALTIJDEN: "licht",
      ONDER_STRUCTUUR: "regelmatig",
      ONDER_BEGELEIDING: "licht",
      ZORG_PV: "licht",
    },
  },
];

function bestScore(listing: Listing, keys: Domain[]) {
  return Math.max(...keys.map((k) => LEVEL_SCORE[listing.capabilities[k] || "geen"]));
}

function dots(n: number) {
  // 0..3 → ○○○ / ●○○ / ●●○ / ●●●
  const filled = "●".repeat(n);
  const empty = "○".repeat(3 - n);
  return filled + empty;
}

function labelFor(n: number) {
  if (n <= 0) return "beperkt";
  if (n === 1) return "basis";
  if (n === 2) return "goed";
  return "sterk";
}

export default function Woningen() {
  return (
    <main>
      <div className="container">
        <h1>Woningen</h1>
        <p className="muted" style={{ maxWidth: 860 }}>
          Eén overzicht met huur, koop, nieuwbouw en concepten. De badges geven in één oogopslag aan
          hoe een woonvorm aansluit op welzijn, hulp, ondersteuning en zorg (richtingwijzer).
        </p>

        <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
          {LISTINGS.map((x) => {
            const w = bestScore(x, ["WEL_SOCIAAL", "WEL_ACTIEF", "WEL_VEILIGHEID"]);
            const h = bestScore(x, ["HULP_HUISHOUDEN", "HULP_MAALTIJDEN", "HULP_VERVOER"]);
            const o = bestScore(x, ["ONDER_STRUCTUUR", "ONDER_BEGELEIDING", "ONDER_REABLEMENT"]);
            const z = bestScore(x, ["ZORG_PV", "ZORG_VERPLEGING", "ZORG_24_7_NABIJ"]);

            return (
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
                    <div style={{ fontWeight: 800, marginTop: 4 }}>{x.title}</div>
                    <div style={{ marginTop: 6, color: "#444" }}>{x.price}</div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, color: "#666" }}>In één oogopslag</div>

                    <div style={{ display: "grid", gap: 6, marginTop: 8, justifyItems: "end" }}>
                      <MiniBadge title="Welzijn" score={w} />
                      <MiniBadge title="Hulp" score={h} />
                      <MiniBadge title="Onderst." score={o} />
                      <MiniBadge title="Zorg" score={z} />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="btnRow" style={{ marginTop: 20 }}>
          <a className="btn btnPrimary" href="/vitacheck">Start VitaCheck</a>
          <a className="btn btnGhost" href="/woningen/kaart">Bekijk op kaart</a>
        </div>

        <div className="card" style={{ marginTop: 18, background: "#fafafa" }}>
          <strong>Legenda</strong>
          <p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
            ●●● = sterk • ●●○ = goed • ●○○ = basis • ○○○ = beperkt.  
            Dit is een richtingwijzer; de exacte invulling hangt af van locatie, partners en afspraken.
          </p>
        </div>
      </div>
    </main>
  );
}

function MiniBadge({ title, score }: { title: string; score: number }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <span style={{ fontSize: 12, color: "#666", minWidth: 70, textAlign: "right" }}>{title}</span>
      <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }}>
        {dots(score)}
      </span>
      <span className="pill">{labelFor(score)}</span>
    </div>
  );
}
