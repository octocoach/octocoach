import type { Params as ParentParams } from "@app/org/[orgSlug]/types";

export type Params = ParentParams & { params: { measureId: string } };
