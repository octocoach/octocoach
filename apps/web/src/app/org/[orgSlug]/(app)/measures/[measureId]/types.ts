import type { Params as ParentParams } from "@app/org/[orgSlug]/types";
import { MeasureWithInfo } from "@octocoach/db/schemas/org/measure";

export type Params = ParentParams & { params: { measureId: string } };

export type MeasureWithInfoParam = Pick<
  MeasureWithInfo,
  "id" | "type" | "title" | "screeningQuestions" | "owner"
>;
