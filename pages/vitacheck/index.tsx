import { useMemo, useState } from "react";
import {
  DOMAIN_GROUPS,
} from "../../vitacheckParts"; // <-- we maken dit bestand in stap 1b
import {
  LEVEL_SCORE,
  LISTINGS,
  fundingText,
  moveHorizonLabel,
  type Domain,
  type FundingRoute,
  type MoveHorizon,
  type NeedLevel,
  type VitaProfile,
} from "../../lib/demoData";

/**
 * We halen DOMAIN_GROUPS uit vitacheckParts.ts zodat dit bestand niet megagroot wordt.
 */

function humanDomain(k: Domain) {
  switch (k) {
    case "WEL_SOCIAAL":
      return "welzijn & ontmoeting";
    case "WEL_ACTIEF":
      return "activiteiten & vitaliteit";
    case "WEL_VEILIGHEID":
      return "veiligheid & vertrouwdheid";
    case "HULP_HUISHOUDEN":
      return "huishoudelijke hulp";
    case "HULP_MAALTIJDEN":
      return "maaltijden";
    case "HULP_VERVOER":
      return "vervoer";
    case "ONDER_STRUCTUUR":
      return "structuur & daginvulling";
    case "ONDER_BEGELEIDING":
      return "begeleiding";
    case "ONDER_REABLEMENT":
      return "reablement / fit blijven";
    case "ZORG_PV":
      return "persoonlijke verzorging";
    case "ZORG_VERPLEGING":
      return "verpleging";
    case "ZORG_24_7_NABIJ":
      return "24/7 nabijheid";
    default:
      return "onderdeel";
  }
}

function levelLabel(l: NeedLevel) {
  switch (l) {
    case "geen":
      return "n.v.t.";
    case "licht":
      return "licht";
    case "regelmatig":
      return "regelmatig";
    case "intensief":
      return "intensief";
  }
}

function scoreListing(listing: any, wants: Partial<Record<Domain, NeedLevel>>) {
  let score = 0;
  let penalties = 0;

  (Object.keys(wants) as Domain[]).forEach((k) => {
    const need = wants[k] || "geen";
    if (need === "geen") return;

    const cap = listing.capabilities[k] || "geen";
    const n = LEVEL_SCORE[need];
    const c = LEVEL_SCORE[cap];

    if (c >= n) {
      score += 3;
      if (c > n) score += 1;
    } else {
      penalties += (n - c) * 2;
    }
  });

  return { score: Math.max(score - penalties, 0), penalties };
}

function explainWhy(listing: any, wants: Partial<Record<Domain, NeedLevel>>) {
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
  if (!pos.length && !gap.length) s += "Match vooral op locatie/type (demo).";

  return s.trim();
}

