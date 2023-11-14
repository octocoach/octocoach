import { Locales } from "@octocoach/i18n/src/i18n-types";
import { OrganizationWithContent } from "../context";

type MakeImpressum = (organization: OrganizationWithContent) => string;

export const makeImpressum: Record<Locales, MakeImpressum> = {
  en: (organization) => `# Legal Notice ${organization.legalName}
  ## Information in accordance with Section 5 TMG
  
  ${organization.owner.name}

  ${organization.legalName}

  ${organization.address.addressLine1}

  ${organization.address.addressLine2 || ""}

  ${organization.address.postcode} ${organization.address.city}
  
  ## Contact
  
  Telephone: ${organization.phone || ""}

  Email: ${organization.email || ""}
  
   
  
  ## Editorial Responsibility
  
  ${organization.owner.name}

  ${organization.address.addressLine1}

  ${organization.address.addressLine2 || ""}

  ${organization.address.postcode} ${organization.address.city}
  
  ## EU Dispute Resolution
  
  The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/.
  Our email address can be found above in the legal notice.
  
  ## Consumer Dispute Resolution/Universal Arbitration Board
  
  We are not willing or obligated to participate in dispute resolution proceedings before a consumer arbitration board.`,

  de: (organization) => `# Impressum ${organization.legalName}
  ## Angaben gemäß § 5 TMG
  
  ${organization.owner.name}

  ${organization.legalName}

  ${organization.address.addressLine1}
  
  ${organization.address.addressLine2 || ""}

  ${organization.address.postcode} ${organization.address.city}
  
  ## Kontakt
  
  Telefon: ${organization.phone || ""}

  E-Mail: ${organization.email || ""}
  
   
  
  ## Redaktionell verantwortlich
  
  ${organization.owner.name}

  ${organization.address.addressLine1}

  ${organization.address.addressLine2 || ""}

  ${organization.address.postcode} ${organization.address.city}


  ## EU-Streitschlichtung
  
  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/.
  Unsere E-Mail-Adresse finden Sie oben im Impressum.
  
  ## Verbraucheestreitbeilegung/Universalschlichtungsstelle
  
  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.`,
};
