import { useMemo, useState } from "react";

/**
 * Taxonomie: 4 domeinen
 * - welzijn/community (WEL)
 * - hulp (HULP) = praktisch
 * - ondersteuning (ONDER) = begeleiding/structuur/reablement
 * - zorg (ZORG) = (wijk)verpleging/persoonlijke verzorging/indicatie
 */

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
  lat: number;
  lon: number;
  // capabilities = wat deze woonvorm goed kan faciliteren/organiseren
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
    lat: 52.3676,
    lon: 4.9041,
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
    lat: 52.0907,
    lon: 5.1214,
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
    lat: 52.3874,
    lon: 4.6462,
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
    lat: 52.308,
    lon: 4.8746,
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
    lat: 52.237,
    lon: 4.8256,
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

const DOMAIN_GROUPS: Array<{
  title: string;
  subtitle: string;
  items: Array<{ key: Domain; label: string; help: string }>;
}> = [
  {
    title: "Welzijn & community",
    subtitle: "Ontmoeting, omkijken, activiteiten, vitaliteit en veiligheid.",
    items: [
      { key: "WEL_SOCIAAL", label: "Ontmoeting & sociaal contact", help: "Contact, gezamenlijke ruimtes, omkijken." },
      { key: "WEL_ACTIEF", label: "Activiteiten & vitaliteit", help: "Bewegen, reablement/gym, daginvulling." },
      { key: "WEL_VEILIGHEID", label: "Veiligheid & vertrouwdheid", help: "Overzicht, sociaal veilig, alertheid in de omgeving." }
    ]
  },
  {
    title: "Hulp",
    subtitle: "Praktische hulp om het dagelijks leven makkelijker te maken.",
    items: [
      { key: "HULP_HUISHOUDEN", label: "Huishoudelijke hulp", help: "Schoonmaak, wassen, lichte taken." },
      { key: "HULP_MAALTIJDEN", label: "Maaltijden", help: "Maaltijdservice, samen eten, bezorging." },
      { key: "HULP_VERVOER", label: "Vervoer & mobiliteit", help: "Halen/brengen, OV-hulp, deelvervoer." }
    ]
  },
  {
    title: "Ondersteuning",
    subtitle: "Begeleiding, structuur, activering (zonder medische zorg als vertrekpunt).",
    items: [
      { key: "ONDER_STRUCTUUR", label: "Structuur & daginvulling", help: "Ritme, planning, ‘houvast’." },
      { key: "ONDER_BEGELEIDING", label: "Begeleiding", help: "Lichte begeleiding, prikkels/overzicht, mantelzorg-ontlasting." },
      { key: "ONDER_REABLEMENT", label: "Reablement / fit blijven", help: "Oefenen, sterker worden, langer zelfstandig." }
    ]
  },
  {
    title: "Zorg",
    subtitle: "Verzorging/verpleging (nu of later) – zo nodig met indicatie.",
    items: [
      { key: "ZORG_PV", label: "Persoonlijke verzorging", help: "Hulp bij wassen/aankleden (wijkverpleging e.d.)." },
      { key: "ZORG_VERPLEGING", label: "Verpleging", help: "Medische zorgmomenten, wondzorg, medicatie." },
      { key: "ZORG_24_7_NABIJ", label: "24/7 nabijheid", help: "Zorg dichtbij/aanwezigheid (zwaardere behoefte)." }
    ]
  }
];

function levelLabel(l: NeedLevel) {
  if (l === "geen") return "Niet nodig";
  if (l === "licht") return "Licht";
  if (l === "regelmatig") return "Regelmatig";
  return "Intensief";
}

function scoreListing(listing: Listing, wants: Partial<Record<Domain, NeedLevel>>) {
  // score = hoe goed capabilities >= behoefte (geen/licht/regelmatig/intensief)
  // extra penalty als behoefte hoger is dan capability.
  let score = 0;
  let penalties = 0;

  (Object.keys(wants) as Domain[]).forEach((k) => {
    const need = wants[k] || "geen";
    const cap = listing.capabilities[k] || "geen";

    const n = LEVEL_SCORE[need];
    const c = LEVEL_SCORE[cap];

    if (n === 0) return;

    if (c >= n) {
      score += 3; // match
      if (c > n) score += 1; // extra buffer
    } else {
      penalties += (n - c) * 2; // tekort
    }
  });

  return { score: Math.max(score - penalties, 0), penalties };
}

