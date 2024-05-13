export type SerpResult = {
  searchParameters: {
    q: string;
    gl: string;
    hl: string;
    autocorrect: boolean;
    page: number;
    type: string;
  };
  knowledgeGraph: {
    title: string;
    type: string;
    website: string;
    imageUrl: string;
    description: string;
    descriptionSource: string;
    descriptionLink: string;
    attributes: {
      [key: string]: string;
    };
  };
  organic: {
    title: string;
    link: string;
    snippet: string;
    sitelinks?: {
      title: string;
      link: string;
    }[];
    position: number;
    attributes?: {
      [key: string]: string;
    };
  }[];
  peopleAlsoAsk: {
    question: string;
    snippet: string;
    title: string;
    link: string;
  }[];
  relatedSearches: {
    query: string;
  }[];
};
