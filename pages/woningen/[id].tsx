import { useRouter } from "next/router";

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
  intensief: 3
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
      ZORG_PV: "licht"
    }
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
      ZORG_PV: "licht"
    }
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
      ZORG_VERPLEGING: "licht"
    }
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
      ZORG_PV: "licht"
    }
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
      ZORG_PV: "licht"
    }
  }
];

<VidaOnDetail />

function groupScore(listing: Listing, keys: Domain[]) {
  const best = Math.max(...keys.map((k) => LEVEL_SCORE[listing.capabilities[k] || "geen"]));
  return best; // 0..3
}

function dots(n: number) {
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

export default function WoningDetail() {
  const router = useRouter();
  const id = String(router.query.id || "");

  const listing = LISTINGS.find((x) => x.id === id);

  // fallback
  if (!listing) {
    return (
      <main>
        <div className="container">
          <h1>Woning niet gevonden (demo)</h1>
          <p className="muted">Controleer de URL of ga terug naar woningen.</p>
          <p style={{ marginTop: 20 }}>
            <a className="btn btnPrimary" href="/woningen">Terug naar woningen</a>
          </p>
        </div>
      </main>
    );
  }

  const wellbeing = groupScore(listing, ["WEL_SOCIAAL", "WEL_ACTIEF", "WEL_VEILIGHEID"]);
  const help = groupScore(listing, ["HULP_HUISHOUDEN", "HULP_MAALTIJDEN", "HULP_VERVOER"]);
  const support = groupScore(listing, ["ONDER_STRUCTUUR", "ONDER_BEGELEIDING", "ONDER_REABLEMENT"]);
  const care = groupScore(listing, ["ZORG_PV", "ZORG_VERPLEGING", "ZORG_24_7_NABIJ"]);

  return (
    <main>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "baseline" }}>
          <div>
            <div style={{ fontSize: 13, color: "#666" }}>{listing.place} • {listing.label}</div>
            <h1 style={{ marginTop: 6 }}>{listing.title}</h1>
            <div style={{ fontWeight: 800, marginTop: 6 }}>{listing.price}</div>
          </div>

          <div className="btnRow" style={{ marginTop: 6 }}>
            <a className="btn btnGhost" href={`/woningen/kaart?focus=${encodeURIComponent(listing.id)}`}>Toon op kaart</a>
            <a className="btn btnPrimary" href="/vitacheck">Doe VitaCheck</a>
          </div>
        </div>

        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr", marginTop: 16 }}>
          <div className="card">
            <strong>Past dit bij uw situatie?</strong>
            <p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
              Hieronder ziet u in één oogopslag waar deze woonvorm sterk in is. Hulp, ondersteuning en zorg zijn
              indicatief en “te organiseren” verschilt per locatie/partner (demo).
            </p>

            <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
              <BadgeRow title="Welzijn & community" score={wellbeing} />
              <BadgeRow title="Hulp" score={help} />
              <BadgeRow title="Ondersteuning" score={support} />
              <BadgeRow title="Zorg" score={care} />
            </div>

            <div className="card" style={{ marginTop: 12, background: "#fafafa" }}>
              <strong>Toelichting (kort)</strong>
              <ul style={{ lineHeight: 1.8, marginTop: 8 }}>
                <li><strong>Welzijn & community</strong>: ontmoeting, activiteiten, omkijken, veiligheid.</li>
                <li><strong>Hulp</strong>: praktische hulp (huishouden, maaltijden, vervoer).</li>
                <li><strong>Ondersteuning</strong>: begeleiding, structuur, reablement/fit blijven.</li>
                <li><strong>Zorg</strong>: persoonlijke verzorging/verpleging (nu of later), eventueel met indicatie.</li>
              </ul>
              <div style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
                NB: dit is een richtingwijzer, geen indicatie-advies.
              </div>
            </div>
          </div>

          <div className="card">
            <strong>Wat u hier straks kunt tonen</strong>
            <ul style={{ lineHeight: 1.8, marginTop: 10 }}>
              <li>Foto’s / plattegrond</li>
              <li>Kenmerken (lift, gelijkvloers, winkels dichtbij)</li>
              <li>Welzijn/community (ontmoeting, activiteiten)</li>
              <li>“Later te organiseren”: hulp / ondersteuning / zorg</li>
            </ul>

            <div className="btnRow" style={{ marginTop: 12 }}>
              <a className="btn btnGhost" href="/woningen">← Terug naar woningen</a>
              <a className="btn btnGhost" href="/voor-naasten">Voor naasten</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function BadgeRow({ title, score }: { title: string; score: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
      <div style={{ fontWeight: 800 }}>{title}</div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }}>{dots(score)}</span>
        <span className="pill">{labelFor(score)}</span>
      </div>
    </div>
  );
}

function VidaOnDetail() {
  return (
    <div className="card" style={{ marginTop: 14, background: "#fafafa" }}>
      <strong>Vragen over deze woning?</strong>
      <p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
        Vida denkt graag met u mee — ook als u nog twijfelt of dit de juiste stap is.
      </p>

      <div className="btnRow" style={{ marginTop: 10 }}>
        <a className="btn btnGhost" href="/vida">
          💬 Stel een snelle vraag
        </a>
        <a className="btn btnGhost" href="/vida#meekijken">
          📩 Laat Vida met u meekijken
        </a>
        <a className="btn btnPrimary" href="/vida#bellen">
          📞 Plan een belmoment
        </a>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
        VitaWoon werkt samen met aanbieders om dit aanbod zichtbaar te maken. Het Vida-team denkt onafhankelijk met u mee.
      </div>
    </div>
  );
}