export default function VitaCheck() {
  const [current, setCurrent] = useState<VitaProfile["current"]>("zelfstandig");
  const [funding, setFunding] = useState<FundingRoute>("onbekend");
  const [moveHorizon, setMoveHorizon] = useState<MoveHorizon>("orientatie");

  const [leavingTenure, setLeavingTenure] = useState<"koop" | "huur" | "onbekend">("onbekend");
  const [leavingType, setLeavingType] = useState<"appartement" | "eengezins" | "seniorenwoning" | "overig" | "onbekend">("onbekend");
  const [leavingFloor, setLeavingFloor] = useState<"begane_grond" | "verdieping_met_lift" | "verdieping_zonder_lift" | "onbekend">("onbekend");
  const [leavingRegion, setLeavingRegion] = useState("");
  const [leavingSize, setLeavingSize] = useState<"klein" | "middel" | "groot" | "onbekend">("onbekend");
  const [leavingNotes, setLeavingNotes] = useState("");

  const [area, setArea] = useState("");
  const [type, setType] = useState<VitaProfile["type"]>("all");

  const [now, setNow] = useState<VitaProfile["now"]>({});
  const [later, setLater] = useState<VitaProfile["later"]>({});
  const [submitted, setSubmitted] = useState(false);

  const [email, setEmail] = useState("");
  const [notifyDone, setNotifyDone] = useState(false);
  const [notifyError, setNotifyError] = useState<string | null>(null);

  function setLevel(target: "now" | "later", key: Domain, level: NeedLevel) {
    const setter = target === "now" ? setNow : setLater;
    const state = target === "now" ? now : later;

    const next = { ...state };
    if (level === "geen") delete (next as any)[key];
    else (next as any)[key] = level;

    setter(next);
  }

  function levelOf(target: "now" | "later", key: Domain): NeedLevel {
    const state = target === "now" ? now : later;
    return (state as any)[key] || "geen";
  }

  function applySuggestedDefaults() {
    const baseNow: any = {};
    const baseLater: any = {};

    baseNow.WEL_SOCIAAL = "licht";
    baseNow.WEL_VEILIGHEID = "licht";

    if (current === "zelfstandig" || current === "naaste") {
      baseLater.HULP_HUISHOUDEN = "licht";
      baseLater.ONDER_REABLEMENT = "licht";
      baseLater.WEL_ACTIEF = "licht";
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
    const out: Partial<Record<Domain, NeedLevel>> = {};
    const keys = new Set<Domain>([
      ...(Object.keys(now) as Domain[]),
      ...(Object.keys(later) as Domain[]),
    ]);
    keys.forEach((k) => {
      const n = (now as any)[k] || "geen";
      const l = (later as any)[k] || "geen";
      out[k] = LEVEL_SCORE[l] > LEVEL_SCORE[n] ? l : n;
    });
    return out;
  }, [now, later]);

  const profile: VitaProfile = useMemo(
    () => ({
      current,
      funding,
      moveHorizon,
      leavingBehind: {
        tenure: leavingTenure,
        homeType: leavingType,
        floor: leavingFloor,
        region: leavingRegion,
        approxSize: leavingSize,
        notes: leavingNotes,
      },
      area,
      type,
      now,
      later,
    }),
    [
      current,
      funding,
      moveHorizon,
      leavingTenure,
      leavingType,
      leavingFloor,
      leavingRegion,
      leavingSize,
      leavingNotes,
      area,
      type,
      now,
      later,
    ]
  );

  const results = useMemo(() => {
    if (!submitted) return [];

    const a = area.trim().toLowerCase();
    const filtered = LISTINGS.filter((x) => {
      if (a && !x.place.toLowerCase().includes(a)) return false;
      if (type !== "all" && x.label !== type) return false;
      return true;
    });

    return filtered
      .map((x) => ({ listing: x, ...scoreListing(x, wantsCombined) }))
      .sort((p, q) => q.score - p.score);
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
        body: JSON.stringify({ email, profile }),
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

  async function joinWaitlist(listingId: string) {
    setNotifyDone(false);
    setNotifyError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, listingId, profile }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Fout bij inschrijven");
      }

      setNotifyDone(true);
    } catch (e: any) {
      setNotifyError(e?.message || "Er ging iets mis");
    }
  }

  return (
    <main>
      <div className="container">
        <h1>VitaCheck</h1>
        <p className="muted" style={{ maxWidth: 900 }}>
          Geef aan wat u <strong>nu</strong> heeft en wat u <strong>later</strong> wilt kunnen organiseren.
          U ziet direct het aanbod dat hierbij past — en u kunt zich per complex inschrijven (wachtlijst).
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
                <option value="lichteHulp">Ik ontvang lichte hulp (praktisch)</option>
                <option value="ondersteuning">Ik ontvang ondersteuning / begeleiding</option>
                <option value="zorg">Ik ontvang zorg / heb een indicatie (nu of binnenkort)</option>
                <option value="naaste">Ik ben naaste en zoek mee</option>
              </select>

              <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>Indicatie / financieringsroute (als u dit weet)</div>
              <select
                value={funding}
                onChange={(e) => setFunding(e.target.value as any)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }}
              >
                <option value="onbekend">Ik weet het (nog) niet</option>
                <option value="zelf">Geen indicatie (zelf / particulier geregeld)</option>
                <option value="wmo">Wmo (gemeente)</option>
                <option value="zvw">Zvw (zorgverzekering / wijkverpleging)</option>
                <option value="wlz">Wlz (langdurige/structurele zorg)</option>
              </select>

              <div className="card" style={{ marginTop: 10, background: "#fafafa" }}>
                <strong>Richtingwijzer</strong>
                <p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
                  {fundingText(funding)}
                </p>
                <div style={{ fontSize: 12, color: "#666" }}>NB: informatief; regels verschillen per gemeente en situatie.</div>
              </div>

              <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>Wanneer wilt u verhuizen?</div>
              <select
                value={moveHorizon}
                onChange={(e) => setMoveHorizon(e.target.value as any)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }}
              >
                <option value="orientatie">{moveHorizonLabel("orientatie")}</option>
                <option value="0_3">{moveHorizonLabel("0_3")}</option>
                <option value="3_12">{moveHorizonLabel("3_12")}</option>
                <option value="12_24">{moveHorizonLabel("12_24")}</option>
                <option value="24_plus">{moveHorizonLabel("24_plus")}</option>
              </select>

              <button
                onClick={applySuggestedDefaults}
                style={{
                  marginTop: 10,
                  padding: "10px 14px",
                  borderRadius: 999,
                  border: "1px solid #111",
                  background: "#fff",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Gebruik slimme startinstellingen
              </button>
            </div>

            <div>
              <div style={{ fontSize: 13, color: "#666" }}>Wat laat u achter? (helpt bij matching)</div>

              <div style={{ display: "grid", gap: 10, marginTop: 8 }}>
                <select
                  value={leavingTenure}
                  onChange={(e) => setLeavingTenure(e.target.value as any)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }}
                >
                  <option value="onbekend">Huidige situatie: onbekend</option>
                  <option value="huur">Ik laat een huurwoning achter</option>
                  <option value="koop">Ik laat een koopwoning achter</option>
                </select>

                <select
                  value={leavingType}
                  onChange={(e) => setLeavingType(e.target.value as any)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }}
                >
                  <option value="onbekend">Type woning: onbekend</option>
                  <option value="appartement">Appartement</option>
                  <option value="eengezins">Eengezinswoning</option>
                  <option value="seniorenwoning">Seniorenwoning</option>
                  <option value="overig">Overig</option>
                </select>

                <select
                  value={leavingFloor}
                  onChange={(e) => setLeavingFloor(e.target.value as any)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }}
                >
                  <option value="onbekend">Verdieping/toegankelijkheid: onbekend</option>
                  <option value="begane_grond">Begane grond / gelijkvloers</option>
                  <option value="verdieping_met_lift">Verdieping mét lift</option>
                  <option value="verdieping_zonder_lift">Verdieping zónder lift</option>
                </select>

                <select
                  value={leavingSize}
                  onChange={(e) => setLeavingSize(e.target.value as any)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }}
                >
                  <option value="onbekend">Woonoppervlak: onbekend</option>
                  <option value="klein">Klein</option>
                  <option value="middel">Middel</option>
                  <option value="groot">Groot</option>
                </select>

                <input
                  value={leavingRegion}
                  onChange={(e) => setLeavingRegion(e.target.value)}
                  placeholder="Plaats/regio van huidige woning (optioneel)"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }}
                />

                <textarea
                  value={leavingNotes}
                  onChange={(e) => setLeavingNotes(e.target.value)}
                  placeholder="Wat is belangrijk aan uw huidige woning? (optioneel)"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd", minHeight: 90 }}
                />
              </div>

              <hr style={{ margin: "14px 0" }} />

              <div style={{ fontSize: 13, color: "#666" }}>Plaats/regio waar u zoekt</div>
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

              <div className="card" style={{ marginTop: 14, background: "#fafafa" }}>
                <strong>Hulp nodig bij documenten & inschrijving?</strong>
                <p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
                  Wij kunnen u helpen met een documenten-check, inschrijfhulp en voorbereiding op verhuizing.
                </p>
                <div className="btnRow" style={{ marginTop: 10 }}>
                  <a className="btn btnPrimary" href="/vita-advies">Vita Advies →</a>
                  <a className="btn btnGhost" href="/documenten">Documenten op orde</a>
                </div>
              </div>
            </div>
          </div>

          <hr style={{ margin: "18px 0" }} />

          <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 18 }}>Wat heeft u nu?</h2>
              <p className="muted" style={{ marginTop: 6 }}>Kies per onderwerp het niveau dat nu speelt.</p>
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
              <p className="muted" style={{ marginTop: 6 }}>Zekerheid voor later — zonder dat het nu al moet.</p>
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
              onClick={() => {
                setSubmitted(true);
                setNotifyDone(false);
                setNotifyError(null);
              }}
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
              <a href={focusUrl()} style={{ textDecoration: "underline" }}>
                Kaart →
              </a>
            </div>

            {/* Email veld voor inschrijving / notify */}
            <div className="card" style={{ marginTop: 12, background: "#fafafa" }}>
              <strong>Uw e-mail</strong>
              <p className="muted" style={{ marginTop: 8 }}>
                Nodig om u in te schrijven (wachtlijst) of u op de hoogte te houden.
              </p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mailadres"
                style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd", minWidth: 260, width: "100%" }}
              />
            </div>

            {results.length > 0 && results[0].score > 0 ? (
              <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
                {results.slice(0, 8).map(({ listing, score, penalties }) => (
                  <div key={listing.id} className="card">
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontSize: 13, color: "#666" }}>
                          {listing.place} • {listing.label}
                        </div>
                        <div style={{ fontWeight: 800, marginTop: 4 }}>{listing.title}</div>
                        <div style={{ marginTop: 6, color: "#444" }}>{listing.price}</div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 12, color: "#666" }}>Matchscore</div>
                        <div style={{ fontWeight: 800 }}>{score}</div>
                        {penalties > 0 && <div style={{ fontSize: 12, color: "#b00", marginTop: 4 }}>Let op: enkele tekorten</div>}
                      </div>
                    </div>

                    <div style={{ marginTop: 10, fontSize: 13, color: "#444", lineHeight: 1.5 }}>
                      <strong>Waarom dit past:</strong> {explainWhy(listing, wantsCombined)}
                    </div>

                    <div className="btnRow" style={{ marginTop: 12 }}>
                      <a className="btn btnGhost" href={`/woningen/${encodeURIComponent(listing.id)}`}>Bekijk woning</a>
                      <a className="btn btnGhost" href={`/woningen/kaart?focus=${encodeURIComponent(listing.id)}`}>Toon op kaart</a>
                      <button
                        className="btn btnPrimary"
                        style={{ cursor: email.includes("@") ? "pointer" : "not-allowed", opacity: email.includes("@") ? 1 : 0.6 }}
                        disabled={!email.includes("@")}
                        onClick={() => joinWaitlist(listing.id)}
                        title="Schrijf in (demo)"
                      >
                        Schrijf in / wachtlijst
                      </button>
                    </div>

                    <div style={{ marginTop: 10, display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <a href="/faq" style={{ textDecoration: "underline" }}>FAQ</a>
                      <a href="/documenten" style={{ textDecoration: "underline" }}>Documenten op orde</a>
                      <a href="/vita-advies" style={{ textDecoration: "underline" }}>Vita Advies</a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card" style={{ marginTop: 14 }}>
                <div style={{ fontWeight: 800 }}>Geen passend aanbod gevonden (demo)</div>
                <p className="muted" style={{ maxWidth: 820 }}>
                  Laat uw e-mailadres achter. Dan houden we u op de hoogte zodra er passend aanbod beschikbaar is.
                </p>

                <button
                  onClick={submitNotify}
                  disabled={!email.includes("@")}
                  className="btn btnPrimary"
                  style={{ cursor: email.includes("@") ? "pointer" : "not-allowed", opacity: email.includes("@") ? 1 : 0.6 }}
                >
                  Houd mij op de hoogte
                </button>

                {notifyDone && <div style={{ marginTop: 10, fontSize: 13, color: "#0a7" }}>Dank! (demo) We hebben uw verzoek ontvangen.</div>}
                {notifyError && <div style={{ marginTop: 10, fontSize: 13, color: "#b00" }}>{notifyError}</div>}
              </div>
            )}

            {notifyDone && (
              <div className="card" style={{ marginTop: 14, background: "#fafafa" }}>
                <strong>Volgende stap (demo)</strong>
                <p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
                  Na een match start de reis pas echt. In de volgende versie krijgt u toegang tot <strong>Dolce Vita</strong>:
                  een community om wegwijs te worden in de buurt en contact te leggen.
                </p>
                <a href="/dolce-vita" style={{ textDecoration: "underline" }}>Bekijk Dolce Vita →</a>
              </div>
            )}
          </div>
        )}

        <p style={{ marginTop: 24 }}>
          <a href="/" style={{ textDecoration: "underline" }}>
            ← Terug
          </a>
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
                        fontWeight: 800,
                        fontSize: 12,
                      }}
                      title={`${target === "now" ? "Nu" : "Later"}: ${levelLabel(lvl)}`}
                    >
                      {levelLabel(lvl)}
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
