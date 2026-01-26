export type NeedLevel = "geen" | "licht" | "regelmatig" | "intensief";
export type FundingRoute = "onbekend" | "zelf" | "wmo" | "zvw" | "wlz";

export type Domain =
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

export type MoveHorizon =
  | "orientatie"
  | "0_3"
  | "3_12"
  | "12_24"
  | "24_plus";

export type LeavingBehind = {
  tenure?: "koop" | "huur" | "onbekend";
  homeType?: "appartement" | "eengezins" | "seniorenwoning" | "overig" | "onbekend";
  floor?: "begane_grond" | "verdieping_met_lift" | "verdieping_zonder_lift" | "onbekend";
  region?: string;
  approxSize?: "klein" | "middel" | "groot" | "onbekend";
  notes?: string;
};

export type VitaProfile = {
  current: "zelfstandig" | "lichteHulp" | "ondersteuning" | "zorg" | "naaste";
  funding: FundingRoute;
  moveHorizon: MoveHorizon;
  leavingBehind: LeavingBehind;
  area: string;
  type: "all" | "Huur" | "Koop" | "Nieuwbouw" | "Concept";
  now: Partial<Record<Domain, NeedLevel>>;
  later: Partial<Record<Domain, NeedLevel>>;
};

export type Listing = {
  id: string;
  title: string;
  place: string;
  label: "Huur" | "Koop" | "Nieuwbouw" | "Concept";
  price: string;
  lat: number;
  lon: number;
  // demo "capabilities"
  capabilities: Partial<Record<Domain, NeedLevel>>;
};

export const LEVEL_SCORE: Record<NeedLevel, number> = {
  geen: 0,
  licht: 1,
  regelmatig: 2,
  intensief: 3,
};

export const LISTINGS: Listing[] = [
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
      ZORG_PV: "licht",
    },
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
      ZORG_PV: "licht",
    },
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
      ZORG_VERPLEGING: "licht",
    },
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
      ZORG_PV: "licht",
    },
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
      ZORG_PV: "licht",
    },
  },
];

export function moveHorizonLabel(m: MoveHorizon) {
  switch (m) {
    case "orientatie":
      return "Oriëntatie (nog geen termijn)";
    case "0_3":
      return "Binnen 0–3 maanden";
    case "3_12":
      return "Binnen 3–12 maanden";
    case "12_24":
      return "Binnen 1–2 jaar";
    case "24_plus":
      return "Over 2+ jaar";
  }
}

export function fundingText(route: FundingRoute) {
  switch (route) {
    case "wmo":
      return "Wmo: hulp/ondersteuning via de gemeente (bijv. begeleiding, ondersteuning thuis).";
    case "zvw":
      return "Zvw: zorg via de zorgverzekering (bijv. wijkverpleging: verzorging/verpleging).";
    case "wlz":
      return "Wlz: langdurige, intensievere zorg (structurele/continue zorgbehoefte).";
    case "zelf":
      return "Geen indicatie: vaak start bij wonen & welzijn, met hulp te organiseren.";
    default:
      return "Onbekend: geen probleem — VitaCheck helpt eerst oriënteren en taal geven.";
  }
}
