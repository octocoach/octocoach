import { FileSchema } from "./schema";

export const data: FileSchema = {
  "0": {
    title: {
      de: "Antrag auf Trägerzulassung",
      en: "Application for education providers",
    },
    description: {
      de: "Antrag auf Trägerzulassung",
      en: "Application for education providers",
    },
    tips: [
      {
        text: {
          de: "Bitte den rechtsverbindlich unterschriebenen Antrag vollständig mit allen Anlagen als komprimierte und gezippte Datei per Mail an: fks@de.tuv.com senden.",
          en: "Please send the legally binding signed application in full with all attachments as a compressed and zipped file by mail to: fks@de.tuv.com.",
        },
      },
      {
        text: {
          de: "Das Mailsystem von TÜV Rheinland überträgt Mailanhänge bis zu einer Größe von 20 MB. Wenn größere Dateien übertragen werden sollen, kann das System TUVbox verwendet werden. Um das Konto zu aktivieren nehmen Sie bitte zu den angegebenen TÜV-Ansprechpartnern Kontakt auf.",
          en: "The TÜV Rheinland mail system transfers mail attachments up to a size of 20 MB. If larger files are to be transferred, the TUVbox system can be used. To activate the account, please contact the specified TÜV contact persons.",
        },
      },
    ],
  },
  "1": {
    title: { de: "Nachweis Firmierung", en: "Proof of company name" },
    description: { de: "Nachweis Firmierung", en: "Proof of company name" },
    legalBasis: [
      {
        text: "§ 178 (1) SGB II",
        href: "https://www.gesetze-im-internet.de/sgb_9_2018/__178.html",
      },
      {
        text: "§ 2 (1) AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
      {
        text: "Empfehlungen des Beirats nach § 182 SGB III",
        href: "https://www.arbeitsagentur.de/datei/dok_ba032840.pdf",
      },
    ],
    tips: [
      {
        text: {
          de: "Auszug aus Vereins- oder Handelsregister, nicht älter als 6 Monate",
          en: "Excerpt from the register of associations or commercial register, not older than 6 months",
        },
      },
      {
        text: {
          de: "Gesellschaftervertrag bei GbR",
          en: "Shareholders' agreement for GbR",
        },
      },
      {
        text: {
          de: "Inhabergeführte Unternehmen müssen den Namen im Firmennamen aufnehmen",
          en: "Owner-managed companies must include the name in the company name",
        },
      },
      {
        text: {
          de: "Im Registerauszug bzw. in der Gewerbeanmeldung muss sich der Geschäftszweck des Unternehmens eindeutig auf die Tätigkeit des Unternehmens z.B. Bildung, Ausbildung, Vermittlung, Werkstatt für Behinderte usw. beziehen",
          en: "In the extract from the register or in the business registration, the business purpose of the company must clearly refer to the activity of the company e.g. education, training, mediation, workshop for the disabled, etc.",
        },
      },
      {
        text: {
          de: "Unternehmen, deren Geschäftszweck überwiegend nicht in der Aus- und Weiterbildung zu sehen ist, müssen im Trägernamen einen Zusatz, z.B. „Ausbildungsabteilung“, „Abt. Fort- und Weiterbildung“ o.ä. enthalten",
          en: 'Companies whose business purpose is predominantly not to be seen in training and further education must include an addition in the carrier name, e.g. "Training department", "Dept. of further education and training" or similar.',
        },
      },
      {
        text: {
          de: "Gewerbeanmeldung nach § 14 GewO für den Fachbereich 2",
          en: "Business registration according to § 14 GewO for Subject Area 2",
        },
        subjectAreas: [2],
      },
    ],
  },
  "2": {
    title: { de: "Finanzielle Leistungsfähigkeit", en: "Financial Capacity" },
    description: {
      de: "Finanzielle Leistungsfähigkeit",
      en: "Financial Capacity",
    },
    legalBasis: [
      {
        text: "§ 178 (1) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (1)1 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
    ],
    tips: [
      {
        text: {
          de: "Testat eines Steuerberaters/Wirtschaftsprüfers _oder_",
          en: "Certificate of a tax advisor/auditor or",
        },
      },
      { text: { de: "Bilanzen oder", en: "Balance sheets or" } },
      { text: { de: "Bankauskunft oder", en: "Bank statement or" } },
      {
        text: {
          de: "Gewinn- und Verlustrechnung oder",
          en: "Profit / loss statement or",
        },
      },
      {
        text: {
          de: "Eingaben-Ausgabenrechnung oder",
          en: "Income and expenditure account or",
        },
      },
      {
        text: {
          de: "Controlling und Planungsunterlagen",
          en: "Controlling and planning documents",
        },
      },
      {
        text: {
          de: "Aktuell bzw. aus dem letzten Wirtschaftsjahr und vom Testierer unterschrieben",
          en: "Current or from the last business year and signed by the assessor",
        },
      },
      {
        text: {
          de: "kein selbsterstellter Beleg",
          en: "No self-created document",
        },
      },
      {
        text: {
          de: "Bestätigungsvermerk des Abschlussprüfers nach § 317 HGB reicht nicht aus",
          en: "Auditor's report pursuant to Section 317 HGB not sufficient",
        },
      },
      {
        text: {
          de: "Bei Neuzulassungen (Zertifizierungsaudit) kann ggf. ein Businessplan eingereicht werden",
          en: "For new approvals (certification audit), a business plan can be submitted if necessary",
        },
      },
      {
        text: {
          de: "Erklärung und rechtsverbindliche Unterschrift des Antragstellers über Insolvenzverfahren (siehe Antrag)",
          en: "Declaration and legally binding signature of the applicant on insolvency proceedings (see application)",
        },
      },
    ],
  },
  "3": {
    title: { de: "Bescheinigung in Steuersachen", en: "Tax Certificate" },
    description: { de: "Bescheinigung in Steuersachen", en: "Tax Certificate" },
    legalBasis: [
      {
        text: "§ 178 SGB (1) III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (1)1 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
    ],
    tips: [
      {
        text: {
          de: "Aktuelle Bescheinigung des Finanzamtes in Steuersachen (nicht älter als 3 Monate)",
          en: "Current tax certificate from the tax office (not older than 3 months)",
        },
      },
      {
        text: {
          de: "Anlage zum Bescheid zur Körperschaftssteuer ist keine Bescheinigung in Steuersachen!",
          en: "Annex to the notice of corporate income tax is not a tax certificate!",
        },
      },
    ],
  },
  "4": {
    title: {
      de: "Betriebshaftpflichtversicherung",
      en: "Public Liability Insurance",
    },
    description: {
      de: "Betriebshaftpflichtversicherung",
      en: "Public Liability Insurance",
    },
    legalBasis: [
      {
        text: "§ 178 (1) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (1)1AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
    ],
    tips: [
      {
        text: {
          de: "Eine gewerbliche Tätigkeit ist grundsätzlich mit Risiken verbunden. Schadensersatzansprüche von Dritten sind trotz größter Sorgfalt nicht auszuschließen.",
          en: "A commercial activity is always associated with risks. Claims for damages from third parties cannot be ruled out despite the greatest care.",
        },
      },
      {
        text: {
          de: "Für Schäden, die durch das Unternehmen oder die Mitarbeiter bei der Ausübung ihrer beruflichen Tätigkeit verursacht worden sind sowie Schäden aus Grund- und Gebäudeeigentum bzw. -besitz haftet in jedem Fall die Firma. Um das Risiko unternehmerisch kalkulierbar zu machen und die finanzielle Leistungsfähigkeit nicht zu beeinträchtigen, muss eine Betriebshaftpflichtversicherung nachgewiesen werden.",
          en: "In any case, the company is liable for damages caused by the company or its employees in the course of their professional activities, as well as damages arising from land and building property or possessions. In order to make the risk calculable from an entrepreneurial point of view and not to impair the financial performance, proof of business liability insurance must be provided.",
        },
      },
    ],
  },
  "5": {
    title: {
      de: "Bescheinigung Berufsgenossenschaft",
      en: "Accident Prevention and Insurance Association Certificate",
    },
    description: {
      de: "Bescheinigung Berufsgenossenschaft",
      en: "Accident Prevention and Insurance Association Certificate",
    },
    legalBasis: [
      {
        text: "§ 178 (1) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (1) 1 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
      {
        text: "§ 2 Abs. 1 Nr. 2 SGB VII",
        href: "https://www.gesetze-im-internet.de/sgb_7/__2.html",
      },
    ],
    tips: [
      {
        text: {
          de: "Unternehmen aller Art müssen sich binnen einer Woche nach Gründung bei einer Berufsgenossenschaft anmelden.",
          en: "Companies of all types must register with a professional association within one week of their establishment.",
        },
      },
      {
        text: {
          de: "Bei überbetrieblichen Weiterbildungsmaßnahmen, die von einem Bildungsträger (mit oder ohne betriebliches Praktikum) durchgeführt werden, besteht Versicherungsschutz nach § 2 Abs. 1 Nr. 2 SGB VII; zuständig für den Unfallversicherungsschutz ist grundsätzlich für die gesamte Maßnahme (einschließlich betrieblicher Praktika) der für den Bildungsträger zuständige Unfallversicherungsträger.",
          en: "In the case of inter-company training measures carried out by an educational institution (with or without an in-company internship), insurance cover is provided in accordance with Section 2 (1) No. 2 SGB VII; the accident insurance institution responsible for the educational institution is generally responsible for accident insurance cover for the entire measure (including in-company internships).",
        },
      },
      {
        text: {
          de: "Siehe Merkblatt für Bildungseinrichtungen und Maßnahmeträger zur unfallversicherungsrechtlichen Zuständigkeit für Teilnehmerinnen und Teilnehmer an beruflichen und arbeitsmarktpolitischen Maßnahmen.",
          en: "See the information sheet for educational institutions and measure providers on accident insurance responsibility for participants in vocational and labor market measures.",
        },
      },
    ],
  },
  "6": {
    title: {
      de: "Zulassungen und Anerkennungen",
      en: "Approvals and Recognitions",
    },
    description: {
      de: "Zulassungen und Anerkennungen",
      en: "Approvals and Recognitions",
    },
    legalBasis: [
      {
        text: "§ 179 Abs. 1 Nr. 1 SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__179.html",
      },
      {
        text: "§ 3 Abs. 5 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__3.html",
      },
    ],
    tips: [
      {
        text: {
          de: "Zertifikate anderer Zertifizierungsstellen (AZAV, ISO)",
          en: "Certificates from other certification bodies (AZAV, ISO)",
        },
      },
      {
        text: {
          de: "Anerkennung Dritter (staatliche Anerkennungen, z.B. als Ersatzschule)",
          en: "Third-party recognition (state recognition, e.g. as an alternative school)",
        },
      },
      {
        text: {
          de: "Zulassung als Fahrschule",
          en: "Approval as a driving school",
        },
      },
      {
        text: {
          de: "Leistungsbeschreibungen bzw. Verträge über Maßnahmen im Fachbereich 3 (§§ 48-80 SGB III)",
          en: "Service descriptions or contracts for measures in Subject Area 3 (§§ 48-80 SGB III)",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Nachweis über die Einrichtungen der beruflichen Rehabilitation, z.B. Berufsförderungswerke, Berufsbildungswerke und vergleichbare Einrichtungen nach § 51 SGB IX, Werkstätten für Behinderte nach § 227 SGB IX",
          en: "Proof of vocational rehabilitation facilities, e.g. vocational promotion centers, vocational training centers and comparable facilities according to § 51 SGB IX, workshops for the disabled according to § 227 SGB IX",
        },
      },
      {
        text: {
          de: "Leistungsbeschreibungen bzw. Verträge über besondere Leistungen nach § 117 SGB III (Produktvarianten im Fachbereich 6, z.B. BvB-Reha, bbA, InRAM, bbA, bbUReha, UB, DIA- AM/UB)",
          en: "Service descriptions or contracts for special services according to § 117 SGB III (product variants in department 6, e.g. BvB-Reha, bbA, InRAM, bbA, bbUReha, UB, DIA- AM/UB)",
        },
      },
      {
        text: {
          de: "Anerkennung als Träger der freien Jugendhilfe gemäß § 75 SGB VIII",
          en: "Recognition as an independent youth welfare organization in accordance with § 75 SGB VIII",
        },
      },
      {
        text: {
          de: "Bestätigtes Fachkonzept für Eingangsverfahren/Berufsbildungsbereich (§ 57 SGB IX) oder Fachkonzept für Eingangsverfahren/ Berufsbildungsbereich bei anderen Leistungsanbietern nach § 60 SGB IX",
          en: "Confirmed specialist concept for entry procedure/vocational training area (§ 57 SGB IX) or specialist concept for entry procedure/vocational training area at other service providers in accordance with § 60 SGB IX",
        },
      },
      {
        text: {
          de: "Die Anerkennungen müssen auf den Rechtsträger ausgestellt sein",
          en: "The recognitions must be issued to the legal entity",
        },
      },
    ],
  },
  "7": {
    title: { de: "Organigramm", en: "Organizational Chart" },
    description: { de: "Organigramm", en: "Organizational Chart" },
    legalBasis: [
      {
        text: "§ 178 (1) SGB II",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (1) 2 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
    ],
    tips: [
      {
        text: {
          de: "Aufbau- und Ablauforganisation, aktuelles und gültiges Organigramm",
          en: "Structural and procedural organization, current and valid organization chart",
        },
      },
    ],
  },
  "8": {
    title: { de: "Prozessübersicht", en: "Process Overview" },
    description: { de: "Prozessübersicht", en: "Process Overview" },
    legalBasis: [
      {
        text: "§ 178 (1) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (1) 2 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
    ],
    tips: [
      {
        text: {
          de: "Bezogen auf die Tätigkeiten und die (beantragten) Fachbereiche des Trägers",
          en: "Related to the activities and the (requested) subject areas of the institution",
        },
      },
    ],
  },
  "9": {
    title: { de: "Infrastruktur", en: "Infrastructure" },
    description: { de: "Infrastruktur", en: "Infrastructure" },
    legalBasis: [
      {
        text: "§ 178 (1) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (1) 3 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
    ],
    tips: [
      {
        text: {
          de: "Mietverträge, Raumpläne, Grundrisszeichnungen werden im Auditverfahren vor Ort geprüft",
          en: "Lease agreements, room plans, floor plan drawings are checked on site during the audit process",
        },
      },
      {
        text: {
          de: "In den Mietverträgen muss der Nutzungszweck, Büro- und Schulungsräume bzw. Ausbildungswerkstätten enthalten sein.",
          en: "Lease agreements must include the purpose of use, office and training rooms or training workshops.",
        },
      },
      {
        text: {
          de: "Die Standorte des Trägers werden ortsbezogen und bezogen auf den jeweiligen Fachbereich zugelassen",
          en: "The carrier's locations are approved on a site-by-site basis and in relation to the respective subject area",
        },
      },
      {
        text: {
          de: "Bei der Zulassung der Standorte für bestimmte Fachbereiche sind die, für das Schulungsziel und die Inhalte notwendigen räumlichen und technischen Ausstattungen nachzuweisen.",
          en: "When approving locations for specific subject areas, proof must be provided of the spatial and technical equipment required for the training objective and content.",
        },
      },
      {
        text: {
          de: "Die Standorte müssen die Vorgaben der AZAV hinsichtlich Größe, Ausstattung, Arbeitssicherheit, Gesundheitsschutz einhalten",
          en: "The locations must comply with the AZAV specifications in terms of size, equipment, occupational safety, health protection",
        },
      },
      {
        text: {
          de: "Die Vorgaben der ArbeitsstättenVO in der jeweils gültigen Fassung in Verbindung mit den Arbeitsstättenrichtlinien, die BildschirmarbeitsVO in ihrer aktuellen Fassung und die Vorschriften der zuständigen Unfallversicherung (Berufsgenossenschaften) sind bei der Auswahl und Nutzung der Standorte einzubeziehen und zu überprüfen",
          en: "The specifications of the Workplace Ordinance (ArbeitsstättenVO) in the currently valid version in conjunction with the Workplace Guidelines, the Display Screen Equipment Ordinance (BildschirmarbeitsVO) in its current version and the regulations of the responsible accident insurance (employers' liability insurance associations) are to be included and reviewed when selecting and using the locations",
        },
      },
      {
        text: {
          de: "Temporäre Standorte können bis maximal zum nächsten Überwachungsaudit zugelassen werden. Es erfolgt eine Dokumentenprüfung im Offsite-Verfahren",
          en: "Temporary sites can be approved up to a maximum of the next surveillance audit. A document check takes place in the offsite procedure",
        },
      },
      {
        text: {
          de: "Schulungsraum mit mindestens 12 TN-Plätzen, Büro, Beratungsraum, Pausen-(Sozialraum), Werkstätten bei fachpraktischer Weiterbildung",
          en: "Training room with at least 12 places for participants, office, consultation room, break (social) room, workshops in the case of practical further training",
        },
        subjectAreas: [1, 5, 6],
      },
      {
        text: {
          de: "Bei Maßnahmen mit Einzelcoaching reicht ein Büro- und Beratungsraum aus",
          en: "Bei Maßnahmen mit Einzelcoaching reicht ein Büro- und Beratungsraum aus",
        },
        subjectAreas: [1, 4, 5, 6],
      },
      {
        text: {
          de: "Büro- und Beratungsraum",
          en: "Office and consulting room",
        },
        subjectAreas: [2, 5],
      },
      {
        text: {
          de: "Die konkreten Anforderungen an die Infrastruktur sind abhängig von der jeweiligen Maßnahme zugrunde liegenden Leistungsbeschreibung. Z.B für abH, BvB sowie BaE integrativ sind umfangreiche Raumkapazitäten erforderlich, für BvB integrativ und BaE integrativ müssen zusätzliche Räume für die Fachpraxis „Werkstätten“ nachgewiesen werden. AbH benötigt üblicherweise mehrere (kleinere) Unterrichtsräume, um verschiedene Gruppenzeitgleich zu unterrichten",
          en: 'The specific infrastructure requirements depend on the service description on which the respective measure is based. For example, for abH, BvB and BaE integrative, extensive room capacities are required, for BvB integrative and BaE integrative, additional rooms for the specialized practice "workshops" must be provided. AbH usually requires several (smaller) classrooms in order to teach different groups at the same time.',
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Schulungsraum mit mindestens 12 TN-Plätzen, Büro, Beratungsraum, Pausen-(Sozialraum), Werkstätten bei fachpraktischer Weiterbildung",
          en: "Training room with at least 12 places for participants, office, consultation room, break (social) room, workshops in the case of practical further training",
        },
        subjectAreas: [4, 5, 6],
      },
      {
        text: {
          de: "Eine dem Leistungsangebot entsprechende räumliche und sächliche Ausstattung (Werkstätten) einschließlich Sozial-, Umkleide- und Sanitärräume",
          en: "Spatial and material equipment (workshops) corresponding to the range of services, including social, changing and sanitary rooms.",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Barrierefreiheit im Sinne des § 4 BGG unter besonderer Berücksichtigung möglicher Spezialisierung auf bestimmte Arten von Behinderung ist grundsätzlich sicherzustellen",
          en: "Accessibility in the sense of § 4 BGG with special consideration of possible specialization on certain types of disability is to be ensured in principle",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Werden Leistungen nach § 33 Abs. 3 Nr. 3 und 4 SGB IX angeboten, muss die räumliche und sächliche Ausstattung den einschlägigen Ausbildungsregelungen in besonderer Weise Rechnung tragen",
          en: "If services are offered in accordance with § 33 para. 3 nos. 3 and 4 SGB IX, the spatial and material equipment must take particular account of the relevant training regulations",
        },
        subjectAreas: [6],
      },
    ],
  },
  "10": {
    title: { de: "Personal", en: "Human Resources" },
    description: { de: "Personal", en: "Human Resources" },
    legalBasis: [
      {
        text: "§ 178 (3) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (3) 1 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
    ],
    tips: [
      {
        text: {
          de: "Personal, welches in den einzelnen Fachbereichen (1 bis 6) eingesetzt wird, wie z.B. Lehrkräfte, Ausbilder, Sozialpädagogen, Sozialarbeiter, Coaches, Arbeitsvermittler, Personal in Reha- Einrichtungen, Integrationsfachkräfte usw.",
          en: "Personnel employed in the individual departments (1 to 6), such as teachers, trainers, social pedagogues, social workers, coaches, employment agents, personnel in rehabilitation facilities, integration specialists, etc.",
        },
      },
      {
        text: {
          de: "In der Anlage Personal (Lehr-/Fachkräfte, Arbeitsvermittler, Sozial-/Pädagogen) sind Angaben zu den in dem jeweiligen Arbeitsgebiet (Fachbereiche) eingesetzten Personal zu machen.",
          en: "In the annex personnel (teaching/professional staff, employment mediators, social/educational staff), information on the personnel employed in the respective field of work (subject areas) must be provided.",
        },
      },
      {
        text: {
          de: "Angaben zum Leitungspersonal (Unternehmensleitung, Stellvertreter) sind im Trägerantrag vorzunehmen",
          en: "The application must include information about the management of the company (head, deputies).",
        },
      },
      {
        text: {
          de: "Die Nachweise der Ausbildung und Berufserfahrung des Leiters und des Personals durch Ausbildung, Zeugnisse, Zusatzqualifikationen, beruflichen Werdegang, zweijährige Erfahrung in der Erwachsenenbildung werden im Auditverfahren eingesehen. Die Zusendung mit dem Trägerantrag ist nicht erforderlich",
          en: "Evidence of education and professional experience of the director and staff through education, certificates, additional qualifications, professional career, two-year experience in adult education will be seen in the audit procedure. It is not necessary to send them together with the application.",
        },
      },
      {
        text: {
          de: "Fachliche und pädagogische Eignung des Leiters, der Lehr- und Fachkräfte,",
          en: "Professional and pedagogical suitability of the director, teachers and professional staff,",
        },
        subjectAreas: [1, 3, 4],
      },
      {
        text: {
          de: "Nachweis der pädagogischen Eignung durch Meisterprüfung, Ausbildereignung (AdA) oder",
          en: "Proof of pedagogical aptitude through master's examination, instructor aptitude (AdA) or",
        },
        subjectAreas: [1, 3, 4],
      },
      {
        text: {
          de: "Pädagogische Ergänzungsstudiengänge im Bereich beruflicher Erwachsenenbildung oder",
          en: "Additional pedagogical training in adult vocational education; or",
        },
        subjectAreas: [1, 3, 4],
      },
      {
        text: {
          de: "Vergleichbare Zusatzqualifikationen",
          en: "Comparable additional qualifications",
        },
        subjectAreas: [1],
      },
      {
        text: {
          de: "Anerkennung der fachlichen und pädagogischen Eignung durch Dritte (z.B. durch landesrechtliche Regelungen, durch eine zuständige Aufsichtsbehörde, usw.)",
          en: "Recognition of professional and pedagogical qualifications by third parties (e.g. by state regulations, a competent supervisory authority, etc.)",
        },
        subjectAreas: [1, 3, 4],
      },
      {
        text: {
          de: "Nachweis von mindestens 2 Jahren Erfahrungen in der beruflichen Bildung, nach Möglichkeit in der Erwachsenenbildung",
          en: "Evidence of at least 2 years' experience in vocational education, preferably in adult education.",
        },
        subjectAreas: [1, 3, 4],
      },
      {
        text: {
          de: "Bei weniger als 2 Jahren Erfahrungen in der beruflichen Bildung muss der Nachweis eines betreuten Coachings bzw. durch Anleiten durch eine erfahrene Lehr- und Fachkraft in der Erwachsenenbildung erbracht werden.",
          en: "If less than 2 years of experience in vocational education, evidence of supervised coaching or instruction by an experienced adult education teacher or professional must be provided.",
        },
        subjectAreas: [1, 3, 4],
      },
      {
        text: {
          de: "Darlegung über den tatsächlichen Einsatz in der Bildungseinrichtung (ausgewogenes Verhältnis zwischen angestellten und externen Lehr- und Fachkräften)",
          en: "Presentation of the actual deployment in the educational institution (balanced ratio of employed and external faculty and technical staff)",
        },
        subjectAreas: [1, 3, 4],
      },
      {
        text: {
          de: "Fachlich qualifiziertes und in der Förderung bzw. Qualifizierung junger Menschen erfahrenes",
          en: "Professionally qualified and experienced in the development and qualification of young people.",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Fachpersonal, z.B. Fachleute mit Berufserfahrung, Ausbilder/-innen, Lehrer/-innen, sozialpädagogische und sonderpädagogische Fachkräfte, bzw. Fachkräfte mit Erfahrungsvielfalt und Doppel- bzw. Mehrfachqualifikationen (z.B. Ausbilder mit sonderpädagogischer Zusatzqualifikation)",
          en: "Specialized personnel, e.g. experts with professional experience, trainers, teachers, social pedagogical and special pedagogical specialists, or specialists with different experience and double or multiple qualifications (e.g. trainers with additional special pedagogical qualification).",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Insbesondere im Fachbereich 3 variieren die Anforderungen an das Personal erheblich. Diese sind, je nach durchgeführter Leistung eindeutig nur aus der Leistungsbeschreibung des öffentlichen Vergabeverfahrens Teil B zu entnehmen. In der Regel sind feste Personalschlüssel für die unterschiedlichen Professionen vorgegeben. Gleiches gilt für die zu erfüllenden Qualifikationen des eingesetzten Personals (akzeptierte Abschlüsse sowie ersatzweise akzeptierte Qualifikationen).",
          en: "Particularly in Department 3, the requirements for personnel vary considerably. Depending on the service to be provided, these can only be clearly derived from the service description of the public procurement procedure Part B. As a rule, fixed personnel keys are specified for the various professions. The same applies to the qualifications to be met by the staff (recognised diplomas and qualifications accepted as substitutes).",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Der Träger (die Einrichtung) verfügt - ausgerichtet an den besonderen Anforderungen - über qualifiziertes, in der Rehabilitation und Teilhabe erfahrenes Fachpersonal",
          en: "The institution (provider) has qualified staff with experience in rehabilitation and participation, according to the specific needs.",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Die Nachweise hierfür erfolgen über Schul-, Hochschul- und Ausbildungsabschlüsse einschließlich Nachweis nicht formal erworbener Qualifikationen und besuchter Weiterbildungen",
          en: "Evidence of this will be provided in the form of school, university and training qualifications, including evidence of non-formal qualifications and training undertaken.",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Näheres zu dem Personaleinsatz von Ausbildern, Sozialpädagogen, Lehrkräften und Psychologen sind dem Fachkonzept für Einrichtungen nach § 51 SGB IX zu entnehmen",
          en: "More details on the use of trainers, social pedagogues, teachers and psychologists can be found in the professional concept for institutions according to § 51 SGB IX.",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Für den Personalansatz von Ausbildern, Sozialpädagogen, Lehrkräften, und Psychologen gelten als Mindeststandard die Vorgaben zum Personalschlüssel in Leistungsbeschreibungen vergleichbarer Maßnahmen",
          en: "For the personnel approach of trainers, social pedagogues, teachers and psychologists, the specifications for the personnel key in the performance descriptions of comparable measures apply as a minimum standard.",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Für Ärzte und Psychologen gilt ein an den vorherrschenden Behinderungsarten orientierter Personalschlüssel",
          en: "Physician and psychologist staffing ratios are based on predominant types of disabilities.",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Rehabilitationspädagogische Zusatzqualifikation (ReZA) für Ausbildungsregelungen für behinderte Menschen",
          en: "Rehabilitation Pedagogical Additional Qualification (ReZA) for Training Regulations for People with Disabilities",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Personalschlüssel nach Werkstattverordnung (WVO)",
          en: "Personnel key according to Workshop Ordinance (WVO)",
        },
        subjectAreas: [6],
      },
    ],
  },
  "11": {
    title: {
      de: "Unternehmensprofil / Leitbild",
      en: "Company Profile / Mission Statement",
    },
    description: {
      de: "Unternehmensprofil / Leitbild",
      en: "Company Profile / Mission Statement",
    },
    legalBasis: [
      {
        text: "§ 178 (4) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (4) 1 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
      {
        text: "Empfehlungen des Beirats nach § 182 SGB III, Punkt 1",
        href: "https://www.arbeitsagentur.de/datei/dok_ba032840.pdf",
      },
    ],
    tips: [
      {
        text: {
          de: "Unternehmensprofil des Trägers",
          en: "Company profile of the institution",
        },
      },
      {
        text: {
          de: "Definition der „Kunden“ des Trägers und Nachweis, dass auf die Erwartungen der Kunden eingegangen und dies in den Prozess der kontinuierlichen Verbesserung integriert wird",
          en: 'Define the institution\'s "customers" and demonstrate that customer expectations are being met and integrated into the continuous improvement process.',
        },
      },
      {
        text: {
          de: "Ausrichtung des Leitbildes am Ausbildungs- und Arbeitsmarkt",
          en: "Aligning the mission statement with the education and labor market",
        },
      },
      {
        text: {
          de: "in- und extern kommuniziertes Leitbild, welches regelmäßig überprüft und bei Bedarf angepasst wird",
          en: "Internally and externally communicated mission statement that is regularly reviewed and adjusted as necessary",
        },
      },
    ],
  },
  "12": {
    title: { de: "Unternehmensorganisation", en: "Company Organization" },
    description: { de: "Unternehmensorganisation", en: "Company Organization" },
    legalBasis: [
      {
        text: "§ 178 (4) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (4) 2 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
      {
        text: "Empfehlungen des Beirats nach § 182 SGB III, Punkt 2",
        href: "https://www.arbeitsagentur.de/datei/dok_ba032840.pdf",
      },
    ],
    tips: [
      {
        text: {
          de: "Aufbau- und Ablauforganisation (siehe Punkt 07 und 08)",
          en: "Structure and process organization (see items 07 and 08)",
        },
      },
      { text: { de: "Unternehmensziele", en: "Company Goals" } },
      {
        text: {
          de: "Fachbereichsbezogene (FB 1 - FB 6) operationalisierbare Ziele",
          en: "Subject Area (SA 1 - SA 6) operational targets",
        },
      },
      {
        text: {
          de: "Verfahren zur Festlegung und Überprüfung der Unternehmenspolitik, -ziele (internes Audit)",
          en: "Procedures for establishing and reviewing corporate policies and objectives (internal audit)",
        },
      },
      {
        text: {
          de: "Die Aufbauorganisation wird unter Pkt 07 Organigramm dargestellt. Hier ist der Schwerpunkt auf die Verfahren der Festlegung der Qualitätspolitik und Qualitätsziele zu legen",
          en: "The organizational structure is presented in point 07 Organizational Chart. The focus here is on the procedures for defining the quality policy and quality objectives.",
        },
      },
    ],
  },
  "13": {
    title: {
      de: "Qualifizierung und Fortbildung Personal",
      en: "Staff qualification and further training",
    },
    description: {
      de: "Qualifizierung und Fortbildung Personal",
      en: "Staff qualification and further training",
    },
    legalBasis: [
      {
        text: "§ 178 (4) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2(3) 1-3 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
      {
        text: "Empfehlungen des Beirats nach § 182 SGB III, Punkt 3",
        href: "https://www.arbeitsagentur.de/datei/dok_ba032840.pdf",
      },
    ],
    tips: [
      {
        text: {
          de: "Konzept Personalentwicklung inkl. Fort- und Weiterbildung und Personalpolitik",
          en: "Personnel development concept including training and personnel policy",
        },
      },
      {
        text: {
          de: "Ermittlung des Schulungsbedarfs des Personals",
          en: "Identifying employee training needs",
        },
      },
      {
        text: {
          de: "Beurteilung der Wirksamkeit der Schulungen (Erfolg)",
          en: "Evaluation of training effectiveness (success)",
        },
      },
      {
        text: {
          de: "Planung regelmäßiger Teambesprechungen",
          en: "Planning of regular team meetings",
        },
      },
    ],
  },
  "14": {
    title: {
      de: "Zielvereinbarungen und Kennzahlen",
      en: "Agreed goals and metrics",
    },
    description: {
      de: "Zielvereinbarungen und Kennzahlen",
      en: "Agreed goals and metrics",
    },
    legalBasis: [
      {
        text: "§ 178 (4) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (4) AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
      {
        text: "Empfehlungen des Beirats nach § 182 SGB III, Punkt 4",
        href: "https://www.arbeitsagentur.de/datei/dok_ba032840.pdf",
      },
    ],
    tips: [
      {
        text: {
          de: "Aktuelle und messbare Unternehmens- und Qualitätsziele",
          en: "Current and measurable organizational and quality goals",
        },
      },
      {
        text: {
          de: "Regelmäßige Überprüfung der Zielerreichung (Management-Review)",
          en: "Regular review of goal achievement (management review)",
        },
      },
      {
        text: {
          de: "Weiterentwicklung der Ziele und Korrekturmaßnahmen",
          en: "Further development of the goals and corrective measures",
        },
      },
    ],
  },
  "15": {
    title: {
      de: "Konzeption und Durchführung von Maßnahmen",
      en: "Design and delivery of training",
    },
    description: {
      de: "Konzeption und Durchführung von Maßnahmen",
      en: "Design and delivery of training",
    },
    legalBasis: [
      {
        text: "§ 178 (4) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (4) 5 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
      {
        text: "Empfehlungen des Beirats nach § 182 SGB III, Punkt 5",
        href: "https://www.arbeitsagentur.de/datei/dok_ba032840.pdf",
      },
    ],
    tips: [
      { text: { de: "Arbeitsmarktanalyse", en: "Labor Market Analysis" } },
      {
        text: {
          de: "Berücksichtigung der arbeitsmarktlichen Entwicklung bei der Konzeption und Durchführung von Maßnahmen der Arbeitsförderung",
          en: "Taking into account labor market developments in the design and implementation of employment policies",
        },
      },
      {
        text: {
          de: "Aktuelle und systematische Analyse der kundenrelevanten Bedarfe in Bezug auf die Zielsetzung der Maßnahme",
          en: "Up-to-date and systematic analysis of customer needs in relation to the objective of the measure",
        },
      },
      {
        text: {
          de: "Bedarfsanalyse (Bedürfnisse der Zielgruppe sowie Berücksichtigung der Angebote Dritter sowie der Schularten)",
          en: "Needs analysis (needs of the target group as well as consideration of third-party offerings and types of schools)",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Transparenz über die Angebote in der Region",
          en: "Transparency about what is available in the region",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Zielrichtung der Maßnahmen korrespondierend mit der Zielstellung der BA / Berufsberatung",
          en: "Aim of the measures according to the aim of the BA/Career Counseling",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Inhaltliche Anforderungen richten sich schwerpunktmäßig nach Berufsorientierung, Informationen über Berufe, Feststellung berufsrelevanter Neigungen und Kompetenzen, Unterstützung der Schüler bei der Wahl des Berufes",
          en: "Content requirements focus on career orientation, information about careers, identification of career-related skills and competencies, and helping students make career choices.",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Berücksichtigung sowohl der konkreten Bedarfe der Teilnehmenden (z.B. Erweiterung des Berufswahlspektrums) als auch Entwicklungen bei der Nachfrage auf dem Ausbildungs- und Arbeitsmarkt (z. B. MINT-Berufe)",
          en: "Addressing both the specific needs of participants (e.g., broadening the range of career choices) and trends in training and labor market demand (e.g., STEM occupations).",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Bedarfs- und Zielgruppenorientierung (Schulart, Schülerzusammensetzung nach Geschlecht, Migrantenanteil, Milieu, regionaler Marktsituation u.ä., z.B. junge Menschen mit vieulfältigen und schwerwiegenden Hemmnissen, usw.)",
          en: "Needs and target group orientation (type of school, gender composition of students, proportion of migrants, milieu, regional market situation, etc., e.g. young people with multiple and severe barriers, etc.)",
        },
        subjectAreas: [3],
      },
    ],
  },
  "16": {
    title: {
      de: "Entwicklungs-, Eingliederungs-, Lernprozesse",
      en: "Development, Inclusion, Learning",
    },
    description: {
      de: "Entwicklungs-, Eingliederungs-, Lernprozesse",
      en: "Development, Inclusion, Learning",
    },
    legalBasis: [
      {
        text: "§ 178 (4) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (6) AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
      {
        text: "Empfehlungen des Beirats nach § 182 SGB III, Punkt 6",
        href: "https://www.arbeitsagentur.de/datei/dok_ba032840.pdf",
      },
    ],
    tips: [
      {
        text: {
          de: "Verfahren zur Eignungsfeststellung - Der Träger muss vor Beginn von Maßnahmen gemäß AZAV neben den fachlichen auch die persönliche Eignung der Teilnehmenden erheben und auswerten. Die persönliche Eignung ist hinsichtlich der Integrationschancen auf dem ersten Arbeitsmarkt während des Aufnahmegesprächs zu eruieren. In der abschließend ausformulierten Einschätzung sind unter anderem Aspekte wie berufliche, zeitliche und regionale Mobilität, die familiäre Situation sowie die Gehaltsvorstellungen einzubeziehen. Sollten in der Eignungsfeststellung Defizite in der persönlichen Eignung auftreten (z.B. Deutsch in Wort und Schrift, körperliche Einschränkungen), sind diese zunächst zu bewerten und in der Folge Strategien zur Anpassung in die abschließende Auswertung der Eignungsfeststellung einzubeziehen.",
          en: "Aptitude Determination Procedure - Prior to commencing AZAV measures, the provider must assess and evaluate the personal aptitude of participants in addition to their professional aptitude. Personal aptitude must be determined during the intake interview with regard to integration opportunities in the primary labor market. The final assessment must include aspects such as occupational, temporal and regional mobility, family situation and salary expectations. If the aptitude assessment reveals deficits in personal aptitude (e.g. written and spoken German, physical limitations), these must first be evaluated and then strategies for adaptation must be included in the final evaluation of the aptitude assessment.",
        },
        subjectAreas: [1, 4],
      },
      {
        text: {
          de: "Verfahren zur Herleitung von Entwicklungs-, Eingliederungs-, Lehr- und Lernzielen",
          en: "Procedures for deriving developmental, inclusion, teaching, and learning goals.",
        },
        subjectAreas: [1, 4],
      },
      {
        text: {
          de: "Verfahren zur Konzeption der Maßnahmeangebote des Trägers unter Berücksichtigung der individuellen Voraussetzungen der Teilnehmer",
          en: "Procedures for designing the institution's course offerings, taking into account the individual needs of participants",
        },
        subjectAreas: [1, 4],
      },
      {
        text: { de: "Methodeneinsatz", en: "Use of methods" },
        subjectAreas: [1, 4],
      },
      {
        text: {
          de: "Überwachung von Lernprozessen",
          en: "Learning process monitoring",
        },
        subjectAreas: [1, 4],
      },
      {
        text: {
          de: "Erfassung von Teilnehmerpräsenz und Abbruchquoten (Fehlzeitenkonzept)",
          en: "Tracking attendance and dropout rates (absenteeism)",
        },
        subjectAreas: [1, 4],
      },
      {
        text: {
          de: "Erfassung der Erreichung von Entwicklungs-, Eingliederungs-bzw. Lehrgangszielen",
          en: "Track achievement of development, integration, and training goals.",
        },
        subjectAreas: [1, 4],
      },
      {
        text: {
          de: "Integrationsunterstützung durch Einführung in die Möglichkeiten und Funktionalitäten der Jobbörse und Einstellen der Bewerberprofile in die Jobbörse",
          en: "Integration support by introducing the features and functionalities of the job board and posting candidate profiles on the job board.",
        },
        subjectAreas: [1, 4],
      },
      {
        text: {
          de: "Fehlzeitenkonzept (Auskunftspflicht nach § 318 Abs. 2 S. 2 Nr. 2 SGB III sowie Regelungen zur Zusammenarbeit mit den Agenturen für Arbeit und Jobcentern)",
          en: "Concept of absenteeism (obligation to provide information according to § 318 (2) Sentence 2 No. 2 SGB III and regulations on cooperation with the employment agency and job center)",
        },
        subjectAreas: [1, 4],
      },
      {
        text: {
          de: "Verfahren zum Profiling, Assessment",
          en: "Profiling, Assessment Procedures",
        },
        subjectAreas: [2],
      },
      {
        text: {
          de: "Verfahren zur Aufarbeitung von Bewerbungsunterlagen, Bewerbungstraining",
          en: "Procedures for preparing application materials, application training",
        },
        subjectAreas: [2],
      },
      {
        text: {
          de: "Verfahren zur Feststellung ergänzender Weiterbildungsbedarfe",
          en: "Procedure for identifying additional training needs",
        },
        subjectAreas: [2],
      },
      {
        text: {
          de: "Methoden zur Förderung der Eigeninitiative und Aktivität (z.B. Projektaufgaben, Terminvorgaben)",
          en: "Methods to encourage personal initiative and activity (e.g., project assignments, deadlines)",
        },
        subjectAreas: [2],
      },
      {
        text: {
          de: "Verfahren des Vermittlungsprozesses: Vermittlungsplan, Aktivitätenplan mit Nachweisführung, Kennzahlen (z.B. zu Kontakten)",
          en: "Procedures of the mediation process: mediation plan, activity plan with record keeping, key figures (e.g. on contacts)",
        },
        subjectAreas: [2],
      },
      {
        text: {
          de: "Dokumentation der Auftragsabwicklung / Kaufmännische Auftragsbearbeitung - und Abwicklung.",
          en: "Documentation of order processing / commercial order processing - and settlement.",
        },
        subjectAreas: [2],
      },
      {
        text: {
          de: "Meldungen an BA, FKS, VerBIS u.a.",
          en: "Reports to BA, FKS, VerBIS etc.",
        },
        subjectAreas: [2],
      },
      {
        text: { de: "Fristeinhaltung", en: "Fristeinhaltung" },
        subjectAreas: [2],
      },
      {
        text: {
          de: "Anknüpfen an die Lebens- und Erfahrungswelt der Schüler / Zielgruppenorientierung",
          en: "Connecting to students' lives and experiences/Target audience",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Prozessorientierung und konzeptionelle Gestaltung (Gesamtkonzept des Trägers, inkl. Kostenregelung/Finanzierung/Kostenkalkulation/Preis) Aufbau und Abfolge von Modulen, Die organisatorische und inhaltliche Ausgestaltung sowie die Aufgaben aller an der Umsetzung",
          en: "Process orientation and conceptual design (overall concept of the institution, including cost regulation/financing/cost calculation/pricing), structure and sequence of modules, organizational and content-related design as well as the tasks of all parties involved in the implementation.",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Beteiligten und deren Interaktionen (z. B. in Leitfäden, Förderbausteine, Vergabeunterlagen) sind zu beschreiben",
          en: "Describe stakeholders and their interactions (e.g., in guides, funding modules, award documents).",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Zieldefinition (Lernziele, Teilziele, Module zur Vermittlung und Vertiefung berufskundlicher Kenntnisse)",
          en: "Definition of objectives (learning objectives, sub-objectives, modules for teaching and deepening professional knowledge)",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Unterstützung bei der Feststellung von Interessen, Kompetenzen, gewonnenen Erkenntnissen und Erfahrungen (z.B. Profiling, Eignungsfeststellung, Stärken-/ Schwächenprofil, Berufswahlpass, o.a.)",
          en: "Assistance in identifying interests, competencies, acquired knowledge and experience (e.g. profiling, aptitude assessment, strengths/weaknesses profile, career choice passport, etc.)",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Hilfen zur selbstständigen Entscheidungsfindung (Berufswahlkompetenz)",
          en: "Support for independent decision making (competence in career choice)",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Realitätsbezug (z.B. auch durch Ergebnisse aus Profiling, Betriebsbesuchen usw.)",
          en: "Relation to reality (e.g. also through results from profiling, company visits, etc.)",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Handlungsorientierung (Aktivierung und Motivierung der TN, Praxisphasen, aktives Lernen)",
          en: "Action-oriented (activating and motivating participants, practical phases, active learning)",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Transfer im Berufswahlprozess und Sicherstellung der Nachbereitung in der Schule und in Kooperation mit der Berufsberatung",
          en: "Transfer in the career choice process and ensure follow-up in school and in collaboration with career counseling",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Profiling mit der Zielsetzung der Feststellung der vorhandenen Kenntnisse und Fähigkeiten, der Eignung für berufliche Tätigkeiten aus allen Berufszweigen:\n - Aktuelle Situation auf dem Arbeitsmarkt\n - Erhebung der persönlichen und berufsrelevanten Daten\n - Eignungsabklärung durch Gegenüberstellung des erarbeiteten Bewerberprofils mit dem aktuellen Anforderungsprofil des jeweiligen Berufsbildes\n - Objektivität der Selbsteinschätzung",
          en: "Profiling with the aim of determining the existing knowledge and skills, the suitability for professional activities from all occupational fields:\n - Current situation on the labor market\n - Collection of personal and professionally relevant data\n - Suitability clarification by comparing the developed applicant profile with the current requirement profile of the respective occupational profile\n - Objectivity of the self-assessment.",
        },
        subjectAreas: [5],
      },
      {
        text: {
          de: "Transferberatung nach dem Profiling:\n - Befähigung zur eigenständigen, angemessenen und wirkungsvollen Reaktion auf die Anforderungen des Arbeitsmarktes\n - Einzelberatung / Besprechung des Profilingbogens / Aktivierung / Motivation / gemeinsame Zielvereinbarung / Coaching / Folgegespräche / individuelles Vermittlungscoaching und individueller Bewerbungsstrategien",
          en: "Transfer counseling after profiling:\n - empowerment to respond independently, appropriately and effectively to the demands of the labor market\n - individual counseling / discussion of the profiling sheet / activation / motivation / joint agreement on goals / coaching / follow-up interviews / individual placement coaching and individual application strategies.",
        },
        subjectAreas: [5],
      },
      {
        text: {
          de: "Aussagekräftige vollständige VerBIS-Eintragungen: Minimierung des Arbeitsaufwandes für die Transfergesellschaft und die AA",
          en: "Meaningful, complete VerBIS entries: Minimize workload for transfer company and AA",
        },
        subjectAreas: [5],
      },
      {
        text: {
          de: "Erstellung einer Transfer-Mappe",
          en: "Creation of a transfer folder",
        },
        subjectAreas: [5],
      },
      {
        text: {
          de: "Verfahren / Prozess zur Planung, Durchführung der Maßnahme in Anpassung an GA/HEGA vorhanden",
          en: "Procedure / process for planning, implementation of the measure in accordance with GA/HEGA in place.",
        },
        subjectAreas: [5],
      },
      {
        text: {
          de: "Verfahren zur Konzeption von Weiterbildungs- und Qualifizierungsmaßnahmen zur Verbesserung der beruflichen Eingliederungsaussichten",
          en: "Procedures for designing training and qualification measures to improve the prospects of occupational integration",
        },
        subjectAreas: [5],
      },
      {
        text: {
          de: "Fachliche Anforderungen an die Durchführung von Eingangsverfahren und Berufsbildungsbereich",
          en: "Technical requirements for the implementation of the admission procedure and the vocational training area",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Verfahren zur Durchführung des Eingangsverfahrens und des Berufsbildungsbereiches",
          en: "Procedure for the implementation of the admission procedure and the vocational training area",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Erstellung eines Eingliederungsplanes zur beruflichen Entwicklung eines Menschen mit Beeinträchtigungen",
          en: "Preparation of an integration plan for the professional development of a person with disabilities",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Vermittlung von Arbeitsprozess-Qualifikationen und Schlüsselqualifikationen im Berufsbildungsbereich",
          en: "The teaching of work process skills and key skills in the field of vocational education and training",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Schnittstelle Produktion (Arbeitsbereich) und Rehabilitation",
          en: "Interface production (work area) and rehabilitation",
        },
        subjectAreas: [6],
      },
      {
        text: { de: "Arbeitsbegleitende Angebote", en: "Work-related offers" },
        subjectAreas: [6],
      },
    ],
  },
  "17": {
    title: {
      de: "Bewertung von Maßnahmen",
      en: "Evaluation of educational activities",
    },
    description: {
      de: "Bewertung von Maßnahmen",
      en: "Evaluation of educational activities",
    },
    legalBasis: [
      {
        text: "§ 178 (4) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (4) 8 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
      {
        text: "Empfehlungen des Beirats nach § 182 SGB III, Punkt 7",
        href: "https://www.arbeitsagentur.de/datei/dok_ba032840.pdf",
      },
    ],
    tips: [
      {
        text: {
          de: "Überwachung der Entwicklungs-, Eingliederungs- bzw. Lernprozesse",
          en: "Monitoring of the development, integration or learning processes",
        },
      },
      {
        text: {
          de: "Erfassung der Teilnehmerpräsenz- und Abbruchquoten",
          en: "Recording of participant attendance and dropout rates",
        },
      },
      {
        text: {
          de: "Erfassung, ob Entwicklungs-, Eingliederungs- bzw. Lernziele erreicht sind und die Maßnahmequalität gewährleistet ist",
          en: "Determine whether development, integration, or learning objectives have been met and whether the quality of the intervention is assured.",
        },
      },
      {
        text: {
          de: "Erfassung ausbildungs- und/oder arbeitsmarktlicher Eingliederungsergebnisse",
          en: "Recording of training and/or labor market integration outcomes.",
        },
      },
      {
        text: {
          de: "Umgang mit Evaluierungsergebnisse",
          en: "Dealing with Evaluation Results",
        },
      },
      {
        text: {
          de: "Ergebnissicherung und Dokumentation während des Maßnahmeverlaufs",
          en: "Securing results and documentation during the course of the measure",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Ergebnissicherung und Nachhaltigkeit (Berichtswesen / Dokumentation / Nachbereitung durch Schule)",
          en: "Securing results and sustainability (reporting / documentation / follow-up by school)",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Im Zuge der Ergebnissicherung und der Dokumentation sind alle relevanten Daten über die Organisation und den Verlauf der Maßnahme festzuhalten. Das Berichtswesen ist ausgerichtet an der Zielsetzung der Maßnahme und umfasst die laufende Beobachtung (z. B. Statusbericht des Trägers, Maßnahmebesuche der Berufsberaterin / des Berufsberaters bzw. der Beraterin / des Beraters, Reha/SB) sowie den Abschlussbericht.",
          en: "In the course of securing results and documentation, all relevant data on the organization and progress of the measure must be recorded. The reporting system is aligned with the objectives of the measure and includes ongoing monitoring (e.g., status report by the provider, visits to the measure by the vocational counselor or counselor, rehab/SB) and the final report.",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Maßnahmeverlauf und Ergebnisse sind so zu dokumentieren, dass Erkenntnisse für die Planung und Gestaltung zukünftiger Maßnahmen genutzt werden können. Die Dokumentation ist so aufzubereiten, dass ein Transfer im Sinne von Good Practice ermöglicht wird.",
          en: "The process and results of the measure must be documented in such a way that the lessons learned can be used for the planning and design of future measures. The documentation must be prepared in such a way that it can be transferred as good practice.",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Abbruchquote / Integrationsquote",
          en: "Dropout/Integration Rate",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Zufriedenheit der regionalen Auftraggeber /Netzwerkpartner/Teilnehmer",
          en: "Regional customer/network partner/participant satisfaction",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Befragung der Teilnehmenden nach Schwierigkeiten in der persönlichen Einschätzung",
          en: "Ask participants about difficulties with personal assessment",
        },
        subjectAreas: [6],
      },
      {
        text: { de: "Verlaufsbeobachtung", en: "Progress Monitoring" },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Einbringen der Beobachtung und Anmerkung des Ausbilders",
          en: "Inclusion of trainer observations and comments.",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Spiegeln- Erfahren lassen",
          en: "Reflect- Allow to experience",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Auseinandersetzung über die aufgenommenen Informationen",
          en: "Discussion of recorded information",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Stärken, Schwächen und vorhandene Ressourcen sondieren",
          en: "Exploration of strengths, weaknesses, and resources in place",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Bewertung und Dokumentation der Arbeitsergebnisse im Eingliederungsplan",
          en: "Evaluation and documentation of the work results in the integration plan",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Dokumentation und Auswertung der sozialen und beruflichen Anamnese",
          en: "Documentation and evaluation of the social and professional history",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Feststellung und Dokumentation des Rehabilitationspotentials",
          en: "Determination and documentation of the potential for rehabilitation",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Ziele für die Durchführung der Reha -Maßnahme erarbeiten (Identifikation anstreben)",
          en: "Develop goals for implementing the rehabilitation intervention (strive for identification)",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Vorschlag, welche berufsbildenden Leistungen zur Teilhabe am Arbeitsleben und welche ergänzenden Leistungen zur Eingliederung in das Arbeitsleben in Betracht kommen",
          en: "Suggestion of which work participation benefits and which additional work integration benefits should be considered",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Welche Berufsfelder- nach Möglichkeit mindestens zwei- in Betracht kommen",
          en: "Which professions, preferably at least two, can be considered?",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Klärung, ob eine ausgelagerte berufliche Bildung in Betracht kommt",
          en: "Determine if outsourced training is an option",
        },
        subjectAreas: [6],
      },
    ],
  },
  "18": {
    title: {
      de: "Zusammenarbeit mit Dritten",
      en: "Collaboration with third parties",
    },
    description: {
      de: "Zusammenarbeit mit Dritten",
      en: "Collaboration with third parties",
    },
    legalBasis: [
      {
        text: "§ 178 (4) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (4) AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
      {
        text: "Empfehlungen des Beirats nach § 182 SGB III, Punkt 8",
        href: "https://www.arbeitsagentur.de/datei/dok_ba032840.pdf",
      },
    ],
    tips: [
      {
        text: {
          de: "Zusammenarbeit mit Dritten",
          en: "Collaboration with third parties",
        },
      },
      { text: { de: "Erfassung der Aktivitäten", en: "Recording activities" } },
      {
        text: {
          de: "Bedarfsabhängige Entwicklung der Zusammenarbeit",
          en: "Needs-based development of collaboration",
        },
      },
      {
        text: {
          de: "Kooperation des Trägers mit der Vielzahl von Akteuren (BA, Schule, Wirtschaft, Träger, Berufseinstiegsbegleiter, Ehrenamtliche, Eltern, Schüler usw.), die sich im Feld der Berufswahlvorbereitung und des Übergangs von der Schule in den Beruf engagieren.",
          en: "Cooperation of the institution with the multitude of actors (BA, school, economy, sponsors, career transition counselors, volunteers, parents, students, etc.) who are involved in the field of career preparation and the transition from school to work.",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Vernetzung der Beteiligten auf regionaler Ebene unter Berücksichtigung bereits bestehender Netzwerke.",
          en: "Networking of stakeholders at the regional level, taking into account existing networks.",
        },
        subjectAreas: [3],
      },
      {
        text: {
          de: "Zusammenwirken verschiedener Akteure (Netzwerk Schule, Eltern, Betrieb) ggf. auch Abstimmung der Presse und Öffentlichkeitsarbeit (z.B. Verwendung des BA-Logos)",
          en: "Cooperation of different actors (network school, parents, company), if necessary also coordination of press and public relations (e.g. use of the BA logo)",
        },
        subjectAreas: [3],
      },
    ],
  },
  "19": {
    title: {
      de: "Beschwerdemanagement und Befragung der Teilnehmer und des Personal",
      en: "Complaint management and participant and staff surveys",
    },
    description: {
      de: "Beschwerdemanagement und Befragung der Teilnehmer und des Personal",
      en: "Complaint management and participant and staff surveys",
    },
    legalBasis: [
      {
        text: "§ 178 (4) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (4) AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
      {
        text: "Empfehlungen des Beirats nach § 182 SGB III, Punkt 9, S. 4",
        href: "https://www.arbeitsagentur.de/datei/dok_ba032840.pdf",
      },
    ],
    tips: [
      {
        text: {
          de: "Befragung der Teilnehmenden / Auswertung der Befragung (Bei Neukunden (Zertifizierungsaudit) ist der Fragebogen einzureichen. Im Überwachungsaudit bzw im Wieder-/Neulassungsaudit ist der Fragebogen inkl. einer Auswertung der Befragung einzureichen)",
          en: "Survey of participants / evaluation of the survey (For new clients (certification audit), the questionnaire must be submitted. In case of surveillance audit or re-registration audit, the questionnaire including the evaluation of the survey shall be submitted).",
        },
      },
      {
        text: {
          de: "Befragung des Personals / Auswertung der Befragung (Bei Neukunden (Zertifizierungsaudit) ist der Fragebogen einzureichen. Im Überwachungsaudit bzw im Wieder-/Neulassungsaudit ist der Fragebogen inkl. einer Auswertung der Befragung einzureichen)",
          en: "Survey of personnel / evaluation of the survey (For new clients (certification audit), the questionnaire must be submitted. In case of surveillance audit or re-registration audit, the questionnaire including the evaluation of the survey shall be submitted).",
        },
      },
      {
        text: {
          de: "System zur Auswertung der Beschwerden",
          en: "System for evaluating complaints",
        },
      },
      {
        text: {
          de: "System zur Einleitung und Verfolgung von Vorbeugungs- und Korrekturmaßnahmen",
          en: "System for initiating and tracking preventive and corrective measures",
        },
      },
      {
        text: {
          de: "Evaluation (Befragungen im Netzwerk, Schüler, Eltern, Betrieb und Schule, Messung des Grads der Zielerreichung auf der Grundlage erhobener Kennzahlen oder Indikatoren)",
          en: "Evaluation (surveys in the network, students, parents, company and school, measurement of the degree of goal achievement based on collected key figures or indicators)",
        },
        subjectAreas: [3],
      },
      {
        text: { de: "Befragung des Personal", en: "Interviewing the staff" },
        subjectAreas: [3],
      },
      {
        text: {
          de: "System zur Einleitung und Verfolgung von Vorbeugungs- und Korrekturmaßnahmen",
          en: "System for initiating and tracking preventive and corrective measures",
        },
        subjectAreas: [3],
      },
    ],
  },
  "20": {
    title: {
      de: "Dienstleistungsangebot / Maßnahmenangebot im Überblick",
      en: "Overview of Services / Measures",
    },
    description: {
      de: "Dienstleistungsangebot / Maßnahmenangebot im Überblick",
      en: "Overview of Services / Measures",
    },
    legalBasis: [
      {
        text: "§ 178 SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (1) AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
    ],
    tips: [
      {
        text: {
          de: "Übersicht über das aktuelle Angebot an Dienstleistungen / Maßnahmen / Ausschreibungen / Leistungen zur Teilhabe am Arbeitsleben",
          en: "Overview of current services / measures / job offers / services for participation in working life",
        },
      },
      {
        text: {
          de: "Akquise und Werbematerial",
          en: "Customer acquisition and promotional materials",
        },
      },
    ],
  },
  "21": {
    title: {
      de: "Muster- Teilnehmervertrag / Vermittlungsvertrag / Ausbildungsvertrag / dreiseitiger Vertrag o.ä.",
      en: "Sample Participant Contract / Mediation Contract / Training Contract / Tripartite Contract or similar.",
    },
    description: {
      de: "Muster- Teilnehmervertrag / Vermittlungsvertrag / Ausbildungsvertrag / dreiseitiger Vertrag o.ä.",
      en: "Sample Participant Contract / Mediation Contract / Training Contract / Tripartite Contract or similar.",
    },
    legalBasis: [
      {
        text: "§ 178 (5) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (5) AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
    ],
    tips: [
      {
        text: {
          de: "Grundsätzlich ist zwischen dem Träger und dem Teilnehmenden ein Vertrag zu schließen",
          en: "In principle, a contract is to be concluded between the carrier and the participant.",
        },
      },
      {
        text: {
          de: "Inhalte für einen Vertrag\n\n      - Ziele, Inhalte und Angaben zur Art des Abschlusses\n      - Dauer der Maßnahme, Hinweis zum Urlaubsanspruch bei Maßnahmen, die länger als 6 Monate dauern.\n      - Kosten (inkl. Angaben zu der Höhe der Lehrgangsgebühren, Kosten für Arbeitskleidung, Lernmittel und Prüfungsstücke mit Hinweis zum Verbleib beim Teilnehmenden (oder Leihweise), Prüfungsgebühren, Zahlungsweise\n      - Mitgeltende Dokumente (AGBs, Datenschutzvereinbarung, Hausordnung, Fehlzeitenregelung usw.) müssen dem Vertrag beigefügt werden.\n      - Rechte und Pflichten der Vertragspartner\n      - Angemessene Rücktrittsbedingungen vor Beginn der Maßnahme: Dem Teilnehmenden muss für den Fall, dass eine Förderung nach dem SGB III nicht erfolgt, bzw. bei Arbeitsaufnahme ein Rücktrittsrecht eingeräumt werden. Kosten dürfen hierbei nicht entstehen. Zusätzlich ist ein allgemeines Rücktrittsrecht innerhalb von 14 Tage nach Vertragsabschluss, längstens bis zum Beginn der Maßnahme einzuräumen.\n      - Angemessene Kündigungsbedingungen während der Maßnahme: Die Teilnahme an einer Maßnahme der Arbeitsmarktdienstleistung muss mit einer Frist von höchstens 6 Wochen, erstmals zum Ende der ersten 3 Monate, sodann jeweils zum Ende der nächsten 3 Monate kündbar sein. Sofern eine Maßnahme in Abschnitten/Modulen kürzer als 3 Monate sind, angeboten wird, muss eine Kündigung zum Ende eines jeden Abschnitts/Moduls möglich sein.\n      - Hinweis, dass dem Teilnehmenden nach Abschluss der Maßnahme eine Teilnahmebescheinigung mit Angaben zum Inhalt, zeitlichen Umfang und Ziel der Maßnahme ausgehändigt wird, unabhängig davon, ob der Teilnehmende mit Erfolg die Maßnahme abgeschlossen oder vorzeitig die Maßnahme beendet hat.\n      - Informationspflicht bei Erhebung von personenbezogenen Daten gemäß Kap. 3 Art. 13 der Datenschutzgrundverordnung (DSGVO)",
          en: "Content for a contract\n\n        - Objectives, contents and information about the type of contract\n        - Duration of the measure, reference to holiday entitlement for measures lasting longer than 6 months.\n        - Costs (including information on the amount of course fees, costs for work clothes, learning materials and examination materials with information on whether they remain with the participant (or are loaned), examination fees, method of payment)\n        - Applicable documents (general terms and conditions, data protection agreement, house rules, absence policy, etc.) must be attached to the contract.\n        - Rights and obligations of the parties\n        - The participant must be granted the right to withdraw from the contract in the event that he/she is not financed according to SGB III or if he/she takes up employment. No costs may be incurred. In addition, a general right of withdrawal must be granted within 14 days of the conclusion of the contract, at the latest until the start of the measure.\n        - Reasonable conditions for termination during the measure: Participation in a labour market service measure must be terminable with a maximum notice period of 6 weeks, for the first time at the end of the first 3 months, then at the end of each of the following 3 months. If an activity is offered in sections/modules of less than 3 months, it must be possible to cancel at the end of each section/module.\n        - Indication that the participant will receive a certificate of participation upon completion of the measure, including information on the content, duration and objective of the measure, regardless of whether the participant successfully completes the measure or terminates it prematurely.\n        - Duty to inform when collecting personal data according to Chap. 3 Art. 13 of the General Data Protection Regulation (DSGVO)",
        },
      },
      {
        text: {
          de: "Teilnehmer- und Praktikumsvertrag",
          en: "Participant and Internship Contract",
        },
        subjectAreas: [1, 4],
      },
      {
        text: {
          de: "Schriftlicher Vertrag gemäß § 296 (1 bis 4) SGB III",
          en: "Written contract according to § 296 (1 to 4) SGB III",
        },
        subjectAreas: [2],
      },
      {
        text: {
          de: "Angaben zu den Leistungen, die zur Vorbereitung und Durchführung der Vermittlung erforderlich sind, z.B. die Feststellung der Kenntnisse des Arbeitssuchenden sowie die mit der Vermittlung verbundene Berufsberatung.",
          en: "Information about the services needed to prepare for and conduct the placement, such as assessment of the job seeker's skills and career counseling related to the placement.",
        },
        subjectAreas: [2],
      },
      {
        text: {
          de: "Regelung der Vergütung im Vertrag gemäß § 83 (4), S. 3 Nr. 2 oder Vergütung gemäß § 2 (1) SGB IX",
          en: "Regulation of remuneration in the contract according to § 83 (4), S. 3 No. 2 or remuneration according to § 2 (1) SGB IX",
        },
        subjectAreas: [2],
      },
      {
        text: {
          de: "Vergütung bei Ausbildungsvermittlung nur durch Arbeitgeber/Ausbildungsbetrieb",
          en: "Compensation for training placement only by employer/training company",
        },
        subjectAreas: [2],
      },
      {
        text: {
          de: "Informationspflicht bei Erhebung von personenbezogenen Daten gemäß Kap. 3 Art. 13 der Datenschutzgrundverordnung (DSGVO)",
          en: "Obligation to provide information when collecting personal data pursuant to ch. 3 Art. 13 of the General Data Protection Regulation (GDPR)",
        },
        subjectAreas: [2],
      },
      {
        text: {
          de: "Höhe des Entgeltes in der Transfergesellschaft",
          en: "Amount of compensation in the transfer company",
        },
        subjectAreas: [5],
      },
      {
        text: {
          de: "Aufstockungsbetrag des Transferkurzarbeitergeldes",
          en: "Top-up amount of the transfer short-time allowance",
        },
        subjectAreas: [5],
      },
      {
        text: { de: "Umfang des Urlaubes", en: "Length of the vacation" },
        subjectAreas: [5],
      },
      {
        text: { de: "Weihnachtsgeld", en: "Holiday Bonus" },
        subjectAreas: [5],
      },
      {
        text: {
          de: "Behandlung von z. B. Betriebsrentenansprüchen",
          en: "Treatment of e.g. company pension entitlements",
        },
        subjectAreas: [5],
      },
      {
        text: {
          de: "Maßnahmen der beruflichen Neuorientierung, Vermittlung und Qualifizierung des Arbeitnehmers (Erstellung eines Berufswege- und Qualifizierungsplanes, Unterstützung der Integration in den ersten Arbeitsmarkt durch Beratung und vermittlungsunterstützende Leistungen. Ggf. Durchführung von Qualifizierungsmaßnahmen; Vermittlung von betrieblichen Einarbeitungsprogrammen (Praktika)",
          en: "Measures for professional reorientation, placement and qualification of the employee (preparation of a career and qualification plan, support for integration into the primary labor market through counseling and placement services). If necessary, implementation of qualification measures; organization of in-company familiarization programs (internships).",
        },
        subjectAreas: [5],
      },
      {
        text: {
          de: "Informationspflicht bei Erhebung von personenbezogenen Daten gemäß Kap. 3 Art. 13 der Datenschutzgrundverordnung (DSGVO)",
          en: "Obligation to provide information when collecting personal data pursuant to ch. 3 Art. 13 of the General Data Protection Regulation (GDPR)",
        },
        subjectAreas: [5],
      },
      {
        text: {
          de: "Abschluss eines Teilnehmervertrages bei Aufnahme in das Eingangsverfahren und den Berufsbildungsbereich",
          en: "Conclusion of a participant contract upon admission to the admission procedure and the vocational training area",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Abschluss eines Werkstattvertrages als Arbeitsvertrag zwischen Mitarbeiter und dem Unternehmen bei Wechsel in den Arbeitsbereich",
          en: "Conclusion of a workshop contract as an employment contract between the employee and the company upon transfer to the work area",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Anlage Vereinbarung zur Entgeltzahlung",
          en: "Attachment Agreement for Payment of Compensation",
        },
        subjectAreas: [6],
      },
      {
        text: { de: "Werkstattordnung", en: "Workshop Rules" },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Vertragliche Ergänzungen bei Tätigkeiten auf einem Außenarbeitsplatz im Berufsbildungsbereich und im Arbeitsbereich",
          en: "Contract supplements for activities at an external workplace in the area of vocational training and in the area of work",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Angaben zum Inhalt, zeitlichem Umfang und Ziel der Maßnahme (WV/BBB)",
          en: "Information on the content, time frame and objective of the measure (WV/BBB)",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Vertragliche Regelungen für alle Reha-Dienstleistungen (z.B. unterstützte Beschäftigung)",
          en: "Contractual provisions for all rehabilitation services (e.g., supported employment).",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Inhalte: Informationelles Selbstbestimmungsrecht, Datenschutz, Verpflichtung zur Zusammenarbeit, Abläufe, medizinische Aufklärung, Reha-Zielvereinbarung",
          en: "Contents: Informational Self-Determination, Privacy, Duty to Cooperate, Procedures, Medical Education, Rehabilitation Goal Agreement.",
        },
        subjectAreas: [6],
      },
      {
        text: {
          de: "Informationspflicht bei Erhebung von personenbezogenen Daten gemäß Kap. 3 Art. 13 der Datenschutzgrundverordnung (DSGVO)",
          en: "Obligation to provide information when collecting personal data pursuant to ch. 3 Art. 13 of the General Data Protection Regulation (GDPR)",
        },
        subjectAreas: [6],
      },
    ],
  },
};
