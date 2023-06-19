export interface Job {
  employerId: string;
  title: string;
  location: string;
  description: string;
  moreDetails: Record<string, string[]>;
}
