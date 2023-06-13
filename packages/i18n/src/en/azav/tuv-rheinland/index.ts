import type { FileSchema } from "@octocoach/azav/src/expert-body/tuv-rheinland/file-schema";

export const tuvRheinland: FileSchema = {
  0: {
    title: "Application for education providers",
    description: "Application for Approval as an Educational Provider",
    tips: [
      {
        text: "Please send the legally binding signed application in full with all attachments as a compressed and zipped file by mail to: fks@de.tuv.com.",
      },
      {
        text: "The TÜV Rheinland mail system transfers mail attachments up to a size of 20 MB. If larger files are to be transferred, the TUVbox system can be used. To activate the account, please contact the specified TÜV contact persons.",
      },
    ],
  },
  1: {
    title: "Proof of company name",
    description: "Proof of business name and/or legal form",
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
        text: "Excerpt from the register of associations or commercial register, not older than 6 months",
      },
      { text: "Shareholders' agreement for GbR" },
      {
        text: "Owner-managed companies must include the name in the company name",
      },
      {
        text: "In the extract from the register or in the business registration, the business purpose of the company must clearly refer to the activity of the company e.g. education, training, mediation, workshop for the disabled, etc.",
      },
      {
        text: 'Companies whose business purpose is predominantly not to be seen in training and further education must include an addition in the carrier name, e.g. "Training department", "Dept. of further education and training" or similar.',
      },
      {
        text: "Business registration according to § 14 GewO for Subject Area 2",
        subjectAreas: [2],
      },
    ],
  },
  2: {
    title: "Financial Capacity",
    description: "Evidence of the institution's financial capacity",
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
      { text: "Certificate of a tax advisor/auditor or" },
      { text: "Balance sheets or" },
      { text: "Bank statement or" },
      { text: "Profit / loss statement or" },
      { text: "Income and expenditure account or" },
      { text: "Controlling and planning documents" },
      {
        text: "Current or from the last business year and signed by the assessor",
      },
      { text: "No self-created document" },
      {
        text: "Auditor's report pursuant to Section 317 HGB not sufficient",
      },
      {
        text: "For new approvals (certification audit), a business plan can be submitted if necessary",
      },
      {
        text: "Declaration and legally binding signature of the applicant on insolvency proceedings (see application)",
      },
    ],
  },
  3: {
    title: "Tax Certificate",
    description: "Confirmation of financial capacity",
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
        text: "Current tax certificate from the tax office (not older than 3 months)",
      },
      {
        text: "Annex to the notice of corporate income tax is not a tax certificate!",
      },
    ],
  },
  4: {
    title: "Public Liability Insurance",
    description:
      "Proof of the financial capacity of the executing agency - Proof of the conclusion of an employer's liability insurance policy",
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
        text: "A commercial activity is always associated with risks. Claims for damages from third parties cannot be ruled out despite the greatest care.",
      },
      {
        text: "In any case, the company is liable for damages caused by the company or its employees in the course of their professional activities, as well as damages arising from land and building property or possessions. In order to make the risk calculable from an entrepreneurial point of view and not to impair the financial performance, proof of business liability insurance must be provided.",
      },
    ],
  },
  5: {
    title: "Accident Prevention and Insurance Association Certificate",
    description:
      "Proof of registration with the VBG statutory accident insurance fund",
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
        text: "Companies of all types must register with a professional association within one week of their establishment.",
      },
      {
        text: "In the case of inter-company training measures carried out by an educational institution (with or without an in-company internship), insurance cover is provided in accordance with Section 2 (1) No. 2 SGB VII; the accident insurance institution responsible for the educational institution is generally responsible for accident insurance cover for the entire measure (including in-company internships).",
      },
      {
        text: "See the information sheet for educational institutions and measure providers on accident insurance responsibility for participants in vocational and labor market measures.",
      },
    ],
  },
  6: {
    title: "Approvals and Recognitions",
    description:
      "Presentation of credentials - third party approvals and certificates",
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
      { text: "Certificates from other certification bodies (AZAV, ISO)" },
      {
        text: "Third-party recognition (state recognition, e.g. as an alternative school)",
      },
      { text: "Approval as a driving school" },
      {
        text: "Service descriptions or contracts for measures in Subject Area 3 (§§ 48-80 SGB III)",
        subjectAreas: [3],
      },
      {
        text: "Proof of vocational rehabilitation facilities, e.g. vocational promotion centers, vocational training centers and comparable facilities according to § 51 SGB IX, workshops for the disabled according to § 227 SGB IX",
      },
      {
        text: "Service descriptions or contracts for special services according to § 117 SGB III (product variants in department 6, e.g. BvB-Reha, bbA, InRAM, bbA, bbUReha, UB, DIA- AM/UB)",
      },
      {
        text: "Recognition as an independent youth welfare organization in accordance with § 75 SGB VIII",
      },
      {
        text: "Confirmed specialist concept for entry procedure/vocational training area (§ 57 SGB IX) or specialist concept for entry procedure/vocational training area at other service providers in accordance with § 60 SGB IX",
      },
      {
        text: "The recognitions must be issued to the legal entity",
      },
    ],
  },
  7: {
    title: "Organizational Chart",
    description: "Company Organization Chart",
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
        text: "Structural and procedural organization, current and valid organization chart",
      },
    ],
  },
  8: {
    title: "Process Overview",
    description: "Current process landscape or process overview",
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
        text: "Related to the activities and the (requested) subject areas of the institution",
      },
    ],
  },
  9: {
    title: "Infrastructure",
    description: "Description of the infrastructure - facility infrastructure",
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
        text: "Lease agreements, room plans, floor plan drawings are checked on site during the audit process",
      },
      {
        text: "Lease agreements must include the purpose of use, office and training rooms or training workshops.",
      },
      {
        text: "The carrier's locations are approved on a site-by-site basis and in relation to the respective subject area",
      },
      {
        text: "When approving locations for specific subject areas, proof must be provided of the spatial and technical equipment required for the training objective and content.",
      },
      {
        text: "The locations must comply with the AZAV specifications in terms of size, equipment, occupational safety, health protection",
      },
      {
        text: "The specifications of the Workplace Ordinance (ArbeitsstättenVO) in the currently valid version in conjunction with the Workplace Guidelines, the Display Screen Equipment Ordinance (BildschirmarbeitsVO) in its current version and the regulations of the responsible accident insurance (employers' liability insurance associations) are to be included and reviewed when selecting and using the locations",
      },
      {
        text: "Temporary sites can be approved up to a maximum of the next surveillance audit. A document check takes place in the offsite procedure",
      },
      {
        text: "Training room with at least 12 places for participants, office, consultation room, break (social) room, workshops in the case of practical further training",
        subjectAreas: [1, 5, 6],
      },
      {
        text: "Bei Maßnahmen mit Einzelcoaching reicht ein Büro- und Beratungsraum aus",
        subjectAreas: [1, 4, 5, 6],
      },
      {
        text: "Office and consulting room",
        subjectAreas: [2, 5],
      },
      {
        text: 'The specific infrastructure requirements depend on the service description on which the respective measure is based. For example, for abH, BvB and BaE integrative, extensive room capacities are required, for BvB integrative and BaE integrative, additional rooms for the specialized practice "workshops" must be provided. AbH usually requires several (smaller) classrooms in order to teach different groups at the same time.',
        subjectAreas: [3],
      },
      {
        text: "Training room with at least 12 places for participants, office, consultation room, break (social) room, workshops in the case of practical further training",
        subjectAreas: [4, 5, 6],
      },

      {
        text: "Spatial and material equipment (workshops) corresponding to the range of services, including social, changing and sanitary rooms.",
        subjectAreas: [6],
      },
      {
        text: "Accessibility in the sense of § 4 BGG with special consideration of possible specialization on certain types of disability is to be ensured in principle",
        subjectAreas: [6],
      },
      {
        text: "If services are offered in accordance with § 33 para. 3 nos. 3 and 4 SGB IX, the spatial and material equipment must take particular account of the relevant training regulations",
        subjectAreas: [6],
      },
    ],
  },
  10: {
    title: "Human Resources",
    description: "Personnel data",
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
        text: "Personnel employed in the individual departments (1 to 6), such as teachers, trainers, social pedagogues, social workers, coaches, employment agents, personnel in rehabilitation facilities, integration specialists, etc.",
      },
      {
        text: "In the annex personnel (teaching/professional staff, employment mediators, social/educational staff), information on the personnel employed in the respective field of work (subject areas) must be provided.",
      },
      {
        text: "The application must include information about the management of the company (head, deputies).",
      },
      {
        text: "Evidence of education and professional experience of the director and staff through education, certificates, additional qualifications, professional career, two-year experience in adult education will be seen in the audit procedure. It is not necessary to send them together with the application.",
      },
      {
        text: "Professional and pedagogical suitability of the director, teachers and professional staff,",
        subjectAreas: [1, 3, 4],
      },
      {
        text: "Proof of pedagogical aptitude through master's examination, instructor aptitude (AdA) or",
        subjectAreas: [1, 3, 4],
      },
      {
        text: "Additional pedagogical training in adult vocational education; or",
        subjectAreas: [1, 3, 4],
      },
      { text: "Comparable additional qualifications", subjectAreas: [1] },
      {
        text: "Recognition of professional and pedagogical qualifications by third parties (e.g. by state regulations, a competent supervisory authority, etc.)",
        subjectAreas: [1, 3, 4],
      },
      {
        text: "Evidence of at least 2 years' experience in vocational education, preferably in adult education.",
        subjectAreas: [1, 3, 4],
      },
      {
        text: "If less than 2 years of experience in vocational education, evidence of supervised coaching or instruction by an experienced adult education teacher or professional must be provided.",
        subjectAreas: [1, 3, 4],
      },
      {
        text: "Presentation of the actual deployment in the educational institution (balanced ratio of employed and external faculty and technical staff)",
        subjectAreas: [1, 3, 4],
      },
      {
        text: "Professionally qualified and experienced in the development and qualification of young people.",
        subjectAreas: [3],
      },
      {
        text: "Specialized personnel, e.g. experts with professional experience, trainers, teachers, social pedagogical and special pedagogical specialists, or specialists with different experience and double or multiple qualifications (e.g. trainers with additional special pedagogical qualification).",
        subjectAreas: [3],
      },
      {
        text: "Particularly in Department 3, the requirements for personnel vary considerably. Depending on the service to be provided, these can only be clearly derived from the service description of the public procurement procedure Part B. As a rule, fixed personnel keys are specified for the various professions. The same applies to the qualifications to be met by the staff (recognised diplomas and qualifications accepted as substitutes).",
        subjectAreas: [3],
      },
      {
        text: "The institution (provider) has qualified staff with experience in rehabilitation and participation, according to the specific needs.",
        subjectAreas: [6],
      },
      {
        text: "Evidence of this will be provided in the form of school, university and training qualifications, including evidence of non-formal qualifications and training undertaken.",
        subjectAreas: [6],
      },
      {
        text: "More details on the use of trainers, social pedagogues, teachers and psychologists can be found in the professional concept for institutions according to § 51 SGB IX.",
        subjectAreas: [6],
      },
      {
        text: "For the personnel approach of trainers, social pedagogues, teachers and psychologists, the specifications for the personnel key in the performance descriptions of comparable measures apply as a minimum standard.",
        subjectAreas: [6],
      },
      {
        text: "Physician and psychologist staffing ratios are based on predominant types of disabilities.",
        subjectAreas: [6],
      },
      {
        text: "Rehabilitation Pedagogical Additional Qualification (ReZA) for Training Regulations for People with Disabilities",
        subjectAreas: [6],
      },
      {
        text: "Personnel key according to Workshop Ordinance (WVO)",
        subjectAreas: [6],
      },
    ],
  },
  11: {
    title: "Company Profile / Mission Statement",
    description: "Quality Assurance System Requirements",
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
      { text: "Company profile of the institution" },
      {
        text: 'Define the institution\'s "customers" and demonstrate that customer expectations are being met and integrated into the continuous improvement process.',
      },
      {
        text: "Aligning the mission statement with the education and labor market",
      },
      {
        text: "Internally and externally communicated mission statement that is regularly reviewed and adjusted as necessary",
      },
    ],
  },
  12: {
    title: "Company Organization",
    description:
      "Business organization and management, including setting operational business goals and conducting internal audits of business operations",
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
      { text: "Structure and process organization (see items 07 and 08)" },
      { text: "Company Goals" },
      { text: "Subject Area (SA 1 - SA 6) operational targets" },
      {
        text: "Procedures for establishing and reviewing corporate policies and objectives (internal audit)",
      },
      {
        text: "The organizational structure is presented in point 07 Organizational Chart. The focus here is on the procedures for defining the quality policy and quality objectives.",
      },
    ],
  },
  13: {
    title: "Staff qualification and further training",
    description:
      "Goal-oriented approach to the qualification and training of management, teaching and technical staff (specialists)",
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
        text: "Personnel development concept including training and personnel policy",
      },
      { text: "Identifying employee training needs" },
      { text: "Evaluation of training effectiveness (success)" },
      { text: "Planning of regular team meetings" },
    ],
  },
  14: {
    title: "Agreed goals and metrics",
    description:
      "Goal agreements based on collected metrics and indicators, including measurement of goal achievement and control of ongoing optimization processes",
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
      { text: "Current and measurable organizational and quality goals" },
      {
        text: "Regular review of goal achievement (management review)",
      },
      { text: "Further development of the goals and corrective measures" },
    ],
  },
  15: {
    title: "Design and delivery of training",
    description:
      "Taking into account labor market developments in the design and implementation of employment promotion measures (labor market analysis)",
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
      { text: "Labor Market Analysis" },
      {
        text: "Taking into account labor market developments in the design and implementation of employment policies",
      },
      {
        text: "Up-to-date and systematic analysis of customer needs in relation to the objective of the measure",
      },
      {
        text: "Needs analysis (needs of the target group as well as consideration of third-party offerings and types of schools)",
        subjectAreas: [3],
      },
      {
        text: "Transparency about what is available in the region",
        subjectAreas: [3],
      },
      {
        text: "Aim of the measures according to the aim of the BA/Career Counseling",
        subjectAreas: [3],
      },
      {
        text: "Content requirements focus on career orientation, information about careers, identification of career-related skills and competencies, and helping students make career choices.",
        subjectAreas: [3],
      },
      {
        text: "Addressing both the specific needs of participants (e.g., broadening the range of career choices) and trends in training and labor market demand (e.g., STEM occupations).",
        subjectAreas: [3],
      },
      {
        text: "Needs and target group orientation (type of school, gender composition of students, proportion of migrants, milieu, regional market situation, etc., e.g. young people with multiple and severe barriers, etc.)",
        subjectAreas: [3],
      },
    ],
  },
  16: {
    title: "Development, Inclusion, Learning",
    description:
      "Documented procedures on the methods used to promote the individual development, integration and learning processes of the participants (participant accompaniment, participant placement).",
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
        text: "Aptitude Determination Procedure - Prior to commencing AZAV measures, the provider must assess and evaluate the personal aptitude of participants in addition to their professional aptitude. Personal aptitude must be determined during the intake interview with regard to integration opportunities in the primary labor market. The final assessment must include aspects such as occupational, temporal and regional mobility, family situation and salary expectations. If the aptitude assessment reveals deficits in personal aptitude (e.g. written and spoken German, physical limitations), these must first be evaluated and then strategies for adaptation must be included in the final evaluation of the aptitude assessment.",
        subjectAreas: [1, 4],
      },
      {
        text: "Procedures for deriving developmental, inclusion, teaching, and learning goals.",
        subjectAreas: [1, 4],
      },
      {
        text: "Procedures for designing the institution's course offerings, taking into account the individual needs of participants",
        subjectAreas: [1, 4],
      },
      { text: "Use of methods", subjectAreas: [1, 4] },
      { text: "Learning process monitoring", subjectAreas: [1, 4] },
      {
        text: "Tracking attendance and dropout rates (absenteeism)",
        subjectAreas: [1, 4],
      },
      {
        text: "Track achievement of development, integration, and training goals.",
        subjectAreas: [1, 4],
      },
      {
        text: "Integration support by introducing the features and functionalities of the job board and posting candidate profiles on the job board.",
        subjectAreas: [1, 4],
      },
      {
        text: "Concept of absenteeism (obligation to provide information according to § 318 (2) Sentence 2 No. 2 SGB III and regulations on cooperation with the employment agency and job center)",
        subjectAreas: [1, 4],
      },
      { text: "Profiling, Assessment Procedures", subjectAreas: [2] },
      {
        text: "Procedures for preparing application materials, application training",
        subjectAreas: [2],
      },
      {
        text: "Procedure for identifying additional training needs",
        subjectAreas: [2],
      },
      {
        text: "Methods to encourage personal initiative and activity (e.g., project assignments, deadlines)",
        subjectAreas: [2],
      },
      {
        text: "Procedures of the mediation process: mediation plan, activity plan with record keeping, key figures (e.g. on contacts)",
        subjectAreas: [2],
      },
      {
        text: "Documentation of order processing / commercial order processing - and settlement.",
        subjectAreas: [2],
      },
      { text: "Reports to BA, FKS, VerBIS etc.", subjectAreas: [2] },
      { text: "Fristeinhaltung", subjectAreas: [2] },
      {
        text: "Connecting to students' lives and experiences/Target audience",
        subjectAreas: [3],
      },
      {
        text: "Process orientation and conceptual design (overall concept of the institution, including cost regulation/financing/cost calculation/pricing), structure and sequence of modules, organizational and content-related design as well as the tasks of all parties involved in the implementation.",
        subjectAreas: [3],
      },
      {
        text: "Describe stakeholders and their interactions (e.g., in guides, funding modules, award documents).",
        subjectAreas: [3],
      },
      {
        text: "Definition of objectives (learning objectives, sub-objectives, modules for teaching and deepening professional knowledge)",
        subjectAreas: [3],
      },
      {
        text: "Assistance in identifying interests, competencies, acquired knowledge and experience (e.g. profiling, aptitude assessment, strengths/weaknesses profile, career choice passport, etc.)",
        subjectAreas: [3],
      },
      {
        text: "Support for independent decision making (competence in career choice)",
        subjectAreas: [3],
      },
      {
        text: "Relation to reality (e.g. also through results from profiling, company visits, etc.)",
        subjectAreas: [3],
      },
      {
        text: "Action-oriented (activating and motivating participants, practical phases, active learning)",
        subjectAreas: [3],
      },
      {
        text: "Transfer in the career choice process and ensure follow-up in school and in collaboration with career counseling",
        subjectAreas: [3],
      },
      {
        text: "Profiling with the aim of determining the existing knowledge and skills, the suitability for professional activities from all occupational fields:\n - Current situation on the labor market\n - Collection of personal and professionally relevant data\n - Suitability clarification by comparing the developed applicant profile with the current requirement profile of the respective occupational profile\n - Objectivity of the self-assessment.",
        subjectAreas: [5],
      },
      {
        text: "Transfer counseling after profiling:\n - empowerment to respond independently, appropriately and effectively to the demands of the labor market\n - individual counseling / discussion of the profiling sheet / activation / motivation / joint agreement on goals / coaching / follow-up interviews / individual placement coaching and individual application strategies.",
        subjectAreas: [5],
      },
      {
        text: "Meaningful, complete VerBIS entries: Minimize workload for transfer company and AA",
        subjectAreas: [5],
      },
      { text: "Creation of a transfer folder", subjectAreas: [5] },
      {
        text: "Procedure / process for planning, implementation of the measure in accordance with GA/HEGA in place.",
        subjectAreas: [5],
      },
      {
        text: "Procedures for designing training and qualification measures to improve the prospects of occupational integration",
        subjectAreas: [5],
      },
      {
        text: "Technical requirements for the implementation of the admission procedure and the vocational training area",
        subjectAreas: [6],
      },
      {
        text: "Procedure for the implementation of the admission procedure and the vocational training area",
        subjectAreas: [6],
      },
      {
        text: "Preparation of an integration plan for the professional development of a person with disabilities",
        subjectAreas: [6],
      },
      {
        text: "The teaching of work process skills and key skills in the field of vocational education and training",
        subjectAreas: [6],
      },
      {
        text: "Interface production (work area) and rehabilitation",
        subjectAreas: [6],
      },
      { text: "Work-related offers", subjectAreas: [6] },
    ],
  },
  17: {
    title: "Evaluation of educational activities",
    description:
      "Methods for evaluating the implemented measures and their labor market results (participant surveys, company surveys, 6-month success monitoring).",
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
        text: "Monitoring of the development, integration or learning processes",
      },
      { text: "Recording of participant attendance and dropout rates" },
      {
        text: "Determine whether development, integration, or learning objectives have been met and whether the quality of the intervention is assured.",
      },
      {
        text: "Recording of training and/or labor market integration outcomes.",
      },
      { text: "Dealing with Evaluation Results" },
      {
        text: "Securing results and documentation during the course of the measure",
        subjectAreas: [3],
      },
      {
        text: "Securing results and sustainability (reporting / documentation / follow-up by school)",
        subjectAreas: [3],
      },
      {
        text: "In the course of securing results and documentation, all relevant data on the organization and progress of the measure must be recorded. The reporting system is aligned with the objectives of the measure and includes ongoing monitoring (e.g., status report by the provider, visits to the measure by the vocational counselor or counselor, rehab/SB) and the final report.",
        subjectAreas: [3],
      },
      {
        text: "The process and results of the measure must be documented in such a way that the lessons learned can be used for the planning and design of future measures. The documentation must be prepared in such a way that it can be transferred as good practice.",
        subjectAreas: [3],
      },
      { text: "Dropout/Integration Rate", subjectAreas: [3] },
      {
        text: "Regional customer/network partner/participant satisfaction",
        subjectAreas: [3],
      },
      {
        text: "Ask participants about difficulties with personal assessment",
        subjectAreas: [6],
      },
      { text: "Progress Monitoring", subjectAreas: [3] },
      {
        text: "Inclusion of trainer observations and comments.",
        subjectAreas: [6],
      },
      { text: "Reflect- Allow to experience", subjectAreas: [3] },
      {
        text: "Discussion of recorded information",
        subjectAreas: [6],
      },
      {
        text: "Exploration of strengths, weaknesses, and resources in place",
        subjectAreas: [6],
      },
      {
        text: "Evaluation and documentation of the work results in the integration plan",
        subjectAreas: [6],
      },
      {
        text: "Documentation and evaluation of the social and professional history",
        subjectAreas: [6],
      },
      {
        text: "Determination and documentation of the potential for rehabilitation",
        subjectAreas: [6],
      },
      {
        text: "Develop goals for implementing the rehabilitation intervention (strive for identification)",
        subjectAreas: [6],
      },
      {
        text: "Suggestion of which work participation benefits and which additional work integration benefits should be considered",
        subjectAreas: [6],
      },
      {
        text: "Which professions, preferably at least two, can be considered?",
        subjectAreas: [6],
      },
      {
        text: "Determine if outsourced training is an option",
        subjectAreas: [6],
      },
    ],
  },
  18: {
    title: "Collaboration with third parties",
    description:
      "The nature of the ongoing collaboration with third parties and the ongoing development of that collaboration.",
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
      { text: "Collaboration with third parties" },
      { text: "Recording activities" },
      { text: "Needs-based development of collaboration" },
      {
        text: "Cooperation of the institution with the multitude of actors (BA, school, economy, sponsors, career transition counselors, volunteers, parents, students, etc.) who are involved in the field of career preparation and the transition from school to work.",
        subjectAreas: [3],
      },
      {
        text: "Networking of stakeholders at the regional level, taking into account existing networks.",
        subjectAreas: [3],
      },
      {
        text: "Cooperation of different actors (network school, parents, company), if necessary also coordination of press and public relations (e.g. use of the BA logo)",
        subjectAreas: [3],
      },
    ],
  },
  19: {
    title: "Complaint management and participant and staff surveys",
    description:
      "Description of a systematic complaints management system, including consideration of regular surveys of participants and staff responsible for implementing and organizing the measure.",
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
        text: "Survey of participants / evaluation of the survey (For new clients (certification audit), the questionnaire must be submitted. In case of surveillance audit or re-registration audit, the questionnaire including the evaluation of the survey shall be submitted).",
      },
      {
        text: "Survey of personnel / evaluation of the survey (For new clients (certification audit), the questionnaire must be submitted. In case of surveillance audit or re-registration audit, the questionnaire including the evaluation of the survey shall be submitted).",
      },
      { text: "System for evaluating complaints" },
      {
        text: "System for initiating and tracking preventive and corrective measures",
      },
      {
        text: "Evaluation (surveys in the network, students, parents, company and school, measurement of the degree of goal achievement based on collected key figures or indicators)",
        subjectAreas: [3],
      },
      { text: "Interviewing the staff", subjectAreas: [3] },
      {
        text: "System for initiating and tracking preventive and corrective measures",
        subjectAreas: [3],
      },
    ],
  },
  20: {
    title: "Overview of Services / Measures",
    description:
      "Overview of the current range of services / range of measures",
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
        text: "Overview of current services / measures / job offers / services for participation in working life",
      },
      { text: "Customer acquisition and promotional materials" },
    ],
  },
  21: {
    title:
      "Sample Participant Contract / Mediation Contract / Training Contract / Tripartite Contract or similar.",
    description: "Contractual Agreements with Participants/Customers",
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
        text: "In principle, a contract is to be concluded between the carrier and the participant.",
      },
      {
        text: `Content for a contract

        - Objectives, contents and information about the type of contract
        - Duration of the measure, reference to holiday entitlement for measures lasting longer than 6 months.
        - Costs (including information on the amount of course fees, costs for work clothes, learning materials and examination materials with information on whether they remain with the participant (or are loaned), examination fees, method of payment)
        - Applicable documents (general terms and conditions, data protection agreement, house rules, absence policy, etc.) must be attached to the contract.
        - Rights and obligations of the parties
        - The participant must be granted the right to withdraw from the contract in the event that he/she is not financed according to SGB III or if he/she takes up employment. No costs may be incurred. In addition, a general right of withdrawal must be granted within 14 days of the conclusion of the contract, at the latest until the start of the measure.
        - Reasonable conditions for termination during the measure: Participation in a labour market service measure must be terminable with a maximum notice period of 6 weeks, for the first time at the end of the first 3 months, then at the end of each of the following 3 months. If an activity is offered in sections/modules of less than 3 months, it must be possible to cancel at the end of each section/module.
        - Indication that the participant will receive a certificate of participation upon completion of the measure, including information on the content, duration and objective of the measure, regardless of whether the participant successfully completes the measure or terminates it prematurely.
        - Duty to inform when collecting personal data according to Chap. 3 Art. 13 of the General Data Protection Regulation (DSGVO)`,
      },
      {
        text: "Participant and Internship Contract",
        subjectAreas: [1, 4],
      },
      {
        text: "Written contract according to § 296 (1 to 4) SGB III",
        subjectAreas: [2],
      },
      {
        text: "Information about the services needed to prepare for and conduct the placement, such as assessment of the job seeker's skills and career counseling related to the placement.",
        subjectAreas: [2],
      },
      {
        text: "Regulation of remuneration in the contract according to § 83 (4), S. 3 No. 2 or remuneration according to § 2 (1) SGB IX",
        subjectAreas: [2],
      },
      {
        text: "Compensation for training placement only by employer/training company",
        subjectAreas: [2],
      },
      {
        text: "Obligation to provide information when collecting personal data pursuant to ch. 3 Art. 13 of the General Data Protection Regulation (GDPR)",
        subjectAreas: [2],
      },
      {
        text: "Amount of compensation in the transfer company",
        subjectAreas: [5],
      },
      {
        text: "Top-up amount of the transfer short-time allowance",
        subjectAreas: [5],
      },
      { text: "Length of the vacation", subjectAreas: [5] },
      { text: "Holiday Bonus", subjectAreas: [5] },
      {
        text: "Treatment of e.g. company pension entitlements",
        subjectAreas: [5],
      },
      {
        text: "Measures for professional reorientation, placement and qualification of the employee (preparation of a career and qualification plan, support for integration into the primary labor market through counseling and placement services). If necessary, implementation of qualification measures; organization of in-company familiarization programs (internships).",
        subjectAreas: [5],
      },
      {
        text: "Obligation to provide information when collecting personal data pursuant to ch. 3 Art. 13 of the General Data Protection Regulation (GDPR)",
        subjectAreas: [5],
      },
      {
        text: "Conclusion of a participant contract upon admission to the admission procedure and the vocational training area",
        subjectAreas: [6],
      },
      {
        text: "Conclusion of a workshop contract as an employment contract between the employee and the company upon transfer to the work area",
        subjectAreas: [6],
      },
      {
        text: "Attachment Agreement for Payment of Compensation",
        subjectAreas: [6],
      },
      { text: "Workshop Rules", subjectAreas: [6] },
      {
        text: "Contract supplements for activities at an external workplace in the area of vocational training and in the area of work",
        subjectAreas: [6],
      },
      {
        text: "Information on the content, time frame and objective of the measure (WV/BBB)",
        subjectAreas: [6],
      },
      {
        text: "Contractual provisions for all rehabilitation services (e.g., supported employment).",
        subjectAreas: [6],
      },
      {
        text: "Contents: Informational Self-Determination, Privacy, Duty to Cooperate, Procedures, Medical Education, Rehabilitation Goal Agreement.",
        subjectAreas: [6],
      },
      {
        text: "Obligation to provide information when collecting personal data pursuant to ch. 3 Art. 13 of the General Data Protection Regulation (GDPR)",
        subjectAreas: [6],
      },
    ],
  },
};
