import { Locales } from "@octocoach/i18n/src/i18n-types";

import { OrganizationWithContent } from "../helpers";

type MakePrivacyPolicy = (organization: OrganizationWithContent) => string;

export const makePrivacyPolicy: Record<Locales, MakePrivacyPolicy> = {
  en: (organization) => `## Introduction

  Welcome to ${
    organization.displayName
  }'s Privacy Policy. This policy outlines how we collect, use, and protect the personal data of our clients and website visitors. Our commitment to your privacy is paramount, and we ensure that all data handling practices comply with the General Data Protection Regulation (GDPR).
  
  As the provider of career coaching services for web developers, ${
    organization.displayName
  } collects personal data primarily to offer and enhance our coaching services. This includes data obtained directly from clients, as well as information received through OAuth providers like GitHub, LinkedIn, and Discord for authentication and service improvement purposes.
  
  **Data Controller**:  
  ${organization.legalName}  
  ${organization.address.addressLine1}  
  ${organization.address.addressLine2 || ""}  
  ${organization.address.postcode} ${organization.address.city}
  
  Email: ${organization.email}  
  Phone: ${organization.phone}
  
  For more details on how to contact us regarding your data privacy concerns, please refer to our Impressum.  
  
  ## User Rights
  
  Under the GDPR, you as a user have several rights regarding your personal data. These rights ensure that you have control over your information and how it is used.
  
  Rights include:
  
  - **Right to Access:** You can request access to your personal data that we process.
  - **Right to Rectification:** You have the right to correct any inaccurate or incomplete personal data.
  - **Right to Erasure:** Also known as the 'right to be forgotten', allowing you to request the deletion of your data under certain conditions.
  - **Right to Restrict Processing:** You may request the limitation of processing of your personal data.
  - **Right to Object:** You have the right to object to the processing of your personal data in certain circumstances.
  - **Right to Data Portability:** You can request your data in a structured, commonly used and machine-readable format.
  
  Additionally, you have the right to lodge a complaint with a supervisory authority about the processing of your personal data. In Germany, the supervisory authority responsible for data protection is:
  
  Der Bundesbeauftragte für den Datenschutz und die Informationsfreiheit  
  Husarenstraße 30
  D-53117 Bonn
  
  Phone: +49 (0)228-997799-0  
  Fax: +49 (0)228-997799-5550  
  E-Mail: poststelle@bfdi.bund.de
  
  ## Data Collection on Website Visit
  
  Our website, hosted on Vercel, collects certain information during your visit. This is necessary to provide and improve the website, set the appropriate locale, and ensure its security and stability. The data collection complies with Article 6(1)(f) of the GDPR.
  
  ### Collected data includes:
  
  - IP Address (used anonymously for analytics)
  - Date and time of the request
  - 'Accept Language' header for setting user locale
  - Content of the request (specific page)
  - Access status/HTTP status code
  - Information related to page views and website interactions (via Vercel Analytics)
  
  Vercel Analytics collects data in an anonymized form, primarily for understanding website traffic and usage patterns.
  
  ## Use of Cookies and Tracking Technologies
  
  Our website uses cookies to enhance user experience and ensure website functionality. This section explains what cookies are, how we use them, and your options regarding cookies.
  
  ### What are cookies?
  
  A cookie is a small text file stored on your computer or mobile device when you visit a site. Our website uses two types of cookies:
  
  - **First-party cookies**: These are set by our website and are necessary for its functioning and for remembering your preferences, like language settings.
  - **Persistent cookies**: These remain on your device and are not deleted when you close your browser. They are used to remember your preferences over time.
  
  ### How do we use cookies?
  
  1. **Visitor Preferences**: These cookies remember your settings and preferences for a better user experience.
  2. **Operational Cookies**: Essential for website functionality, these cookies do not require your consent. They include cookies necessary for authentication and locale settings.
  
  We also use Vercel Analytics, which utilizes cookies for aggregated, anonymized web traffic analysis. These analytics cookies help us understand user behavior on our site.
  
  ### Your choices regarding cookies
  
  You can control and manage cookies through your browser settings. You can view, block, or delete cookies as you wish. However, please note that disabling cookies might affect the functionality of our website.
  
  ## Services and Offers on the Website
  
  Alongside the general use of our website, we provide various services and offers that you can engage with. To use these services, you might need to provide additional personal data, which we process for the purpose of delivering these services.
  
  ### Details on our services:
  
  - **Coaching Services**: We collect information such as names, email addresses, and skill levels for providing personalized coaching.
  - **SkillSync Pathways**: This feature leverages job descriptions to create interactive queries about specific job duties, allowing users to express their interests and self-rate their skills. It helps users rank jobs based on their preferences and skill assessments. User accounts are required to access this personalized feature.
  - **OAuth Providers**: For user authentication, we utilize OAuth providers such as GitHub, LinkedIn, and Discord. This includes collecting data like names, email addresses, and professional experience from these platforms.
  - **Data Sharing**: We may share data with external entities like the [Bundesagentur für Arbeit](https://www.arbeitsagentur.de/) or Jobcenter in Germany for clients using AVGS vouchers and with [Certqua](https://www.certqua.de/) during AZAV audits.
  
  All personal data collected for these services are handled in compliance with GDPR guidelines and are used strictly for the intended purposes.
  

  ## External Service Providers and Sub-Processors

  To provide our services effectively, we partner with external service providers who assist us in processing data in various capacities.

  ### Primary External Service Providers:

  - [**Daily.co**](https://www.daily.co/): Used for video call services. Daily.co offers a transcription feature for video calls, which utilizes Deepgram.com for processing these transcriptions. This transcription service is a vital component of our coaching services, enabling the detailed analysis necessary for personalized feedback.

  - [**Deepgram.com**](https://deepgram.com/): Engaged through Daily.co for transcription services. Deepgram.com processes the audio from our video calls to provide text transcriptions.

  - [**OpenAI**](https://openai.com/): Utilized for generating summaries and insights from the transcribed text. OpenAI's advanced AI models help us to analyze and summarize the content of coaching sessions, enhancing the personalized coaching experience.

  - [**Vercel**](https://vercel.com/): Hosts our website and related services, including database storage and analytics. Vercel's role is crucial for the smooth operation and security of our digital infrastructure.

  These providers are carefully selected and bound by our instructions, ensuring the security and privacy of your data. We ensure that our agreements with these providers comply with GDPR standards, and they are responsible for the compliance of any sub-processors they may use.

  
  ### Note on Sub-Processors:
  
  - Vercel may utilize its own sub-processors to deliver the services. While these entities are not directly engaged by us, they play a part in the overall provision of Vercel's services. We ensure that our agreements with Vercel uphold the standards of GDPR, and Vercel is responsible for the compliance of their sub-processors.
  
  We have carefully selected these providers for their commitment to privacy and data security. They are contractually bound to our instructions and are regularly assessed to ensure compliance with our data protection standards and GDPR regulations.
  
  ## Data Security Measures
  
  At ${
    organization.displayName
  }, we are committed to protecting the personal data we collect and process. We employ a range of security measures to ensure data safety and compliance with GDPR.
  
  ### Our security measures include:
  
  - **Access Control**: Managed by Vercel via GitHub OAuth, with strict access controls in place to ensure only authorized personnel can access sensitive data.
  - **Two-Factor Authentication**: We use two-factor authentication for enhanced account security.
  - **Data Encryption**: Our local development machines are secured with LUKS2 encryption, and keys are stored on TPM2. We also use secure boot features to ensure data safety.
  - **Regular Security Assessments**: We conduct regular assessments and updates to our security practices to stay ahead of potential threats.
  
  We are continuously monitoring and updating our security practices to ensure the highest level of data protection and to comply with evolving data protection regulations.
  
  ## Data Retention and Deletion
  
  Our policy on data retention and deletion is designed to respect user privacy while complying with legal obligations and operational requirements.
  
  ### Data Retention Policy:
  
  - **Active Accounts**: Personal data is retained as long as the user's account remains active on our platform.
  - **Inactivity**: In case of prolonged inactivity, we may delete accounts and associated data after a period of one year.
  - **Backups**: We maintain regular backups of our database for operational integrity. Personal data in backups are handled in compliance with GDPR, ensuring they are properly secured and deleted in accordance with our retention schedule.
  
  ### Data Deletion:
  
  - **User Request**: Users can request the deletion of their accounts and associated data at any time via a dedicated option in their account settings.
  - **Backup Data**: While we endeavor to delete personal data from backups, there are technical limitations. In instances where deletion from backups is not feasible, we ensure that the data is not restored to active databases and is deleted as per our backup retention schedule.
  
  Our data retention and deletion practices are regularly reviewed to ensure compliance with GDPR and other relevant data protection regulations.
  
  ## Policy Changes and Updates
  
  We may update this privacy policy from time to time to reflect changes in our practices, service offerings, or legal requirements.
  
  ### Notification of Changes:
  
  - **Email Notifications**: In the event of any significant changes to our privacy policy, we will notify our users via email. This ensures that all users are informed promptly and can review the changes.
  - **Website Updates**: Additionally, the latest version of the policy will always be accessible on our website.
  
  We encourage users to review the updated policy to stay informed about how their personal data is handled. Our commitment to transparency and compliance with GDPR and other data protection laws is reflected in our communication of these changes.
  
  ## Contact Information
  
  For any questions or concerns regarding your personal data, our privacy practices, or this privacy policy, please contact us at:
  
  Email: ${organization.email}  
  Phone: ${organization.phone}
  
  We are committed to addressing any inquiries or concerns you may have about your data privacy and our handling of personal information.
  
  Your privacy is of utmost importance to us, and we are here to ensure that your data is handled with the highest standards of security and confidentiality.
  `,
  de: (organization) => `## Einleitung

  Willkommen bei den Datenschutzrichtlinien von ${
    organization.displayName
  }. In dieser Richtlinie erfahren Sie, wie wir die persönlichen Daten unserer Kunden und Website-Besucher sammeln, verwenden und schützen. Unser Engagement für den Schutz Ihrer Daten steht an erster Stelle, und wir stellen sicher, dass alle Datenverarbeitungspraktiken mit der Allgemeinen Datenschutzverordnung (GDPR) übereinstimmen.
  
  Als Anbieter von Karriere-Coaching-Diensten für Webentwickler sammelt ${
    organization.displayName
  } personenbezogene Daten in erster Linie, um unsere Coaching-Dienste anzubieten und zu verbessern. Dazu gehören Daten, die wir direkt von unseren Kunden erhalten, sowie Informationen, die wir über OAuth-Anbieter wie GitHub, LinkedIn und Discord zum Zwecke der Authentifizierung und Serviceverbesserung erhalten.
  
  **Datenverantwortlicher**:  
  ${organization.legalName}  
  ${organization.address.addressLine1}  
  ${organization.address.addressLine2 || ""}  
  ${organization.address.postcode} ${organization.address.city}
  
  E-Mail: ${organization.email}  
  Telefon: ${organization.phone}
  
  Weitere Informationen darüber, wie Sie uns bezüglich Ihrer Datenschutzbedenken kontaktieren können, finden Sie in unserem Impressum.
  
  ## Nutzerrechte
  
  Gemäß der GDPR haben Sie als Nutzer mehrere Rechte in Bezug auf Ihre persönlichen Daten. Diese Rechte gewährleisten, dass Sie die Kontrolle über Ihre Daten und deren Verwendung haben.
  
  Die Rechte umfassen:
  
  - **Recht auf Zugang:** Sie können Zugang zu Ihren persönlichen Daten, die wir verarbeiten, verlangen.
  - **Recht auf Berichtigung:** Sie haben das Recht, ungenaue oder unvollständige personenbezogene Daten zu korrigieren.
  - **Recht auf Löschung:** Auch bekannt als das 'Recht auf Vergessenwerden', das es Ihnen ermöglicht, unter bestimmten Bedingungen die Löschung Ihrer Daten zu verlangen.
  - **Recht auf Einschränkung der Verarbeitung:** Sie können die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten verlangen.
  - **Widerspruchsrecht:** Sie haben das Recht, der Verarbeitung Ihrer personenbezogenen Daten unter bestimmten Umständen zu widersprechen.
  - **Recht auf Datenübertragbarkeit:** Sie können Ihre Daten in einem strukturierten, allgemein verwendeten und maschinenlesbaren Format anfordern.
  
  Außerdem haben Sie das Recht, bei einer Aufsichtsbehörde eine Beschwerde über die Verarbeitung Ihrer personenbezogenen Daten einzureichen. In Deutschland ist die für den Datenschutz zuständige Aufsichtsbehörde:
  
  Der Bundesbeauftragte für den Datenschutz und die Informationsfreiheit  
  Husarenstraße 30
  D-53117 Bonn
  
  Telefon: +49 (0)228-997799-0  
  Fax: +49 (0)228-997799-5550  
  E-Mail: poststelle@bfdi.bund.de
  
  ## Datenerhebung beim Besuch der Website
  
  Unsere Website, die auf Vercel gehostet wird, sammelt während Ihres Besuchs bestimmte Informationen. Dies ist notwendig, um die Website bereitzustellen und zu verbessern, das passende Gebietsschema einzustellen und ihre Sicherheit und Stabilität zu gewährleisten. Die Datenerhebung erfolgt gemäß Artikel 6 Absatz 1 Buchstabe f der DSGVO.
  
  ### Die gesammelten Daten umfassen:
  
  - IP-Adresse (wird anonymisiert für Analysen verwendet)
  - Datum und Uhrzeit der Anfrage
  - Header 'Accept Language' zur Einstellung des Gebietsschemas des Benutzers
  - Inhalt der Anfrage (bestimmte Seite)
  - Zugriffsstatus/HTTP-Statuscode
  - Informationen zu Seitenaufrufen und Website-Interaktionen (über Vercel Analytics)
  
  Vercel Analytics sammelt Daten in anonymisierter Form, in erster Linie zum Verständnis des Websiteverkehrs und der Nutzungsmuster.
  
  ## Verwendung von Cookies und Tracking-Technologien
  
  Unsere Website verwendet Cookies, um das Benutzererlebnis zu verbessern und die Funktionalität der Website zu gewährleisten. In diesem Abschnitt erfahren Sie, was Cookies sind, wie wir sie verwenden und welche Möglichkeiten Sie in Bezug auf Cookies haben.
  
  ### Was sind Cookies?
  
  Ein Cookie ist eine kleine Textdatei, die auf Ihrem Computer oder Mobilgerät gespeichert wird, wenn Sie eine Website besuchen. Unsere Website verwendet zwei Arten von Cookies:
  
  - **Erstanbieter-Cookies**: Diese werden von unserer Website gesetzt und sind notwendig, damit sie funktioniert und Ihre Präferenzen, wie z.B. die Spracheinstellungen, gespeichert werden können.
  - **Persistente Cookies**: Diese verbleiben auf Ihrem Gerät und werden nicht gelöscht, wenn Sie Ihren Browser schließen. Sie werden verwendet, um Ihre Präferenzen im Laufe der Zeit zu speichern.
  
  ### Wie verwenden wir Cookies?
  
  1. **Besucherpräferenzen**: Diese Cookies speichern Ihre Einstellungen und Präferenzen für ein besseres Benutzererlebnis.
  2. **Operative Cookies**: Diese Cookies sind für die Funktionalität der Website unerlässlich und bedürfen nicht Ihrer Zustimmung. Dazu gehören Cookies, die für die Authentifizierung und die Einstellung des Gebietsschemas erforderlich sind.
  
  Wir verwenden auch Vercel Analytics, das Cookies für die aggregierte, anonymisierte Analyse des Webverkehrs einsetzt. Diese Analyse-Cookies helfen uns, das Nutzerverhalten auf unserer Website zu verstehen.
  
  ### Ihre Wahl in Bezug auf Cookies
  
  Sie können Cookies über Ihre Browsereinstellungen kontrollieren und verwalten. Sie können Cookies anzeigen, blockieren oder löschen, wie Sie möchten. Bitte beachten Sie jedoch, dass die Deaktivierung von Cookies die Funktionalität unserer Website beeinträchtigen kann.
  
  ## Dienstleistungen und Angebote auf der Website
  
  Neben der allgemeinen Nutzung unserer Website bieten wir verschiedene Dienste und Angebote an, die Sie nutzen können. Um diese Dienste nutzen zu können, müssen Sie möglicherweise zusätzliche personenbezogene Daten angeben, die wir zum Zweck der Bereitstellung dieser Dienste verarbeiten.
  
  ### Details zu unseren Dienstleistungen:
  
  - **Coaching-Dienste**: Wir erfassen Informationen wie Namen, E-Mail-Adressen und Fähigkeitsstufen, um Ihnen ein personalisiertes Coaching anbieten zu können.
  - **SkillSync Pathways**: Diese Funktion nutzt Stellenbeschreibungen, um interaktive Abfragen zu bestimmten beruflichen Aufgaben zu erstellen, die es Nutzern ermöglichen, ihre Interessen zu äußern und ihre Fähigkeiten selbst einzuschätzen. Sie hilft den Nutzern, Jobs auf der Grundlage ihrer Präferenzen und Kompetenzeinschätzungen einzustufen. Für den Zugriff auf diese personalisierte Funktion sind Benutzerkonten erforderlich.
  - **OAuth-Anbieter**: Für die Benutzerauthentifizierung verwenden wir OAuth-Anbieter wie GitHub, LinkedIn und Discord. Dies beinhaltet die Erfassung von Daten wie Namen, E-Mail-Adressen und Berufserfahrung von diesen Plattformen.
  - **Datenweitergabe**: Wir können Daten mit externen Stellen wie der [Bundesagentur für Arbeit](https://www.arbeitsagentur.de/) oder dem Jobcenter in Deutschland für Kunden, die AVGS-Gutscheine verwenden, und mit [Certqua](https://www.certqua.de/) während AZAV-Audits teilen.
  
  Alle persönlichen Daten, die für diese Dienste erhoben werden, werden in Übereinstimmung mit den GDPR-Richtlinien behandelt und ausschließlich für die vorgesehenen Zwecke verwendet.
  
  ## Externe Dienstleister und Unterauftragsverarbeiter

  Um unsere Dienste effektiv anbieten zu können, arbeiten wir mit externen Dienstleistern zusammen, die uns bei der Verarbeitung von Daten in verschiedenen Funktionen unterstützen.
  
  ### Primäre externe Dienstanbieter:
  
  - [**Daily.co**](https://www.daily.co/): Wird für Videogesprächsdienste verwendet. Daily.co bietet eine Transkriptionsfunktion für Videogespräche, die Deepgram.com für die Verarbeitung dieser Transkriptionen nutzt. Dieser Transkriptionsdienst ist ein wesentlicher Bestandteil unserer Coaching-Dienste, da er die detaillierte Analyse ermöglicht, die für ein personalisiertes Feedback erforderlich ist.

  - [**Deepgram.com**](https://deepgram.com/): Wird durch Daily.co für Transkriptionsdienste engagiert. Deepgram.com verarbeitet die Audioinhalte unserer Videogespräche, um Texttranskriptionen zu erstellen.

  - [**OpenAI**](https://openai.com/): Wird genutzt, um Zusammenfassungen und Einblicke aus dem transkribierten Text zu generieren. Die fortgeschrittenen KI-Modelle von OpenAI helfen uns, den Inhalt der Coaching-Sitzungen zu analysieren und zusammenzufassen, was das personalisierte Coaching-Erlebnis verbessert.

  - [**Vercel**](https://vercel.com/): Hostet unsere Website und die damit verbundenen Dienste, einschließlich der Speicherung von Datenbanken und Analysen. Die Rolle von Vercel ist entscheidend für den reibungslosen Betrieb und die Sicherheit unserer digitalen Infrastruktur.
  
  Diese Anbieter sind sorgfältig ausgewählt und an unsere Anweisungen gebunden, um die Sicherheit und den Schutz Ihrer Daten zu gewährleisten. Wir stellen sicher, dass unsere Vereinbarungen mit diesen Anbietern die Standards der GDPR einhalten, und diese Anbieter sind für die Einhaltung der Vorschriften durch ihre Unterauftragsverarbeiter verantwortlich.
  
  ### Hinweis zu Unterauftragsverarbeitern:
  
  - Vercel kann seine eigenen Unterauftragsverarbeiter einsetzen, um die Dienstleistungen zu erbringen. Diese Unternehmen sind zwar nicht direkt von uns beauftragt, spielen aber eine Rolle bei der Bereitstellung der Dienste von Vercel insgesamt. Wir stellen sicher, dass unsere Vereinbarungen mit Vercel die Standards der GDPR einhalten, und Vercel ist für die Einhaltung der Vorschriften durch seine Unterauftragsverarbeiter verantwortlich.
  
  Wir haben diese Anbieter aufgrund ihres Engagements für den Datenschutz und die Datensicherheit sorgfältig ausgewählt. Sie sind vertraglich an unsere Anweisungen gebunden und werden regelmäßig überprüft, um die Einhaltung unserer Datenschutzstandards und der GDPR-Vorschriften sicherzustellen.
  
  ## Maßnahmen zur Datensicherheit
  
  Wir bei ${
    organization.displayName
  } verpflichten uns, die von uns erhobenen und verarbeiteten personenbezogenen Daten zu schützen. Wir setzen eine Reihe von Sicherheitsmaßnahmen ein, um die Datensicherheit und die Einhaltung der GDPR zu gewährleisten.
  
  ### Unsere Sicherheitsmaßnahmen umfassen:
  
  - **Zugangskontrolle**: Von Vercel über GitHub OAuth verwaltet, mit strengen Zugriffskontrollen, um sicherzustellen, dass nur autorisierte Personen auf sensible Daten zugreifen können.
  - **Zwei-Faktor-Authentifizierung**: Wir verwenden die Zwei-Faktor-Authentifizierung für eine verbesserte Kontosicherheit.
  - **Datenverschlüsselung**: Unsere lokalen Entwicklungsmaschinen sind mit LUKS2-Verschlüsselung gesichert, und die Schlüssel werden auf einem TPM2 gespeichert. Wir verwenden außerdem sichere Boot-Funktionen, um die Datensicherheit zu gewährleisten.
  - **Regelmäßige Sicherheitsprüfungen**: Wir führen regelmäßige Bewertungen und Aktualisierungen unserer Sicherheitspraktiken durch, um potenziellen Bedrohungen immer einen Schritt voraus zu sein.
  
  Wir überwachen und aktualisieren unsere Sicherheitspraktiken kontinuierlich, um ein Höchstmaß an Datenschutz zu gewährleisten und die sich entwickelnden Datenschutzbestimmungen einzuhalten.
  
  ## Datenaufbewahrung und Löschung
  
  Unsere Richtlinie zur Aufbewahrung und Löschung von Daten ist darauf ausgerichtet, die Privatsphäre der Benutzer zu respektieren und gleichzeitig die gesetzlichen Verpflichtungen und betrieblichen Anforderungen zu erfüllen.
  
  ### Richtlinie zur Datenaufbewahrung:
  
  - **Aktive Konten**: Personenbezogene Daten werden so lange aufbewahrt, wie das Konto des Nutzers auf unserer Plattform aktiv bleibt.
  - **Inaktivität**: Bei längerer Inaktivität können wir Konten und zugehörige Daten nach einem Jahr löschen.
  - **Backups**: Wir führen regelmäßige Backups unserer Datenbank durch, um die betriebliche Integrität zu gewährleisten. Persönliche Daten in den Backups werden in Übereinstimmung mit der GDPR behandelt, wobei sichergestellt wird, dass sie ordnungsgemäß gesichert und in Übereinstimmung mit unserem Aufbewahrungsplan gelöscht werden.
  
  ### Datenlöschung:
  
  - **Benutzerantrag**: Benutzer können die Löschung ihrer Konten und der damit verbundenen Daten jederzeit über eine spezielle Option in ihren Kontoeinstellungen beantragen.
  - **Backup-Daten**: Wir bemühen uns zwar, persönliche Daten aus Sicherungskopien zu löschen, aber es gibt technische Einschränkungen. In Fällen, in denen eine Löschung aus Backups nicht möglich ist, stellen wir sicher, dass die Daten nicht in aktiven Datenbanken wiederhergestellt werden, sondern gemäß unserem Zeitplan für die Aufbewahrung von Backups gelöscht werden.
  
  Unsere Verfahren zur Datenaufbewahrung und -löschung werden regelmäßig überprüft, um die Einhaltung der GDPR und anderer relevanter Datenschutzbestimmungen zu gewährleisten.
  
  ## Änderungen und Aktualisierungen der Richtlinie
  
  Wir behalten uns vor, diese Datenschutzrichtlinie von Zeit zu Zeit zu aktualisieren, um Änderungen unserer Praktiken, unseres Serviceangebots oder unserer rechtlichen Anforderungen Rechnung zu tragen.
  
  ### Benachrichtigung über Änderungen:
  
  - **E-Mail-Benachrichtigungen**: Bei wesentlichen Änderungen unserer Datenschutzrichtlinien werden wir unsere Nutzer per E-Mail benachrichtigen. Auf diese Weise wird sichergestellt, dass alle Nutzer zeitnah informiert werden und die Änderungen überprüfen können.
  - **Website-Updates**: Darüber hinaus wird die neueste Version der Richtlinie immer auf unserer Website abrufbar sein.
  
  Wir empfehlen unseren Nutzern, die aktualisierte Richtlinie zu lesen, um über den Umgang mit ihren persönlichen Daten informiert zu bleiben. Unser Engagement für Transparenz und die Einhaltung der GDPR und anderer Datenschutzgesetze spiegelt sich in unserer Kommunikation über diese Änderungen wider.
  
  ## Kontaktinformationen
  
  Wenn Sie Fragen oder Bedenken bezüglich Ihrer persönlichen Daten, unserer Datenschutzpraktiken oder dieser Datenschutzrichtlinie haben, kontaktieren Sie uns bitte unter:
  
  E-Mail: ${organization.email}
  Telefon: ${organization.phone}
  
  Wir verpflichten uns, auf alle Anfragen oder Bedenken einzugehen, die Sie bezüglich Ihres Datenschutzes und unseres Umgangs mit persönlichen Daten haben.
  
  Ihre Privatsphäre ist für uns von größter Bedeutung, und wir sind hier, um sicherzustellen, dass Ihre Daten mit den höchsten Sicherheits- und Vertraulichkeitsstandards behandelt werden.
  `,
};
