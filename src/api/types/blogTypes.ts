export interface Author {
    avatar: any;
    _id: string;
    name: string;
    email: string;
  }
  
  export interface Comment {
    content: ReactNode;
    author: any;
    author: any;
    id: Key | null | undefined;
    user: string;
    text: string;
    createdAt: string;
  }
  
  export interface Blog {
    slug: string;
    max_read_time: ReactNode;
    publish_date: ReactNode;
    keywords: any;
    small_description: ReactNode;
    id: string | number;
    title: string;
    content: string;
    image: string;
    readTime: number;
    views: number;
    author: Author;
    categories: string[];
    comments: Comment[];
    publishedAt: string;
  }