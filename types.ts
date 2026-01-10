export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications: string;
  imageUrl: string;
  useCase: string;
  price: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: 'Student' | 'Corporate' | 'Product' | 'Lifestyle';
}

export interface SiteContent {
  products: Product[];
  blogPosts: BlogPost[];
  gallery: GalleryImage[];
  heroHeadline: string;
  heroSubheadline: string;
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  themeColor: string;
}

export enum PageRoute {
  HOME = '/',
  ABOUT = '/about',
  PRODUCTS = '/products',
  AUDIENCE = '/audience',
  SERVICES = '/services',
  GALLERY = '/gallery',
  BLOG = '/blog',
  CONTACT = '/contact',
  ADMIN = '/admin'
}