export default function VitaCheck() {
  // 1) waar staat iemand nu?
  const [current, setCurrent] = useState<"zelfstandig" | "lichteHulp" | "ondersteuning" | "zorg" | "naaste">("zelfstandig");

  // 2) regio + type
  const [area, setArea] = useState("");
  const [type, setType] = useState<"all" | "Huur" | "Koop" | "Nieuwbouw" | "Concept">("all");

  // 3) behoefte nu & later (handvatten)
  const [now, setNow] = useState<Partial<Record<Domain, NeedLevel>>>({});
  const [later, setLater] = useState<Partial<Record<Domain, NeedLevel>>>({});

  const [submitted, setSubmitted] = useState(false);

  // notify
  const [email, setEmail] = useState("");
  const [notifyDone, setNotifyDone] = useState(false);
  const [notifyError, setNotifyError] = useState<string | null>(null);

  // slimme defaults op basis van 'current'
  function applySuggestedDefaults() {
    const baseNow: Partial<Record<Domain, NeedLevel>> = {};
    const baseLater: Partial<Record<Domain, NeedLevel>> = {};

    // welzijn is vrijwel altijd relevant
    baseNow.WEL_SOCIAAL = "licht";
    baseNow.WEL_VEILIGHEID = "licht";

    if (current === "zelfstandig" || current === "naaste") {
      baseLater.HULP_HUISHOUDEN = "licht";
      baseLater.ONDER_REABLEMENT = "licht";
    }
    if (current === "lichteHulp") {
      baseNow.HULP_HUISHOUDEN = "licht";
      baseLater.HULP_MAALTIJDEN = "licht";
      baseLater.ONDER_STRUCTUUR = "licht";
    }
    if (current === "ondersteuning") {
      baseNow.ONDER_STRUCTUUR = "regelmatig";
      baseNow.ONDER_BEGELEIDING = "licht";
      baseLater.HULP_HUISHOUDEN = "licht";
      baseLater.ZORG_PV = "licht";
    }
    if (current === "zorg") {
      baseNow.ZORG_PV = "regelmatig";
      baseNow.WEL_VEILIGHEID = "regelmatig";
      baseLater.ZORG_VERPLEGING = "licht";
      baseLater.ZORG_24_7_NABIJ = "licht";
    }

    setNow(baseNow);
    setLater(baseLater);
  }

  const wantsCombined = useMemo(() => {
    // combineer nu + later (later is “wens/verwachting”)
    // we nemen de hoogste behoefte per domein
    const out: Partial<Record<Domain, NeedLevel>> = {};
    const keys = new Set<Domain>([
      ...(Object.keys(now) as Domain[]),
      ...(Object.keys(later) as Domain[])
    ]);
    keys.forEach((k) => {
      const n = now[k] || "geen";
      const l = later[k] || "geen";
      out[k] = LEVEL_SCORE[l] > LEVEL_SCORE[n] ? l : n;
    });
    return out;
  }, [now, later]);

  const results = useMemo(() => {
    if (!submitted) return [];

    const a = area.trim().toLowerCase();
    const filtered = LISTINGS.filter((x) => {
      if (a && !x.place.toLowerCase().includes(a)) return false;
      if (type !== "all" && x.label !== type) return false;
      return true;
    });

    const scored = filtered
      .map((x) => ({ listing: x, ...scoreListing(x, wantsCombined) }))
      .sort((p, q) => q.score - p.score);

    // minimale drempel: als je echt veel mismatch hebt, komt het onderaan
    return scored;
  }, [submitted, area, type, wantsCombined]);

  const top = results[0]?.listing;

  function focusUrl() {
    const first = top || LISTINGS[0];
    return `/woningen/kaart?focus=${encodeURIComponent(first.id)}`;
  }

  async function submitNotify() {
    setNotifyDone(false);
    setNotifyError(null);

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          current,
          area,
          type,
          now,
          later
        })
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Fout bij opslaan");
      }

      setNotifyDone(true);
    } catch (e: any) {
      setNotifyError(e?.message || "Er ging iets mis");
    }
  }

  function setLevel(target: "now" | "later", key: Domain, level: NeedLevel) {
    const setter = target === "now" ? setNow : setLater;
    const state = target === "now" ? now : later;

    const next = { ...state };
    if (level === "geen") delete next[key];
    else next[key] = level;

    setter(next);
  }

  function levelOf(target: "now" | "later", key: Domain): NeedLevel {
    const state = target === "now" ? now : later;
    return state[key] || "geen";
  }

  return (
    <main>
      <div className="container">
        <h1>VitaCheck</h1>
        <p className="muted" style={{ maxWidth: 860 }}>
          Geef aan wat u <strong>nu</strong> heeft en wat u <strong>later</strong> wilt kunnen organiseren.
          Wonen en welzijn blijven centraal. Hulp, ondersteuning en zorg zijn beschikbaar wanneer dat nodig is.
        </p>

        <div className="card" style={{ marginTop: 14 }}>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <div style={{ fontSize: 13, color: "#666" }}>Huidige situatie</div>
              <select
                value={current}
                onChange={(e) => setCurrent(e.target.value as any)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }}
              >
                <option value="zelfstandig">Ik woon zelfstandig (geen hulp)</option>
                <option value="lichteHulp">Ik heb al lichte hulp (praktisch)</option>
                <option value="ondersteuning">Ik heb ondersteuning / begeleiding</option>
                <option value="zorg">Ik heb zorg / indicatie (nu of binnenkort)</option>
                <option value="naaste">Ik ben naaste en zoek mee</option>
              </select>

              <button
                onClick={applySuggestedDefaults}
                style={{ marginTop: 10, padding: "10px 14px", borderRadius: 999, border: "1px solid #111", background: "#fff", fontWeight: 700, cursor: "pointer" }}
              >
                Gebruik slimme startinstellingen
              </button>

              <div style={{ marginTop: 10, fontSize: 12, color: "#666", lineHeight: 1.5 }}>
                Tip: dit zet een paar logische keuzes klaar. U kunt alles aanpassen.
              </div>
            </div>

            <div>
              <div style={{ fontSize: 13, color: "#666" }}>Plaats/regio</div>
              <input
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Bijv. Amsterdam, Utrecht…"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }}
              />

              <div style={{ fontSize: 13, color: "#666", marginTop: 12 }}>Type</div>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }}
              >
                <option value="all">Alles</option>
                <option value="Huur">Huur</option>
                <option value="Koop">Koop</option>
                <option value="Nieuwbouw">Nieuwbouw</option>
                <option value="Concept">Concept</option>
              </select>
            </div>
          </div>

          <hr style={{ margin: "18px 0" }} />

          <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 18 }}>Wat heeft u nu?</h2>
              <p className="muted" style={{ marginTop: 6 }}>
                Kies per onderwerp het niveau dat nu speelt.
              </p>

              {DOMAIN_GROUPS.map((g) => (
                <DomainBlock
                  key={g.title}
                  title={g.title}
                  subtitle={g.subtitle}
                  items={g.items}
                  target="now"
                  levelOf={(k) => levelOf("now", k)}
                  setLevel={(k, v) => setLevel("now", k, v)}
                />
              ))}
            </div>

            <div>
              <h2 style={{ margin: 0, fontSize: 18 }}>Wat wilt u later kunnen organiseren?</h2>
              <p className="muted" style={{ marginTop: 6 }}>
                Dit is de “zekerheid voor later” — zonder dat het nu al moet.
              </p>

              {DOMAIN_GROUPS.map((g) => (
                <DomainBlock
                  key={g.title}
                  title={g.title}
                  subtitle={g.subtitle}
                  items={g.items}
                  target="later"
                  levelOf={(k) => levelOf("later", k)}
                  setLevel={(k, v) => setLevel("later", k, v)}
                />
              ))}
            </div>
          </div>

          <div className="btnRow" style={{ marginTop: 16 }}>
            <button
              onClick={() => { setSubmitted(true); setNotifyDone(false); setNotifyError(null); }}
              className="btn btnPrimary"
              style={{ cursor: "pointer" }}
            >
              Toon actueel aanbod
            </button>
            <a className="btn btnGhost" href={focusUrl()}>
              Bekijk op kaart →
            </a>
          </div>
        </div>

        {submitted && (
          <div style={{ marginTop: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <h2 style={{ margin: 0 }}>Resultaat</h2>
              <a href={focusUrl()} style={{ textDecoration: "underline" }}>Kaart →</a>
            </div>

            {results.length > 0 && results[0].score > 0 ? (
              <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
                {results.slice(0, 8).map(({ listing, score, penalties }) => (
                  <a
                    key={listing.id}
                    href={`/woningen/${encodeURIComponent(listing.id)}`}
                    className="card"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontSize: 13, color: "#666" }}>{listing.place} • {listing.label}</div>
                        <div style={{ fontWeight: 800, marginTop: 4 }}>{listing.title}</div>
                        <div style={{ marginTop: 6, color: "#444" }}>{listing.price}</div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 12, color: "#666" }}>Matchscore</div>
                        <div style={{ fontWeight: 800 }}>{score}</div>
                        {penalties > 0 && (
                          <div style={{ fontSize: 12, color: "#b00", marginTop: 4 }}>Let op: enkele tekorten</div>
                        )}
                      </div>
                    </div>

                    <div style={{ marginTop: 10, fontSize: 13, color: "#444", lineHeight: 1.5 }}>
                      <strong>Waarom dit past:</strong> {explainWhy(listing, wantsCombined)}
                    </div>

                    <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <a href={`/woningen/kaart?focus=${encodeURIComponent(listing.id)}`} style={{ textDecoration: "underline" }}>
                        Toon op kaart →
                      </a>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="card" style={{ marginTop: 14 }}>
                <div style={{ fontWeight: 800 }}>Geen passend aanbod gevonden (demo)</div>
                <p className="muted" style={{ maxWidth: 820 }}>
                  Laat uw e-mailadres achter. Dan houden we u op de hoogte zodra er passend aanbod beschikbaar is.
                </p>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mailadres"
                    style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd", minWidth: 260 }}
                  />
                  <button
                    onClick={submitNotify}
                    disabled={!email.includes("@")}
                    className="btn btnPrimary"
                    style={{ cursor: email.includes("@") ? "pointer" : "not-allowed", opacity: email.includes("@") ? 1 : 0.6 }}
                  >
                    Houd mij op de hoogte
                  </button>
                </div>

                {notifyDone && <div style={{ marginTop: 10, fontSize: 13, color: "#0a7" }}>Dank! (demo) We hebben uw verzoek ontvangen.</div>}
                {notifyError && <div style={{ marginTop: 10, fontSize: 13, color: "#b00" }}>{notifyError}</div>}

                <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
                  In productie: koppeling met e-mail tooling + alerts op nieuw aanbod.
                </div>
              </div>
            )}
          </div>
        )}

        <p style={{ marginTop: 24 }}>
          <a href="/" style={{ textDecoration: "underline" }}>← Terug</a>
        </p>
      </div>
    </main>
  );
}

