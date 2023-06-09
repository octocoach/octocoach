import { EducationProvider } from "./schema";

type Checkbox = "☒" | "☐";
export const [checked, unchecked] = ["☒", "☐"] as Checkbox[];
const cb = (val: boolean): Checkbox => (val ? checked : unchecked);

export interface TUVFormSchema {
  // Applicant
  name: string;
  certificationNumber: string;
  address1: string;
  address2: string;
  email: string;
  website: string;
  contactPerson: string;
  phone: string;
  //   Number of Employees
  employeesFullTime: number;
  employeesPartTime: number;
  employeesExternal: number;
  //   Scope / Speciality
  fb1: Checkbox;
  fb2: Checkbox;
  fb3: Checkbox;
  fb4: Checkbox;
  fb5: Checkbox;
  fb6: Checkbox;
  //   Qualification of Management
  //   Head
  headName: string;
  headBirthDetails: string;
  headPositionStart: number;
  headQualifications: string;
  headExperience: string;
  headAdditionalQualifications: string;
}

export const mapToTUVSchema = ({
  name,
  certificationNumber,
  address,
  email,
  website,
  head,
  phone,
  employees,
  subjectAreas,
}: EducationProvider): TUVFormSchema => {
  return {
    name,
    certificationNumber: certificationNumber || "",
    address1: `${address.street}, ${address.number}`,
    address2: `${address.postalCode}, ${address.city}`,
    email,
    website,
    contactPerson: `${head.firstName} ${head.lastName}`,
    phone,
    employeesFullTime: employees.fullTime,
    employeesPartTime: employees.partTime,
    employeesExternal: employees.external,
    fb1: cb(subjectAreas.fb1),
    fb2: cb(subjectAreas.fb2),
    fb3: cb(subjectAreas.fb3),
    fb4: cb(subjectAreas.fb4),
    fb5: cb(subjectAreas.fb5),
    fb6: cb(subjectAreas.fb6),
    headName: `${head.lastName}, ${head.firstName}`,
    headBirthDetails: `${head.birthYear}, ${head.birthPlace}`,
    headPositionStart: head.positionStart,
    headQualifications: head.qualifications.reduce(
      (prev, curr, i, a) =>
        `${prev}${curr.qualification} - ${curr.institution} (${
          curr.completionYear
        }) ${i < a.length - 1 ? "\n\n" : ""}`,
      ""
    ),
    headExperience: head.experience.reduce(
      (prev, curr, i, a) =>
        `${prev}${curr.type} - ${curr.institution}: ${curr.description}${
          i < a.length - 1 ? "\n\n" : ""
        }`,
      ""
    ),
    headAdditionalQualifications: "",
  };
};
