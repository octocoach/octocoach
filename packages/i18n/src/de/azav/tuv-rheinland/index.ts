import type { FileSchema } from "@octocoach/azav/src/expert-body/tuv-rheinland/file-schema";

export const tuvRheinland: FileSchema = {
  0: {
    title: "Antrag auf Trägerzulassung",
    description: "Antrag auf Trägerzulassung",
    tips: [
      {
        text: "Bitte den rechtsverbindlich unterschriebenen Antrag vollständig mit allen Anlagen als komprimierte und gezippte Datei per Mail an: fks@de.tuv.com senden.",
      },
      {
        text: "Das Mailsystem von TÜV Rheinland überträgt Mailanhänge bis zu einer Größe von 20 MB. Wenn größere Dateien übertragen werden sollen, kann das System TUVbox verwendet werden. Um das Konto zu aktivieren nehmen Sie bitte zu den angegebenen TÜV-Ansprechpartnern Kontakt auf.",
      },
    ],
  },
  1: {
    title: "Nachweis Firmierung",
    description: "Nachweis zur Firmierung bzw. zur Rechtsform",
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
        text: "Auszug aus Vereins- oder Handelsregister, nicht älter als 6 Monate",
      },
      { text: "Gesellschaftervertrag bei GbR" },
      {
        text: "Inhabergeführte Unternehmen müssen den Namen im Firmennamen aufnehmen",
      },
      {
        text: "Im Registerauszug bzw. in der Gewerbeanmeldung muss sich der Geschäftszweck des Unternehmens eindeutig auf die Tätigkeit des Unternehmens z.B. Bildung, Ausbildung, Vermittlung, Werkstatt für Behinderte usw. beziehen",
      },
      {
        text: "Unternehmen, deren Geschäftszweck überwiegend nicht in der Aus- und Weiterbildung zu sehen ist, müssen im Trägernamen einen Zusatz, z.B. „Ausbildungsabteilung“, „Abt. Fort- und Weiterbildung“ o.ä. enthalten",
      },
      {
        text: "Gewerbeanmeldung nach § 14 GewO für den Fachbereich 2",
        subjectAreas: [2],
      },
    ],
  },
  2: {
    title: "Finanzielle Leistungsfähigkeit",
    description: "Nachweis der finanziellen Leistungsfähigkeit des Trägers",
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
      { text: "Testat eines Steuerberaters/Wirtschaftsprüfers _oder_" },
      { text: "Bilanzen _oder_" },
      { text: "Bankauskunft _oder_" },
      { text: "Gewinn- und Verlustrechnung _oder_" },
      { text: "Eingaben-Ausgabenrechnung _oder_" },
      { text: "Controlling und Planungsunterlagen" },
      {
        text: "Aktuell bzw. aus dem letzten Wirtschaftsjahr und vom Testierer unterschrieben",
      },
      { text: "kein selbsterstellter Beleg" },
      {
        text: "Bestätigungsvermerk des Abschlussprüfers nach § 317 HGB reicht nicht aus",
      },
      {
        text: "Bei Neuzulassungen (Zertifizierungsaudit) kann ggf. ein Businessplan eingereicht werden",
      },
      {
        text: "Erklärung und rechtsverbindliche Unterschrift des Antragstellers über Insolvenzverfahren (siehe Antrag)",
      },
    ],
  },
  3: {
    title: "Bescheinigung in Steuersachen",
    description: "Bestätigung der finanzielle Leistungskraft",
    legalBasis: [
      {
        text: " § 178 SGB (1) III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (1)1 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
    ],
    tips: [
      {
        text: "Aktuelle Bescheinigung des Finanzamtes in Steuersachen (nicht älter als 3 Monate)",
      },
      {
        text: "Anlage zum Bescheid zur Körperschaftssteuer ist keine Bescheinigung in Steuersachen!",
      },
    ],
  },
  4: {
    title: "Betriebshaftpflichtversicherung",
    description:
      "Nachweis der finanziellen Leistungsfähigkeit des Trägers - Nachweis über den Abschluss einer Betriebshaftpflicht",
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
        text: "Eine gewerbliche Tätigkeit ist grundsätzlich mit Risiken verbunden. Schadensersatzansprüche von Dritten sind trotz größter Sorgfalt nicht auszuschließen.",
      },
      {
        text: "Für Schäden, die durch das Unternehmen oder die Mitarbeiter bei der Ausübung ihrer beruflichen Tätigkeit verursacht worden sind sowie Schäden aus Grund- und Gebäudeeigentum bzw. -besitz haftet in jedem Fall die Firma. Um das Risiko unternehmerisch kalkulierbar zu machen und die finanzielle Leistungsfähigkeit nicht zu beeinträchtigen, muss eine Betriebshaftpflichtversicherung nachgewiesen werden.",
      },
    ],
  },
  5: {
    title: "Bescheinigung Berufsgenossenschaft",
    description:
      "Nachweis über die Anmeldung bei einer gesetzlichen Unfallversicherung VBG",
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
        text: "Unternehmen aller Art müssen sich binnen einer Woche nach Gründung bei einer Berufsgenossenschaft anmelden.",
      },
      {
        text: "Bei überbetrieblichen Weiterbildungsmaßnahmen, die von einem Bildungsträger (mit oder ohne betriebliches Praktikum) durchgeführt werden, besteht Versicherungsschutz nach § 2 Abs. 1 Nr. 2 SGB VII; zuständig für den Unfallversicherungsschutz ist grundsätzlich für die gesamte Maßnahme (einschließlich betrieblicher Praktika) der für den Bildungsträger zuständige Unfallversicherungsträger.",
      },
      {
        text: "Siehe Merkblatt für Bildungseinrichtungen und Maßnahmeträger zur unfallversicherungsrechtlichen Zuständigkeit für Teilnehmerinnen und Teilnehmer an beruflichen und arbeitsmarktpolitischen Maßnahmen.",
      },
    ],
  },
  6: {
    title: "Zulassungen und Anerkennungen",
    description:
      "Vorlage von Berechtigungen - Anerkennungen und Zertifikate Dritter",
    legalBasis: [
      {
        text: "179 Abs. 1 Nr. 1 SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__179.html",
      },
      {
        text: "§ 3 Abs. 5 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__3.html",
      },
    ],
    tips: [
      { text: "Zertifikate anderer Zertifizierungsstellen (AZAV, ISO)" },
      {
        text: "Anerkennung Dritter (staatliche Anerkennungen, z.B. als Ersatzschule)",
      },
      { text: "Zulassung als Fahrschule" },
      {
        text: "Leistungsbeschreibungen bzw. Verträge über Maßnahmen im Fachbereich 3 (§§ 48-80 SGB III)",
      },
      {
        text: "Nachweis über die Einrichtungen der beruflichen Rehabilitation, z.B. Berufsförderungswerke, Berufsbildungswerke und vergleichbare Einrichtungen nach § 51 SGB IX, Werkstätten für Behinderte nach § 227 SGB IX",
      },
      {
        text: "Leistungsbeschreibungen bzw. Verträge über besondere Leistungen nach § 117 SGB III (Produktvarianten im Fachbereich 6, z.B. BvB-Reha, bbA, InRAM, bbA, bbUReha, UB, DIA- AM/UB)",
      },
      {
        text: "Anerkennung als Träger der freien Jugendhilfe gemäß § 75 SGB VIII",
      },
      {
        text: "Bestätigtes Fachkonzept für Eingangsverfahren/Berufsbildungsbereich (§ 57 SGB IX) oder Fachkonzept für Eingangsverfahren/ Berufsbildungsbereich bei anderen Leistungsanbietern nach § 60 SGB IX",
      },
      {
        text: "Die Anerkennungen müssen auf den Rechtsträger ausgestellt sein",
      },
    ],
  },
  7: {
    title: "Organigramm",
    description: "Organigramm",
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
        text: "Aufbau- und Ablauforganisation, aktuelles und gültiges Organigramm",
      },
    ],
  },
  8: {
    title: "Prozessübersicht",
    description: "Aktuelle Prozesslandschaft oder Prozessübersicht",
    legalBasis: [
      {
        text: "178 (1) SGB III",
        href: "https://www.gesetze-im-internet.de/sgb_3/__178.html",
      },
      {
        text: "§ 2 (1) 2 AZAV",
        href: "https://www.gesetze-im-internet.de/azav/__2.html",
      },
    ],
    tips: [
      {
        text: "Bezogen auf die Tätigkeiten und die (beantragten) Fachbereiche des Trägers",
      },
    ],
  },
  9: {
    title: "Infrastruktur",
    description: "Beschreibung der Infrastruktur - Anlage Infrastruktur",
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
        text: "Mietverträge, Raumpläne, Grundrisszeichnungen werden im Auditverfahren vor Ort geprüft",
      },
      {
        text: "In den Mietverträgen muss der Nutzungszweck, Büro- und Schulungsräume bzw. Ausbildungswerkstätten enthalten sein.",
      },
      {
        text: "Die Standorte des Trägers werden ortsbezogen und bezogen auf den jeweiligen Fachbereich zugelassen",
      },
      {
        text: "Bei der Zulassung der Standorte für bestimmte Fachbereiche sind die, für das Schulungsziel und die Inhalte notwendigen räumlichen und technischen Ausstattungen nachzuweisen.",
      },
      {
        text: "Die Standorte müssen die Vorgaben der AZAV hinsichtlich Größe, Ausstattung, Arbeitssicherheit, Gesundheitsschutz einhalten",
      },
      {
        text: "Die Vorgaben der ArbeitsstättenVO in der jeweils gültigen Fassung in Verbindung mit den Arbeitsstättenrichtlinien, die BildschirmarbeitsVO in ihrer aktuellen Fassung und die Vorschriften der zuständigen Unfallversicherung (Berufsgenossenschaften) sind bei der Auswahl und Nutzung der Standorte einzubeziehen und zu überprüfen",
      },
      {
        text: "Temporäre Standorte können bis maximal zum nächsten Überwachungsaudit zugelassen werden. Es erfolgt eine Dokumentenprüfung im Offsite-Verfahren",
      },
      {
        text: "Schulungsraum mit mindestens 12 TN-Plätzen, Büro, Beratungsraum, Pausen-(Sozialraum), Werkstätten bei fachpraktischer Weiterbildung",
        subjectAreas: [1, 5, 6],
      },
      {
        text: "Bei Maßnahmen mit Einzelcoaching reicht ein Büro- und Beratungsraum aus",
        subjectAreas: [1, 5, 6],
      },
      {
        text: "Büro- und Beratungsraum",
        subjectAreas: [2, 5],
      },
      {
        text: "Die konkreten Anforderungen an die Infrastruktur sind abhängig von der jeweiligen Maßnahme zugrunde liegenden Leistungsbeschreibung. Z.B für abH, BvB sowie BaE integrativ sind umfangreiche Raumkapazitäten erforderlich, für BvB integrativ und BaE integrativ müssen zusätzliche Räume für die Fachpraxis „Werkstätten“ nachgewiesen werden. AbH benötigt üblicherweise mehrere (kleinere) Unterrichtsräume, um verschiedene Gruppenzeitgleich zu unterrichten",
        subjectAreas: [3],
      },
      {
        text: "Schulungsraum mit mindestens 12 TN-Plätzen, Büro, Beratungsraum, Pausen-(Sozialraum), Werkstätten bei fachpraktischer Weiterbildung",
        subjectAreas: [4, 5, 6],
      },
      {
        text: "Bei Maßnahmen mit Einzelcoaching reicht ein Büro- und Beratungsraum aus",
        subjectAreas: [4, 5, 6],
      },
      {
        text: "Eine dem Leistungsangebot entsprechende räumliche und sächliche Ausstattung (Werkstätten) einschließlich Sozial-, Umkleide- und Sanitärräume",
        subjectAreas: [6],
      },
      {
        text: "Barrierefreiheit im Sinne des § 4 BGG unter besonderer Berücksichtigung möglicher Spezialisierung auf bestimmte Arten von Behinderung ist grundsätzlich sicherzustellen",
        subjectAreas: [6],
      },
      {
        text: "Werden Leistungen nach § 33 Abs. 3 Nr. 3 und 4 SGB IX angeboten, muss die räumliche und sächliche Ausstattung den einschlägigen Ausbildungsregelungen in besonderer Weise Rechnung tragen",
        subjectAreas: [6],
      },
    ],
  },
  10: {
    title: "Personal",
    description: "Angaben zum Personal",
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
        text: "Personal, welches in den einzelnen Fachbereichen (1 bis 6) eingesetzt wird, wie z.B. Lehrkräfte, Ausbilder, Sozialpädagogen, Sozialarbeiter, Coaches, Arbeitsvermittler, Personal in Reha- Einrichtungen, Integrationsfachkräfte usw.",
      },
      {
        text: "In der Anlage Personal (Lehr-/Fachkräfte, Arbeitsvermittler, Sozial-/Pädagogen) sind Angaben zu den in dem jeweiligen Arbeitsgebiet (Fachbereiche) eingesetzten Personal zu machen.",
      },
      {
        text: "Angaben zum Leitungspersonal (Unternehmensleitung, Stellvertreter) sind im Trägerantrag vorzunehmen",
      },
      {
        text: "Die Nachweise der Ausbildung und Berufserfahrung des Leiters und des Personals durch Ausbildung, Zeugnisse, Zusatzqualifikationen, beruflichen Werdegang, zweijährige Erfahrung in der Erwachsenenbildung werden im Auditverfahren eingesehen. Die Zusendung mit dem Trägerantrag ist nicht erforderlich",
      },
      {
        text: "Fachliche und pädagogische Eignung des Leiters, der Lehr- und Fachkräfte,",
        subjectAreas: [1, 3, 4],
      },
      {
        text: "Nachweis der pädagogischen Eignung durch Meisterprüfung, Ausbildereignung (AdA) oder",
        subjectAreas: [1, 3, 4],
      },
      {
        text: "Pädagogische Ergänzungsstudiengänge im Bereich beruflicher Erwachsenenbildung oder",
        subjectAreas: [1, 3, 4],
      },
      { text: "Vergleichbare Zusatzqualifikationen", subjectAreas: [1] },
      {
        text: "Anerkennung der fachlichen und pädagogischen Eignung durch Dritte (z.B. durch landesrechtliche Regelungen, durch eine zuständige Aufsichtsbehörde, usw.)",
        subjectAreas: [1, 3, 4],
      },
      {
        text: "Nachweis von mindestens 2 Jahren Erfahrungen in der beruflichen Bildung, nach Möglichkeit in der Erwachsenenbildung",
        subjectAreas: [1, 3, 4],
      },
      {
        text: "Bei weniger als 2 Jahren Erfahrungen in der beruflichen Bildung muss der Nachweis eines betreuten Coachings bzw. durch Anleiten durch eine erfahrene Lehr- und Fachkraft in der Erwachsenenbildung erbracht werden.",
        subjectAreas: [1, 3, 4],
      },
      {
        text: "Darlegung über den tatsächlichen Einsatz in der Bildungseinrichtung (ausgewogenes Verhältnis zwischen angestellten und externen Lehr- und Fachkräften)",
        subjectAreas: [1, 3, 4],
      },
      {
        text: "Fachlich qualifiziertes und in der Förderung bzw. Qualifizierung junger Menschen erfahrenes",
        subjectAreas: [3],
      },
      {
        text: "Fachpersonal, z.B. Fachleute mit Berufserfahrung, Ausbilder/-innen, Lehrer/-innen, sozialpädagogische und sonderpädagogische Fachkräfte, bzw. Fachkräfte mit Erfahrungsvielfalt und Doppel- bzw. Mehrfachqualifikationen (z.B. Ausbilder mit sonderpädagogischer Zusatzqualifikation)",
        subjectAreas: [3],
      },
      {
        text: "Insbesondere im Fachbereich 3 variieren die Anforderungen an das Personal erheblich. Diese sind, je nach durchgeführter Leistung eindeutig nur aus der Leistungsbeschreibung des öffentlichen Vergabeverfahrens Teil B zu entnehmen. In der Regel sind feste Personalschlüssel für die unterschiedlichen Professionen vorgegeben. Gleiches gilt für die zu erfüllenden Qualifikationen des eingesetzten Personals (akzeptierte Abschlüsse sowie ersatzweise akzeptierte Qualifikationen).",
        subjectAreas: [3],
      },
      {
        text: "Der Träger (die Einrichtung) verfügt - ausgerichtet an den besonderen Anforderungen - über qualifiziertes, in der Rehabilitation und Teilhabe erfahrenes Fachpersonal",
        subjectAreas: [6],
      },
      {
        text: "Die Nachweise hierfür erfolgen über Schul-, Hochschul- und Ausbildungsabschlüsse einschließlich Nachweis nicht formal erworbener Qualifikationen und besuchter Weiterbildungen",
        subjectAreas: [6],
      },
      {
        text: "Näheres zu dem Personaleinsatz von Ausbildern, Sozialpädagogen, Lehrkräften und Psychologen sind dem Fachkonzept für Einrichtungen nach § 51 SGB IX zu entnehmen",
        subjectAreas: [6],
      },
      {
        text: "Für den Personalansatz von Ausbildern, Sozialpädagogen, Lehrkräften, und Psychologen gelten als Mindeststandard die Vorgaben zum Personalschlüssel in Leistungsbeschreibungen vergleichbarer Maßnahmen",
        subjectAreas: [6],
      },
      {
        text: "Für Ärzte und Psychologen gilt ein an den vorherrschenden Behinderungsarten orientierter Personalschlüssel",
        subjectAreas: [6],
      },
      {
        text: "Rehabilitationspädagogische Zusatzqualifikation (ReZA) für Ausbildungsregelungen für behinderte Menschen",
        subjectAreas: [6],
      },
      {
        text: "Personalschlüssel nach Werkstattverordnung (WVO)",
        subjectAreas: [6],
      },
    ],
  },
  11: {
    title: "Unternehmensprofil / Leitbild",
    description: "Anforderungen an ein System zur Qualitätssicherung",
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
      { text: "Unternehmensprofil des Trägers" },
      {
        text: "Definition der „Kunden“ des Trägers und Nachweis, dass auf die Erwartungen der Kunden eingegangen und dies in den Prozess der kontinuierlichen Verbesserung integriert wird",
      },
      { text: "Ausrichtung des Leitbildes am Ausbildungs- und Arbeitsmarkt" },
      {
        text: "in- und extern kommuniziertes Leitbild, welches regelmäßig überprüft und bei Bedarf angepasst wird",
      },
    ],
  },
  12: {
    title: "Unternehmensorganisation",
    description:
      "Unternehmensorganisation und -führung, einschließlich der Festlegung von operationalen Unternehmenszielen und Durchführung eigener Prüfungen zur Funktionsweise des Unternehmens",
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
      { text: "Aufbau- und Ablauforganisation (siehe Punkt 07 und 08)" },
      { text: "Unternehmensziele" },
      { text: "Fachbereichsbezogene (FB 1 - FB 6) operationalisierbare Ziele" },
      {
        text: "Verfahren zur Festlegung und Überprüfung der Unternehmenspolitik, -ziele (internes Audit)",
      },
      {
        text: "Die Aufbauorganisation wird unter Pkt 07 Organigramm dargestellt. Hier ist der Schwerpunkt auf die Verfahren der Festlegung der Qualitätspolitik und Qualitätsziele zu legen",
      },
    ],
  },
  13: {
    title: "Qualifizierung und Fortbildung Personal",
    description:
      "Zielorientiertes Konzept zur Qualifizierung und Fortbildung der Leitung und der Lehr- und Fachkräfte (Fachpersonal)",
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
        text: "Konzept Personalentwicklung inkl. Fort- und Weiterbildung und Personalpolitik",
      },
      { text: "Ermittlung des Schulungsbedarfs des Personals" },
      { text: "Beurteilung der Wirksamkeit der Schulungen (Erfolg)" },
      { text: "Planung regelmäßiger Teambesprechungen" },
    ],
  },
  14: {
    title: "Zielvereinbarungen und Kennzahlen",
    description:
      "Zielvereinbarungen, einschließlich der Messung der Zielerreichung und der Steuerung fortlaufender Optimierungsprozesse auf Grundlage erhobener Kennzahlen und Indikatoren",
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
      { text: "Aktuelle und messbare Unternehmens- und Qualitätsziele" },
      {
        text: "Regelmäßige Überprüfung der Zielerreichung (Management-Review)",
      },
      { text: "Weiterentwicklung der Ziele und Korrekturmaßnahmen" },
    ],
  },
  15: {
    title: "Konzeption und Durchführung von Maßnahmen",
    description:
      "Berücksichtigung arbeitsmarktlicher Entwicklungen bei Konzeption und Durchführung von Maßnahmen der Arbeitsförderung (Arbeitsmarktanalyse)",
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
      { text: "Arbeitsmarktanalyse" },
      {
        text: "Berücksichtigung der arbeitsmarktlichen Entwicklung bei der Konzeption und Durchführung von Maßnahmen der Arbeitsförderung",
      },
      {
        text: "Aktuelle und systematische Analyse der kundenrelevanten Bedarfe in Bezug auf die Zielsetzung der Maßnahme",
      },
      {
        text: "Bedarfsanalyse (Bedürfnisse der Zielgruppe sowie Berücksichtigung der Angebote Dritter sowie der Schularten)",
        subjectAreas: [3],
      },
      {
        text: "Transparenz über die Angebote in der Region",
        subjectAreas: [3],
      },
      {
        text: "Zielrichtung der Maßnahmen korrespondierend mit der Zielstellung der BA / Berufsberatung",
        subjectAreas: [3],
      },
      {
        text: "Inhaltliche Anforderungen richten sich schwerpunktmäßig nach Berufsorientierung, Informationen über Berufe, Feststellung berufsrelevanter Neigungen und Kompetenzen, Unterstützung der Schüler bei der Wahl des Berufes",
        subjectAreas: [3],
      },
      {
        text: "Berücksichtigung sowohl der konkreten Bedarfe der Teilnehmenden (z.B. Erweiterung des Berufswahlspektrums) als auch Entwicklungen bei der Nachfrage auf dem Ausbildungs- und Arbeitsmarkt (z. B. MINT-Berufe)",
        subjectAreas: [3],
      },
      {
        text: "Bedarfs- und Zielgruppenorientierung (Schulart, Schülerzusammensetzung nach Geschlecht, Migrantenanteil, Milieu, regionaler Marktsituation u.ä., z.B. junge Menschen mit vieulfältigen und schwerwiegenden Hemmnissen, usw.)",
        subjectAreas: [3],
      },
    ],
  },
  16: {
    title: "Entwicklungs-, Eingliederungs-, Lernprozesse",
    description:
      "Dokumentiertes Verfahren zu den Methoden zur Förderung der individuellen Entwicklungs-, Eingliederungs- und Lernprozesse der Teilnehmenden (Teilnehmerbegleitung, Teilnehmervermittlung)",
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
        text: "Verfahren zur Eignungsfeststellung - Der Träger muss vor Beginn von Maßnahmen gemäß AZAV neben den fachlichen auch die persönliche Eignung der Teilnehmenden erheben und auswerten. Die persönliche Eignung ist hinsichtlich der Integrationschancen auf dem ersten Arbeitsmarkt während des Aufnahmegesprächs zu eruieren. In der abschließend ausformulierten Einschätzung sind unter anderem Aspekte wie berufliche, zeitliche und regionale Mobilität, die familiäre Situation sowie die Gehaltsvorstellungen einzubeziehen. Sollten in der Eignungsfeststellung Defizite in der persönlichen Eignung auftreten (z.B. Deutsch in Wort und Schrift, körperliche Einschränkungen), sind diese zunächst zu bewerten und in der Folge Strategien zur Anpassung in die abschließende Auswertung der Eignungsfeststellung einzubeziehen.",
        subjectAreas: [1, 4],
      },
      {
        text: "Verfahren zur Herleitung von Entwicklungs-, Eingliederungs-, Lehr- und Lernzielen",
        subjectAreas: [1, 4],
      },
      {
        text: "Verfahren zur Konzeption der Maßnahmeangebote des Trägers unter Berücksichtigung der individuellen Voraussetzungen der Teilnehmer",
        subjectAreas: [1, 4],
      },
      { text: "Methodeneinsatz", subjectAreas: [1, 4] },
      { text: "Überwachung von Lernprozessen", subjectAreas: [1, 4] },
      {
        text: "Erfassung von Teilnehmerpräsenz und Abbruchquoten (Fehlzeitenkonzept)",
        subjectAreas: [1, 4],
      },
      {
        text: "Erfassung der Erreichung von Entwicklungs-, Eingliederungs-bzw. Lehrgangszielen",
        subjectAreas: [1, 4],
      },
      {
        text: "Integrationsunterstützung durch Einführung in die Möglichkeiten und Funktionalitäten der Jobbörse und Einstellen der Bewerberprofile in die Jobbörse",
        subjectAreas: [1, 4],
      },
      {
        text: "Fehlzeitenkonzept (Auskunftspflicht nach § 318 Abs. 2 S. 2 Nr. 2 SGB III sowie Regelungen zur Zusammenarbeit mit den Agenturen für Arbeit und Jobcentern)",
        subjectAreas: [1, 4],
      },
      { text: "Verfahren zum Profiling, Assessment", subjectAreas: [2] },
      {
        text: "Verfahren zur Aufarbeitung von Bewerbungsunterlagen, Bewerbungstraining",
        subjectAreas: [2],
      },
      {
        text: "Verfahren zur Feststellung ergänzender Weiterbildungsbedarfe",
        subjectAreas: [2],
      },
      {
        text: "Methoden zur Förderung der Eigeninitiative und Aktivität (z.B. Projektaufgaben, Terminvorgaben)",
        subjectAreas: [2],
      },
      {
        text: "Verfahren des Vermittlungsprozesses: Vermittlungsplan, Aktivitätenplan mit Nachweisführung, Kennzahlen (z.B. zu Kontakten",
        subjectAreas: [2],
      },
      {
        text: "Dokumentation der Auftragsabwicklung / Kaufmännische Auftragsbearbeitung - und Abwicklung.",
        subjectAreas: [2],
      },
      { text: "Meldungen an BA, FKS, VerBIS u.a.", subjectAreas: [2] },
      { text: "Fristeinhaltung", subjectAreas: [2] },
      {
        text: "Anknüpfen an die Lebens- und Erfahrungswelt der Schüler / Zielgruppenorientierung",
        subjectAreas: [3],
      },
      {
        text: "Prozessorientierung und konzeptionelle Gestaltung (Gesamtkonzept des Trägers, inkl.",
        subjectAreas: [3],
      },
      {
        text: "Kostenregelung/Finanzierung/Kostenkalkulation/Preis) Aufbau und Abfolge von Modulen,",
        subjectAreas: [3],
      },
      {
        text: "Die organisatorische und inhaltliche Ausgestaltung sowie die Aufgaben aller an der Umsetzung",
        subjectAreas: [3],
      },
      {
        text: "Beteiligten und deren Interaktionen (z. B. in Leitfäden, Förderbausteine, Vergabeunterlagen) sind zu beschreiben",
        subjectAreas: [3],
      },
      {
        text: "Zieldefinition (Lernziele, Teilziele, Module zur Vermittlung und Vertiefung berufskundlicher Kenntnisse)",
        subjectAreas: [3],
      },
      {
        text: "Unterstützung bei der Feststellung von Interessen, Kompetenzen, gewonnenen Erkenntnissen und Erfahrungen (z.B. Profiling, Eignungsfeststellung, Stärken-/ Schwächenprofil, Berufswahlpass, o.a.)",
        subjectAreas: [3],
      },
      {
        text: "Hilfen zur selbstständigen Entscheidungsfindung (Berufswahlkompetenz)",
        subjectAreas: [3],
      },
      {
        text: "Realitätsbezug (z.B. auch durch Ergebnisse aus Profiling, Betriebsbesuchen usw.)",
        subjectAreas: [3],
      },
      {
        text: "Handlungsorientierung (Aktivierung und Motivierung der TN, Praxisphasen, aktives Lernen)",
        subjectAreas: [3],
      },
      {
        text: "Transfer im Berufswahlprozess und Sicherstellung der Nachbereitung in der Schule und in Kooperation mit der Berufsberatung",
        subjectAreas: [3],
      },
      {
        text: "Profiling mit der Zielsetzung der Feststellung der vorhandenen Kenntnisse und Fähigkeiten, der Eignung für berufliche Tätigkeiten aus allen Berufszweigen:\n - Aktuelle Situation auf dem Arbeitsmarkt\n - Erhebung der persönlichen und berufsrelevanten Daten\n - Eignungsabklärung durch Gegenüberstellung des erarbeiteten Bewerberprofils mit dem aktuellen Anforderungsprofil des jeweiligen Berufsbildes\n - Objektivität der Selbsteinschätzung",
        subjectAreas: [5],
      },
      {
        text: "Transferberatung nach dem Profiling:\n - Befähigung zur eigenständigen, angemessenen und wirkungsvollen Reaktion auf die Anforderungen des Arbeitsmarktes\n - Einzelberatung / Besprechung des Profilingbogens / Aktivierung / Motivation / gemeinsame Zielvereinbarung / Coaching / Folgegespräche / individuelles Vermittlungscoaching und individueller Bewerbungsstrategien",
        subjectAreas: [5],
      },
      {
        text: "Aussagekräftige vollständige VerBIS-Eintragungen: Minimierung des Arbeitsaufwandes für die Transfergesellschaft und die AA",
        subjectAreas: [5],
      },
      { text: "Erstellung einer Transfer-Mappe", subjectAreas: [5] },
      {
        text: "Verfahren / Prozess zur Planung, Durchführung der Maßnahme in Anpassung an GA/HEGA vorhanden",
        subjectAreas: [5],
      },
      {
        text: "Verfahren zur Konzeption von Weiterbildungs- und Qualifizierungsmaßnahmen zur Verbesserung der beruflichen Eingliederungsaussichten",
        subjectAreas: [5],
      },
      {
        text: "Fachliche Anforderungen an die Durchführung von Eingangsverfahren und Berufsbildungsbereich",
        subjectAreas: [6],
      },
      {
        text: "Verfahren zur Durchführung des Eingangsverfahrens und des Berufsbildungsbereiches",
        subjectAreas: [6],
      },
      {
        text: "Erstellung eines Eingliederungsplanes zur beruflichen Entwicklung eines Menschen mit Beeinträchtigungen",
        subjectAreas: [6],
      },
      {
        text: "Vermittlung von Arbeitsprozess-Qualifikationen und Schlüsselqualifikationen im Berufsbildungsbereich",
        subjectAreas: [6],
      },
      {
        text: "Schnittstelle Produktion (Arbeitsbereich) und Rehabilitation",
        subjectAreas: [6],
      },
      { text: "Arbeitsbegleitende Angebote", subjectAreas: [6] },
    ],
  },
  17: {
    title: "Bewertung von Maßnahmen",
    description:
      "Methoden der Bewertung der durchgeführten Maßnahmen sowie ihrer arbeitsmarktlichen Ergebnisse (TN-Befragungen, Befragungen von Betrieben, Erfolgsbeobachtung nach 6 Monaten)",
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
        text: "Überwachung der Entwicklungs-, Eingliederungs- bzw. Lernprozesse",
      },
      { text: "Erfassung der Teilnehmerpräsenz- und Abbruchquoten" },
      {
        text: "Erfassung, ob Entwicklungs-, Eingliederungs- bzw. Lernziele erreicht sind und die Maßnahmequalität gewährleistet ist",
      },
      {
        text: "Erfassung ausbildungs- und/oder arbeitsmarktlicher Eingliederungsergebnisse",
      },
      { text: "Umgang mit Evaluierungsergebnisse" },
      {
        text: "Ergebnissicherung und Dokumentation während des Maßnahmeverlaufs",
        subjectAreas: [3],
      },
      {
        text: "Ergebnissicherung und Nachhaltigkeit (Berichtswesen / Dokumentation / Nachbereitung durch Schule",
        subjectAreas: [3],
      },
      {
        text: "Im Zuge der Ergebnissicherung und der Dokumentation sind alle relevanten Daten über die",
        subjectAreas: [3],
      },
      {
        text: "Organisation und den Verlauf der Maßnahme festzuhalten. Das Berichtswesen ist ausgerichtet an der Zielsetzung der Maßnahme und umfasst die laufende Beobachtung (z. B. Statusbericht des Trägers, Maßnahmebesuche der Berufsberaterin / des Berufsberaters bzw. der Beraterin / des Beraters, Reha/SB) sowie den Abschlussbericht.",
        subjectAreas: [3],
      },
      {
        text: "Maßnahmeverlauf und Ergebnisse sind so zu dokumentieren, dass Erkenntnisse für die Planung und Gestaltung zukünftiger Maßnahmen genutzt werden können. Die Dokumentation ist so aufzubereiten, dass ein Transfer im Sinne von Good Practice ermöglicht wird.",
        subjectAreas: [3],
      },
      { text: "Abbruchquote / Integrationsquote", subjectAreas: [3] },
      {
        text: "Zufriedenheit der regionalen Auftraggeber /Netzwerkpartner/Teilnehmer",
        subjectAreas: [3],
      },
      {
        text: "Befragung der Teilnehmenden nach Schwierigkeiten in der persönlichen Einschätzung",
        subjectAreas: [6],
      },
      { text: "Verlaufsbeobachtung", subjectAreas: [3] },
      {
        text: "Einbringen der Beobachtung und Anmerkung des Ausbilders",
        subjectAreas: [6],
      },
      { text: "Spiegeln- Erfahren lassen", subjectAreas: [3] },
      {
        text: "Auseinandersetzung über die aufgenommenen Informationen",
        subjectAreas: [6],
      },
      {
        text: "Stärken, Schwächen und vorhandene Ressourcen sondieren",
        subjectAreas: [6],
      },
      {
        text: "Bewertung und Dokumentation der Arbeitsergebnisse im Eingliederungsplan",
        subjectAreas: [6],
      },
      {
        text: "Dokumentation und Auswertung der sozialen und beruflichen Anamnese",
        subjectAreas: [6],
      },
      {
        text: "Feststellung und Dokumentation des Rehabilitationspotentials",
        subjectAreas: [6],
      },
      {
        text: "Ziele für die Durchführung der Reha -Maßnahme erarbeiten (Identifikation anstreben)",
        subjectAreas: [6],
      },
      {
        text: "Vorschlag, welche berufsbildenden Leistungen zur Teilhabe am Arbeitsleben und welche ergänzenden Leistungen zur Eingliederung in das Arbeitsleben in Betracht kommen",
        subjectAreas: [6],
      },
      {
        text: "Welche Berufsfelder- nach Möglichkeit mindestens zwei- in Betracht kommen",
        subjectAreas: [6],
      },
      {
        text: "Klärung, ob eine ausgelagerte berufliche Bildung in Betracht kommt",
        subjectAreas: [6],
      },
    ],
  },
  18: {
    title: "Zusammenarbeit mit Dritten",
    description:
      "Art und Weise der kontinuierlichen Zusammenarbeit mit Dritten und der ständigen Weiterentwicklung dieser Zusammenarbeit",
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
      { text: "Zusammenarbeit mit Dritten" },
      { text: "Erfassung der Aktivitäten" },
      { text: "Bedarfsabhängige Entwicklung der Zusammenarbeit" },
      {
        text: "Kooperation des Trägers mit der Vielzahl von Akteuren (BA, Schule, Wirtschaft, Träger, Berufseinstiegsbegleiter, Ehrenamtliche, Eltern, Schüler usw.), die sich im Feld der Berufswahlvorbereitung und des Übergangs von der Schule in den Beruf engagieren.",
        subjectAreas: [3],
      },
      {
        text: "Vernetzung der Beteiligten auf regionaler Ebene unter Berücksichtigung bereits bestehender Netzwerke.",
        subjectAreas: [3],
      },
      {
        text: "Zusammenwirken verschiedener Akteure (Netzwerk Schule, Eltern, Betrieb) ggf. auch Abstimmung der Presse und Öffentlichkeitsarbeit (z.B. Verwendung des BA-Logos)",
        subjectAreas: [3],
      },
    ],
  },
  19: {
    title: "Beschwerdemanagement und Befragung der Teilnehmer und des Personal",
    description:
      "Beschreibung eines systematischen Beschwerdemanagements, einschließlich der Berücksichtigung regelmäßiger Befragungen der Teilnehmenden und des mit der Durchführung und Organisation der Maßnahme verantwortlichen Personals",
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
        text: "Befragung der Teilnehmenden / Auswertung der Befragung (Bei Neukunden (Zertifizierungsaudit) ist der Fragebogen einzureichen. Im Überwachungsaudit bzw im Wieder-/Neulassungsaudit ist der Fragebogen inkl. einer Auswertung der Befragung einzureichen)",
      },
      {
        text: "Befragung des Personals / Auswertung der Befragung (Bei Neukunden (Zertifizierungsaudit) ist der Fragebogen einzureichen. Im Überwachungsaudit bzw im Wieder-/Neulassungsaudit ist der Fragebogen inkl. einer Auswertung der Befragung einzureichen)",
      },
      { text: "System zur Auswertung der Beschwerden" },
      {
        text: "System zur Einleitung und Verfolgung von Vorbeugungs- und Korrekturmaßnahmen",
      },
      {
        text: "Evaluation (Befragungen im Netzwerk, Schüler, Eltern, Betrieb und Schule, Messung des Grads der Zielerreichung auf der Grundlage erhobener Kennzahlen oder Indikatoren)",
        subjectAreas: [3],
      },
      { text: "Befragung des Personal", subjectAreas: [3] },
      { text: "System zur Auswertung der Beschwerden", subjectAreas: [3] },
      {
        text: "System zur Einleitung und Verfolgung von Vorbeugungs- und Korrekturmaßnahmen",
        subjectAreas: [3],
      },
    ],
  },
  20: {
    title:
      "Übersicht über das aktuelle Dienstleistungsangebot / Maßnahmeangebot",
    description:
      "Übersicht über das aktuelle Dienstleistungsangebot / Maßnahmeangebot",
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
        text: "Übersicht über das aktuelle Angebot an Dienstleistungen / Maßnahmen / Ausschreibungen / Leistungen zur Teilhabe am Arbeitsleben",
      },
      { text: "Akquise und Werbematerial" },
    ],
  },
  21: {
    title:
      "Muster- Teilnehmervertrag / Vermittlungsvertrag / Ausbildungsvertrag / dreiseitiger Vertrag o.ä.",
    description: "Vertragliche Vereinbarungen mit den Teilnehmenden/Kunden",
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
        text: "Grundsätzlich ist zwischen dem Träger und dem Teilnehmenden ein Vertrag zu schließen",
      },
      {
        text: `Inhalte für einen Vertrag

      - Ziele, Inhalte und Angaben zur Art des Abschlusses
      - Dauer der Maßnahme, Hinweis zum Urlaubsanspruch bei Maßnahmen, die länger als 6 Monate dauern.
      - Kosten (inkl. Angaben zu der Höhe der Lehrgangsgebühren, Kosten für Arbeitskleidung, Lernmittel und Prüfungsstücke mit Hinweis zum Verbleib beim Teilnehmenden (oder Leihweise), Prüfungsgebühren, Zahlungsweise
      - Mitgeltende Dokumente (AGBs, Datenschutzvereinbarung, Hausordnung, Fehlzeitenregelung usw.) müssen dem Vertrag beigefügt werden.
      - Rechte und Pflichten der Vertragspartner
      - Angemessene Rücktrittsbedingungen vor Beginn der Maßnahme: Dem Teilnehmenden muss für den Fall, dass eine Förderung nach dem SGB III nicht erfolgt, bzw. bei Arbeitsaufnahme ein Rücktrittsrecht eingeräumt werden. Kosten dürfen hierbei nicht entstehen. Zusätzlich ist ein allgemeines Rücktrittsrecht innerhalb von 14 Tage nach Vertragsabschluss, längstens bis zum Beginn der Maßnahme einzuräumen.
      - Angemessene Kündigungsbedingungen während der Maßnahme: Die Teilnahme an einer Maßnahme der Arbeitsmarktdienstleistung muss mit einer Frist von höchstens 6 Wochen, erstmals zum Ende der ersten 3 Monate, sodann jeweils zum Ende der nächsten 3 Monate kündbar sein. Sofern eine Maßnahme in Abschnitten/Modulen kürzer als 3 Monate sind, angeboten wird, muss eine Kündigung zum Ende eines jeden Abschnitts/Moduls möglich sein.
      - Hinweis, dass dem Teilnehmenden nach Abschluss der Maßnahme eine Teilnahmebescheinigung mit Angaben zum Inhalt, zeitlichen Umfang und Ziel der Maßnahme ausgehändigt wird, unabhängig davon, ob der Teilnehmende mit Erfolg die Maßnahme abgeschlossen oder vorzeitig die Maßnahme beendet hat.
      - Informationspflicht bei Erhebung von personenbezogenen Daten gemäß Kap. 3 Art. 13 der Datenschutzgrundverordnung (DSGVO)`,
      },
      {
        text: "Teilnehmer- und Praktikumsvertrag",
        subjectAreas: [1, 4],
      },
      {
        text: "Schriftlicher Vertrag gemäß § 296 (1 bis 4) SGB III",
        subjectAreas: [2],
      },
      {
        text: "Angaben zu den Leistungen, die zur Vorbereitung und Durchführung der Vermittlung erforderlich sind, z.B. die Feststellung der Kenntnisse des Arbeitssuchenden sowie die mit der Vermittlung verbundene Berufsberatung.",
        subjectAreas: [2],
      },
      {
        text: "Regelung der Vergütung im Vertrag gemäß § 83 (4), S. 3 Nr. 2 oder Vergütung gemäß § 2 (1) SGB IX",
        subjectAreas: [2],
      },
      {
        text: "Vergütung bei Ausbildungsvermittlung nur durch Arbeitgeber/Ausbildungsbetrieb",
        subjectAreas: [2],
      },
      {
        text: "Informationspflicht bei Erhebung von personenbezogenen Daten gemäß Kap. 3 Art. 13 der Datenschutzgrundverordnung (DSGVO)",
        subjectAreas: [2],
      },
      {
        text: "Höhe des Entgeltes in der Transfergesellschaft",
        subjectAreas: [5],
      },
      {
        text: "Aufstockungsbetrag des Transferkurzarbeitergeldes",
        subjectAreas: [5],
      },
      { text: "Umfang des Urlaubes", subjectAreas: [5] },
      { text: "Weihnachtsgeld", subjectAreas: [5] },
      {
        text: "Behandlung von z. B. Betriebsrentenansprüchen",
        subjectAreas: [5],
      },
      {
        text: "Maßnahmen der beruflichen Neuorientierung, Vermittlung und Qualifizierung des Arbeitnehmers (Erstellung eines Berufswege- und Qualifizierungsplanes, Unterstützung der Integration in den ersten Arbeitsmarkt durch Beratung und vermittlungsunterstützende Leistungen. Ggf. Durchführung von Qualifizierungsmaßnahmen; Vermittlung von betrieblichen Einarbeitungsprogrammen (Praktika)",
        subjectAreas: [5],
      },
      {
        text: "Informationspflicht bei Erhebung von personenbezogenen Daten gemäß Kap. 3 Art. 13 der Datenschutzgrundverordnung (DSGVO)",
        subjectAreas: [5],
      },
      {
        text: "Abschluss eines Teilnehmervertrages bei Aufnahme in das Eingangsverfahren und den Berufsbildungsbereich",
        subjectAreas: [6],
      },
      {
        text: "Abschluss eines Werkstattvertrages als Arbeitsvertrag zwischen Mitarbeiter und dem Unternehmen bei Wechsel in den Arbeitsbereich",
        subjectAreas: [6],
      },
      { text: "Anlage Vereinbarung zur Entgeltzahlung", subjectAreas: [6] },
      { text: "Werkstattordnung", subjectAreas: [6] },
      {
        text: "Vertragliche Ergänzungen bei Tätigkeiten auf einem Außenarbeitsplatz im Berufsbildungsbereich und im Arbeitsbereich",
        subjectAreas: [6],
      },
      {
        text: "Angaben zum Inhalt, zeitlichem Umfang und Ziel der Maßnahme (WV/BBB)",
        subjectAreas: [6],
      },
      {
        text: "Vertragliche Regelungen für alle Reha-Dienstleistungen (z.B. unterstützte Beschäftigung)",
        subjectAreas: [6],
      },
      {
        text: "Inhalte: Informationelles Selbstbestimmungsrecht, Datenschutz, Verpflichtung zur Zusammenarbeit, Abläufe, medizinische Aufklärung, Reha-Zielvereinbarung",
        subjectAreas: [6],
      },
      {
        text: "Informationspflicht bei Erhebung von personenbezogenen Daten gemäß Kap. 3 Art. 13 der Datenschutzgrundverordnung (DSGVO)",
        subjectAreas: [6],
      },
    ],
  },
};
