export interface IndeedQuery {
  keywords: string[];
  exclude?: string[];
  title?: string[];
  company?: string[];
}

const wrap = (input: string[]) => input.map((i) => `"${i}"`);

export const queryBuilder = ({
  keywords,
  title,
  company,
  exclude,
}: IndeedQuery): string => {
  let query = "";
  if (title?.length) {
    query += `title:(${wrap(title).join(" OR ")}) `;
  }

  if (company?.length) {
    query += `company:(${wrap(company).join(" OR ")}) `;
  }

  if (exclude?.length) {
    query += `${wrap(exclude)
      .map((e) => `-${e}`)
      .join(" ")} `;
  }

  query += `(${wrap(keywords).join(" OR ")})`;

  return query;
};
