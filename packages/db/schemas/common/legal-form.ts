type LegalFormInfo = {
  fullName: string;
  abbreviation: string;
};

export const legalForm: Record<string, LegalFormInfo> = {
  EU: {
    fullName: "Einzelunternehmen", // Sole Proprietorship
    abbreviation: "EU",
  },
  GbR: {
    fullName: "Gesellschaft bürgerlichen Rechts",
    abbreviation: "GbR", // Civil Law Partnership
  },
  OHG: {
    fullName: "Offene Handelsgesellschaft",
    abbreviation: "OHG", // General Partnership
  },
  KG: {
    fullName: "Kommanditgesellschaft",
    abbreviation: "KG", // Limited Partnership
  },
  GmbH: {
    fullName: "Gesellschaft mit beschränkter Haftung",
    abbreviation: "GmbH", // Limited Liability Company
  },
  UG: {
    fullName: "Unternehmergesellschaft (haftungsbeschränkt)",
    abbreviation: "UG", // Entrepreneurial Company (limited liability)
  },
  AG: {
    fullName: "Aktiengesellschaft",
    abbreviation: "AG", // Stock Corporation
  },
  eG: {
    fullName: "eingetragene Genossenschaft",
    abbreviation: "eG", // Registered Cooperative
  },
  gAG: {
    fullName: "gemeinnützige Aktiengesellschaft",
    abbreviation: "gAG", // Non-profit Stock Corporation
  },
  gGmbH: {
    fullName: "gemeinnützige Gesellschaft mit beschränkter Haftung",
    abbreviation: "gGmbH", // Non-profit Limited Liability Company
  },
  PartG: {
    fullName: "Partnerschaftsgesellschaft",
    abbreviation: "PartG", // Partnership Company
  },
  KGaA: {
    fullName: "Kommanditgesellschaft auf Aktien",
    abbreviation: "KGaA", // Partnership Limited by Shares
  },
  Verein: {
    fullName: "Eingetragener Verein",
    abbreviation: "e.V.", // Registered Association
  },
  GmbHCoKG: {
    fullName: "GmbH & Co. KG",
    abbreviation: "GmbH & Co. KG", // Limited Liability Company & Limited Partnership
  },
  GmbHCoOHG: {
    fullName: "GmbH & Co. OHG",
    abbreviation: "GmbH & Co. OHG", // Limited Liability Company & General Partnership
  },
};
