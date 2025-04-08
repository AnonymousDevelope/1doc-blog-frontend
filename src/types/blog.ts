export interface Blog {
  id: string;
  title: string;
  content: string;
  categories: string[];
  image?: string;
  translations: {
    [key: string]: {
      title: string;
      content: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface BlogInput {
  title: string;
  content: string;
  categories: string[];
  image: string;
  translations: {
    [key: string]: {
      title: string;
      content: string;
    };
  };
}
