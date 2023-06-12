type SubjectArea = 1 | 2 | 3 | 4 | 5 | 6;

interface Tip {
  text: string;
  subjectAreas?: SubjectArea[];
}

interface Section {
  title: string;
  description: string;
  legalBasis?: {
    text: string;
    href: string;
  }[];
  tips: Tip[];
}

export type FileSchema = Record<number, Section>;
