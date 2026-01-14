import { useMemo, useState } from "react";

/* =======================
   Types & data
======================= */

type NeedLevel = "geen" | "licht" | "regelmatig" | "intensief";

type Domain =
  | "WELZIJN"
  | "HULP"
  | "ONDERSTEUNING"
  | "ZORG";

type Listing = {
  id: string;
  title: string;
  place: string;
  label: "Huur" | "Koop" | "Nieuwbouw" | "Concept";
  price: string;
  capabilities: Record<Domain, NeedLevel>;
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
    title: "Seniorenappartement met lift",
    place: "Amsterdam",
    label: "Huur",
    price: "€ 1.450 p/m",
    capabilities: {
      WELZIJN: "regelmatig",
      HULP: "regelmatig",
      ONDERSTEUNING: "licht",
      ZORG: "licht",
    },
  },
  {
    id: "vw-2",
    title: "Gelijkvloers wonen nabij winkels",
    place: "Utrecht",
    label: "Koop",
    price: "€ 425.000 k.k.",
    capabilities: {
      WELZIJN: "licht",
      HULP: "licht",
      ONDERSTEUNING: "licht",
      ZORG: "geen",
    },
  },
  {
    id: "vw-3",
    title: "Serviceflat met ontmoetingsruimte",
    place: "Haarlem",
    label: "Nieuwbouw",
    price: "n.v.t.",
    capabilities: {
      WELZIJN: "intensief",
      HULP: "regelmatig",
      ONDERSTEUNING: "regelmatig",
      ZORG: "regelmatig",
    },
  },
];

/* =======================
   Helpers
======================= */

function levelLabel(l: NeedLevel) {
  switch (l) {
    case "geen":
      return "Niet nodig";
    case "licht":
      return "Licht";
    case "regelmatig":
      return "Regelmatig";
    case "intensief":
      return "Intensief";
  }
}

function scoreListing(
  listing: Listing,
  needs: Partial<Record<Domain, NeedLevel>>
) {
  let score = 0;

  (Object.keys(needs) as Domain[]).forEach((k) => {
    const need = needs[k] || "geen";
    const cap = listing.capabilities[k] || "geen";

    if (LEVEL_SCORE[cap] >= LEVEL_SCORE[need]) {
      score += 2;
    }
  });

  return score;
}

/* =======================
   Component
======================= */

export default function VitaCheck() {
  const [current, setCurrent] = useState<
    "zelfstandig" | "hulp" | "ondersteuning" | "zorg" | "naaste"
  >("zelfstandig");

  const [now, setNow] = useState<Partial<Record<Domain, NeedLevel>>>({});
  const [later, setLater] = useState<Partial<Record<Domain, NeedLevel>>>({});
  const [submitted, setSubmitted] = useState(false);

  function setLevel(
    target: "now" | "later",
    key: Domain,
    level: NeedLevel
  ) {
    const setter = target === "now" ? setNow : setLater;
    const state = target === "now" ? now : later;

    const next = { ...state };
    if (level === "geen") delete next[key];
    else next[key] = level;

    setter(next);
  }

  const combinedNeeds = useMemo(() => {
    const out: Partial<Record<Domain, NeedLevel>> = {};
    (["WELZIJN", "HULP", "ONDERSTEUNING", "ZORG"] as Domain[]).forEach(
      (k) => {
        const n = now[k] || "geen";
        const l = later[k] || "geen";
        out[k] =
          LEVEL_SCORE[l] > LEVEL_SCORE[n] ? l : n;
      }
    );
    return out;
  }, [now, later]);

  const results = useMemo(() => {
    if (!submitted) return [];
    return LISTINGS.map((l) => ({
      listing: l,
      score: scoreListing(l, combinedNeeds),
    })).sort((a, b) => b.score - a.score);
  }, [submitted, combinedNeeds]);

  return (
    <main>
      <div className="container">
        <h1>VitaCheck</h1>
        <p className="muted">
          Geef aan wat u <strong>nu</strong> heeft en wat u{" "}
          <strong>later</strong> wilt kunnen organiseren.
        </p>

        <div className="card">
          <label>Huidige situatie</label>
          <select
            value={current}
            onChange={(e) =>
              setCurrent(e.target.value as any)
            }
          >
            <option value="zelfstandig">
              Ik woon zelfstandig
            </option>
            <option value="hulp">
              Ik ontvang hulp
            </option>
            <option value="ondersteuning">
              Ik ontvang ondersteuning
            </option>
            <option value="zorg">
              Ik ontvang zorg / indicatie
            </option>
            <option value="naaste">
              Ik ben een naaste
            </option>
          </select>

          <h3>Wat heeft u nu?</h3>
          {(["WELZIJN", "HULP", "ONDERSTEUNING", "ZORG"] as Domain[]).map(
            (d) => (
              <DomainRow
                key={d}
                domain={d}
                value={now[d] || "geen"}
                onChange={(v) =>
                  setLevel("now", d, v)
                }
              />
            )
          )}

          <h3>Wat wilt u later kunnen organiseren?</h3>
          {(["WELZIJN", "HULP", "ONDERSTEUNING", "ZORG"] as Domain[]).map(
            (d) => (
              <DomainRow
                key={d}
                domain={d}
                value={later[d] || "geen"}
                onChange={(v) =>
                  setLevel("later", d, v)
                }
              />
            )
          )}

          <button
            className="btn btnPrimary"
            onClick={() => setSubmitted(true)}
          >
            Toon passend aanbod
          </button>
        </div>

        {submitted && (
          <div style={{ marginTop: 24 }}>
            <h2>Resultaat</h2>
            {results.map(({ listing, score }) => (
              <div key={listing.id} className="card">
                <strong>{listing.title}</strong>
                <div className="muted">
                  {listing.place} • {listing.label}
                </div>
                <div>{listing.price}</div>
                <div>
                  Matchscore: <strong>{score}</strong>
                </div>
                <a href={`/woningen/${listing.id}`}>
                  Bekijk woning →
                </a>
              </div>
            ))}
          </div>
        )}

        <p style={{ marginTop: 24 }}>
          <a href="/">← Terug</a>
        </p>
      </div>
    </main>
  );
}

/* =======================
   Subcomponent
======================= */

function DomainRow(props: {
  domain: Domain;
  value: NeedLevel;
  onChange: (v: NeedLevel) => void;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <strong>{props.domain}</strong>
      <div style={{ display: "flex", gap: 8 }}>
        {(["geen", "licht", "regelmatig", "intensief"] as NeedLevel[]).map(
          (l) => (
            <button
              key={l}
              onClick={() => props.onChange(l)}
              style={{
                padding: "6px 10px",
                borderRadius: 20,
                border: "1px solid #ccc",
                background:
                  props.value === l ? "#111" : "#fff",
                color:
                  props.value === l ? "#fff" : "#111",
                cursor: "pointer",
              }}
            >
              {levelLabel(l)}
            </button>
          )
        )}
      </div>
    </div>
  );
}
