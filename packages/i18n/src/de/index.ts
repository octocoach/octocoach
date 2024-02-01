import type { Translation } from "../i18n-types";

const de = {
  ACCOUNT: "Konto",
  ACCREDITATION: "Zulassung",
  ADMIN: "Verwaltung",
  JOBS: "Jobs",
  TASKS: "Aufgaben",
  EMPLOYERS: "Arbeitgeber",
  SKILLS: "Skills",
  skillLevels: {
    novice: {
      title: "Neuling",
      description:
        "Du bist neu in dieser Fertigkeit und verlässt dich auf Schritt-für-Schritt-Anweisungen oder Regeln, um Aufgaben auszuführen. Möglicherweise verstehst du den größeren Zusammenhang nicht ganz.",
    },
    advanced_beginner: {
      title: "fortgeschrittene Anfänger",
      description:
        "Du hast einige Erfahrung und kannst Aufgaben erledigen, die über das strikte Befolgen von Regeln hinausgehen. Du erkennst Muster, verstehst aber vielleicht nicht ganz ihre Bedeutung.",
    },
    competent: {
      title: "Kompetenter",
      description:
        "Du hast ein gutes Verständnis für die Fähigkeit entwickelt und kannst komplexe Situationen bewältigen. Du kannst planen und Entscheidungen auf der Grundlage deiner Erfahrung treffen.",
    },
    proficient: {
      title: "Gewandter",
      description:
        "Du kannst die meisten Situationen in diesem Bereich selbstbewusst meistern. Du hast ein tieferes Verständnis, kannst dein Handeln reflektieren und dich auf neue Situationen einstellen.",
    },
    expert: {
      title: "Experte",
      description:
        "Du hast ein tiefes, intuitives Verständnis der Fertigkeit. Du kannst Probleme diagnostizieren und mühelos innovative Lösungen entwickeln. Du verlässt dich nicht auf Regeln, sondern auf deine große Erfahrung.",
    },
  },
  languages: {
    en: "English",
    de: "Deutsch",
  },
  measures: {
    readMore: "Mehr erfahren",
  },
  enrollment: {
    applyNow: "Jetzt bewerben!",
    modules: "Bausteine",
    requirements: "Anforderungen",
    status: {
      pending:
        "Deine Anmeldung wird bearbeitet. Wir werden uns in Kürze bei dir melden.",
    },
  },
} satisfies Translation;

export default de;
