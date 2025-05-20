import { ReactNode } from "react";
export interface Author {
    avatar: ReactNode;
    _id: string;
    name: string;
    email: string;
  }
  
  export interface Comment {
    content: ReactNode;
    author: string;
    id: null | undefined;
    user: string;
    text: string;
    createdAt: string;
  }
  
  export interface Blog {
    slug: string;
    max_read_time: ReactNode;
    publish_date: ReactNode;
    keywords: string[];
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

export interface PostBlog {
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