import { z } from "zod";

const Phone = z.string().regex(/^(?:\+49|0)(?:\s*\d{2,5}\s*){1,2}\d{4,}$/, {
  message: "Invalid telephone number",
});

const Person = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: Phone,
});

const Year = z.number().int().gte(1900);

const EducationCredential = z.object({
  institution: z.string(),
  qualification: z.string(),
  completionYear: Year,
});

const Experience = z.object({
  description: z.string().max(140),
  type: z.string(),
  institution: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

const Leader = Person.extend({
  birthYear: Year,
  birthPlace: z.string(),
  positionStart: Year,
  qualifications: z.array(EducationCredential),
  experience: z.array(Experience),
});

const Address = z.object({
  street: z.string(),
  number: z.number().positive(),
  city: z.string(),
  postalCode: z.number().int().positive(),
});

const SubjectAreas = z.object({
  fb1: z.boolean(),
  fb2: z.boolean(),
  fb3: z.boolean(),
  fb4: z.boolean(),
  fb5: z.boolean(),
  fb6: z.boolean(),
});

export const EducationProvider = z.object({
  name: z.string(),
  certificationNumber: z.string().optional(),
  address: Address,
  email: z.string().email(),
  website: z.string().url(),
  phone: Phone,

  employees: z.object({
    fullTime: z.number().int().nonnegative(),
    partTime: z.number().nonnegative(),
    external: z.number().int().nonnegative(),
  }),
  subjectAreas: SubjectAreas,
  head: Leader,
  deputyHead: z.optional(Leader),
  measures: SubjectAreas.pick({ fb1: true, fb4: true }),
});

export type EducationProvider = z.infer<typeof EducationProvider>;
