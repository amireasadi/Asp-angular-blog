import { category } from '../../category/models/category.model';

export interface IAddBlogPostRequest {
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  publishedDate: Date;
  author: string;
  isVisible: boolean;
  categories: string[];
}

export interface IBlogPost {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  publishedDate: Date;
  author: string;
  isVisible: boolean;
  categories: category[];
}
