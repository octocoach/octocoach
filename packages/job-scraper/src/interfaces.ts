import { Skill } from "./skills";

export interface Job {
  id: string;
  employerId: string;
  title: string;
  location: string;
  description: string;
  moreDetails: Record<string, string[]>;
  skills: Skill[];
  tasks: string[];
}