function DomainBlock(props: {
  title: string;
  subtitle: string;
  items: Array<{ key: Domain; label: string; help: string }>;
  target: "now" | "later";
  levelOf: (k: Domain) => NeedLevel;
  setLevel: (k: Domain, v: NeedLevel) => void;
}) {
  const { title, subtitle, items, target, levelOf, setLevel } = props;

  return (
    <div style={{ marginTop: 14, borderTop: "1px solid #eee", paddingTop: 12 }}>
      <div style={{ fontWeight: 800 }}>{title}</div>
      <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{subtitle}</div>

      <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
        {items.map((it) => (
          <div key={it.key} style={{ border: "1px solid #eee", borderRadius: 14, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{it.label}</div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{it.help}</div>
              </div>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {(["geen", "licht", "regelmatig", "intensief"] as NeedLevel[]).map((lvl) => {
                  const active = levelOf(it.key) === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => setLevel(it.key, lvl)}
                      style={{
                        padding: "8px 10px",
                        borderRadius: 999,
                        border: "1px solid #ddd",
                        background: active ? "#111" : "#fff",
                        color: active ? "#fff" : "#111",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: 12
                      }}
                      title={`${target === "now" ? "Nu" : "Later"}: ${levelLabel(lvl)}`}
                    >
                      {lvl === "geen" ? "n.v.t." : lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function explainWhy(listing: Listing, wants: Partial<Record<Domain, NeedLevel>>) {
  // maak 2–3 zinnen die mensen begrijpen
  const positives: string[] = [];
  const gaps: string[] = [];

  (Object.keys(wants) as Domain[]).forEach((k) => {
    const need = wants[k] || "geen";
    if (need === "geen") return;

    const cap = listing.capabilities[k] || "geen";
    const n = LEVEL_SCORE[need];
    const c = LEVEL_SCORE[cap];

    const label = humanDomain(k);

    if (c >= n) positives.push(label);
    else gaps.push(label);
  });

  const pos = positives.slice(0, 3);
  const gap = gaps.slice(0, 2);

  let s = "";
  if (pos.length) s += `Sterk op: ${pos.join(", ")}. `;
  if (gap.length) s += `Mogelijk aandachtspunt: ${gap.join(", ")}. `;
  if (!pos.length && !gap.length) s += "Deze woning is vooral een algemene match op locatie/type (demo).";

  return s.trim();
}

function humanDomain(k: Domain) {
  switch (k) {
    case "WEL_SOCIAAL": return "welzijn & ontmoeting";
    case "WEL_ACTIEF": return "activiteiten & vitaliteit";
    case "WEL_VEILIGHEID": return "veiligheid & vertrouwdheid";
    case "HULP_HUISHOUDEN": return "huishoudelijke hulp";
    case "HULP_MAALTIJDEN": return "maaltijden";
    case "HULP_VERVOER": return "vervoer";
    case "ONDER_STRUCTUUR": return "structuur & daginvulling";
    case "ONDER_BEGELEIDING": return "begeleiding";
    case "ONDER_REABLEMENT": return "reablement / fit blijven";
    case "ZORG_PV": return "persoonlijke verzorging";
    case "ZORG_VERPLEGING": return "verpleging";
    case "ZORG_24_7_NABIJ": return "24/7 nabijheid";
    default: return "onderdeel";
  }
}
