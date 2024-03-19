import type { NamespaceSignupTranslation } from "../../i18n-types";

const de_signup = {
  title: "Willkommen bei {name}",
  subTitle: "Schön, dass du da bist!",
  profile: {
    subTitle:
      "Wir brauchen einige Informationen, um dein Konto einzurichten...",
    firstName: "Vorname",
    lastName: "Name",
    city: "Deine nächstgelegene Stadt",
    termsAccepted:
      "Ich akzeptiere die Datenschutzrichtlinie und die Allgemeine Geschäftsbedingungen",
    emailCommunicationAccepted:
      "Ihr dürft mir marketingbezogene E-Mails schicken",
    signUp: "Registrieren",
  },
} satisfies NamespaceSignupTranslation;

export default de_signup;
