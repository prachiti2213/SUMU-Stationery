import { Product, BlogPost, GalleryImage, SiteContent } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'SUMU Graphite 9000',
    category: 'Graphite Pencils',
    description: 'Precision-engineered graphite for architects and artists.',
    specifications: 'Hexagonal barrel, Cedar wood, HB-8B grades',
    useCase: 'Technical drawing, sketching, writing',
    imageUrl: '/graphite9000.jpeg',
    price: ''
  },
  {
    id: '2',
    name: 'SUMU Polychrome',
    category: 'Color Pencils',
    description: 'Richly pigmented cores offering vibrant, blendable colors.',
    specifications: '3.8mm lead, oil-based, 72 color range',
    useCase: 'Artistic rendering, illustrations',
    imageUrl: '/colourpencil.jpeg',
    price: ''
  },
  {
    id: '3',
    name: 'SUMU Heritage',
    category: 'Premium Wooden Pencils',
    description: 'Our signature series crafted from reclaimed vintage timber.',
    specifications: 'Matte finish, gold foil stamping, extra-dark lead',
    useCase: 'Executive writing, gifting',
    imageUrl: '/sumuheritage.jpeg',
    price: ''
  },
  {
    id: '4',
    name: 'SUMU Scholar',
    category: 'School & Academic',
    description: 'Durable and break-resistant for everyday classroom use.',
    specifications: 'Bonded lead, ergonomic grip, eco-friendly lacquer',
    useCase: 'Students, examinations',
    imageUrl: '/sumuscholar.jpeg',
    price: ''
  },
  {
    id: '5',
    name: 'SUMU Corporate Custom',
    category: 'Corporate & Custom-Branded',
    description: 'Bespoke branding solutions for global enterprises.',
    specifications: 'Custom Pantone matching, logo engraving',
    useCase: 'Events, office supplies, brand merchandising',
    imageUrl: '/corporate.jpeg',
    price: 'Contact for Quote'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Graphite: A 25-Year Journey',
    excerpt: 'Exploring the evolution of pencil manufacturing from traditional craft to modern precision.',
    content: 'Pencils are more than just writing instruments; they are tools of creation. At SUMU, we have spent 25 years perfecting the balance between wood and graphite...',
    date: '2023-10-15',
    imageUrl: 'crafts.jpeg'
  },
  {
    id: '2',
    title: 'Sustainable Sourcing in Stationery',
    excerpt: 'How SUMU ensures every pencil is crafted with respect for the environment.',
    content: 'Sustainability is at the core of our philosophy. From FSC-certified wood to plastic-free packaging, we ensure that our legacy is one of responsibility...',
    date: '2023-11-02',
    imageUrl: 'polychrome.jpeg'
  }
];

export const INITIAL_GALLERY: GalleryImage[] = [
  { id: '1', url: '/sumuscholar.jpeg', caption: 'Student Focus', category: 'Student' },
  { id: '2', url: '/sumuheritage.jpeg', caption: 'Heritage Texture', category: 'Product' },
  { id: '3', url: '/artistpencil.jpeg', caption: 'Creative Studio', category: 'Lifestyle' },
  { id: '4', url: '/office.jpeg', caption: 'Corporate Desk', category: 'Corporate' },
  { id: '5', url: '/essential.jpeg', caption: 'Everyday Essentials', category: 'Lifestyle' },
  { id: '6', url: '/tech.jpeg', caption: 'Technical Precision', category: 'Product' }
];

export const INITIAL_CONTENT: SiteContent = {
  products: INITIAL_PRODUCTS,
  blogPosts: INITIAL_BLOG_POSTS,
  gallery: INITIAL_GALLERY,
  heroHeadline: 'Defining the Art of Writing.',
  heroSubheadline: 'Precision. Elegance. Legacy.',
  aboutText: 'SUMU Stationery carries a legacy of over 25 years. What began as a small retail venture has evolved into a growing stationery brand rooted in quality, trust, and consistency.',
  contactEmail: ' sumustationery@gmail.com',
  contactPhone: '+91 9022854954',
  themeColor: '#E3B341'
};