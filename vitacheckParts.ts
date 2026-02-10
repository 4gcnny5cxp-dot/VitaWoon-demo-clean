import type { Domain } from "./lib/demoData";

export const DOMAIN_GROUPS: Array<{
  title: string;
  subtitle: string;
  items: Array<{ key: Domain; label: string; help: string }>;
}> = [
  {
    title: "Welzijn & community",
    subtitle: "Ontmoeting, omkijken, activiteiten, vitaliteit en veiligheid.",
    items: [
      { key: "WEL_SOCIAAL", label: "Ontmoeting & sociaal contact", help: "Contact, gezamenlijke ruimtes, omkijken." },
      { key: "WEL_ACTIEF", label: "Activiteiten & vitaliteit", help: "Bewegen, activiteiten, reablement/gym." },
      { key: "WEL_VEILIGHEID", label: "Veiligheid & vertrouwdheid", help: "Overzicht, sociaal veilig, vertrouwde omgeving." },
    ],
  },
  {
    title: "Hulp",
    subtitle: "Praktische hulp om het dagelijks leven makkelijker te maken.",
    items: [
      { key: "HULP_HUISHOUDEN", label: "Huishoudelijke hulp", help: "Schoonmaak, wassen, lichte taken." },
      { key: "HULP_MAALTIJDEN", label: "Maaltijden", help: "Maaltijdservice, samen eten, bezorging." },
      { key: "HULP_VERVOER", label: "Vervoer & mobiliteit", help: "Halen/brengen, OV-hulp, deelvervoer." },
    ],
  },
  {
    title: "Ondersteuning",
    subtitle: "Begeleiding, structuur, activering (zonder medische zorg als vertrekpunt).",
    items: [
      { key: "ONDER_STRUCTUUR", label: "Structuur & daginvulling", help: "Ritme, planning, houvast." },
      { key: "ONDER_BEGELEIDING", label: "Begeleiding", help: "Lichte begeleiding, overzicht/prikkels, mantelzorg-ontlasting." },
      { key: "ONDER_REABLEMENT", label: "Reablement / fit blijven", help: "Oefenen, sterker worden, langer zelfstandig." },
    ],
  },
  {
    title: "Zorg",
    subtitle: "Verzorging/verpleging (nu of later) – zo nodig met indicatie.",
    items: [
      { key: "ZORG_PV", label: "Persoonlijke verzorging", help: "Hulp bij wassen/aankleden (wijkverpleging e.d.)." },
      { key: "ZORG_VERPLEGING", label: "Verpleging", help: "Medische zorgmomenten, wondzorg, medicatie." },
      { key: "ZORG_24_7_NABIJ", label: "24/7 nabijheid", help: "Zorg dichtbij/aanwezigheid (zwaardere behoefte)." },
    ],
  },
];

