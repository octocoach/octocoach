import type { BaseTranslation } from "../i18n-types";

const en = {
  ACCOUNT: "Account",
  ACCREDITATION: "Accreditation",
  ADMIN: "Admin",
  JOBS: "Jobs",
  TASKS: "Tasks",
  EMPLOYERS: "Employers",
  SKILLS: "Skills",
  skillLevels: {
    novice: {
      title: "Novice",
      description:
        "You're new to this skill and rely on step-by-step instructions or rules to perform tasks. You may not fully understand the broader context.",
    },
    advanced_beginner: {
      title: "Advanced Beginner",
      description:
        "You have some experience and can perform tasks beyond strict rule-following. You recognize patterns but may not fully grasp their significance.",
    },
    competent: {
      title: "Competent",
      description:
        "You've developed a decent understanding of the skill and can manage complex situations. You can plan and make decisions based on your experience.",
    },
    proficient: {
      title: "Proficient",
      description:
        "You can handle most situations in this skill area confidently. You have a deeper understanding, can reflect on your actions, and adapt to new situations.",
    },
    expert: {
      title: "Expert",
      description:
        "You have a deep, intuitive understanding of the skill. You can diagnose problems and innovate solutions effortlessly. You don't rely on rules but rather your vast experience.",
    },
  },
  languages: {
    en: "English",
    de: "Deutsch",
  },
  measures: {
    readMore: "Read more",
  },
  enrollment: {
    applyNow: "Apply now",
    modules: "Modules",
    requirements: "Requirements",
    status: {
      pending: "Your enrollment is pending. We will be in touch shortly.",
    },
  },
  theme: "Theme",
  systemTheme: "system",
  language: "Language",
  changingLanguage: "Changing language...",
  select: "Select an item...",
  submit: "Submit",
  confirm: "Confirm",
  back: "Back",
  cancel: "Cancel",
  meetings: {
    type: {
      consultation: "consultation",
      coaching: "coaching",
    },
    newMeeting: "Schedule a meeting with",
    booked: "Your meeting with {name:string} is scheduled for:",
    join: "Join",
    joinIn: "You will be able to join in {time:string}",
    leave: "Leave call",
    cameraOn: "Turn on camera",
    cameraOff: "Turn off camera",
    microphoneOn: "Turn on microphone",
    microphoneOff: "Turn off microphone",
    presentNow: "Present now",
    stopPresenting: "Stop presenting",
    upcomingMeetings: "Upcoming meetings",
  },
  measure: {
    fundedBy: "100% funded by the",
    application: {
      application: "Application for",
      screeningQuestions:
        "Please answer some questions to help us assess your eligibility for this training program...",
      thankYou: "Thank you for your application!",
      weWillBeInTouch: "We will be in touch via {email:string} shortly.",
      whileWaiting:
        "In the meantime, here are some things you can do while you wait for our response...",
    },
  },
  address: {
    line1: "Address line 1",
    line2: "Address line 2",
    postcode: "Postcode",
    city: "City",
    state: "State",
  },

  privacyPolicy: "Privacy Policy",
  termsOfUse: "Terms of Use",
} satisfies BaseTranslation;

export default en;
