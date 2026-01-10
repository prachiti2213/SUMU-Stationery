import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SiteContent, Product, BlogPost, GalleryImage } from '../types';
import { INITIAL_CONTENT } from '../constants';

interface ContentContextType {
  content: SiteContent;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  addGalleryImage: (image: GalleryImage) => void;
  deleteGalleryImage: (id: string) => void;
  updateHero: (headline: string, subheadline: string) => void;
  updateSettings: (aboutText: string, email: string, phone: string, themeColor: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);

  // Apply theme color to CSS variable whenever it changes
  useEffect(() => {
    document.documentElement.style.setProperty('--sumu-wood', content.themeColor);
  }, [content.themeColor]);

  const updateProduct = (updatedProduct: Product) => {
    setContent(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    }));
  };

  const addProduct = (newProduct: Product) => {
    setContent(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const deleteProduct = (id: string) => {
    setContent(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  const addBlogPost = (newPost: BlogPost) => {
    setContent(prev => ({
      ...prev,
      blogPosts: [newPost, ...prev.blogPosts]
    }));
  };

  const deleteBlogPost = (id: string) => {
    setContent(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.filter(p => p.id !== id)
    }));
  };

  const addGalleryImage = (image: GalleryImage) => {
    setContent(prev => ({
      ...prev,
      gallery: [image, ...prev.gallery]
    }));
  };

  const deleteGalleryImage = (id: string) => {
    setContent(prev => ({
      ...prev,
      gallery: prev.gallery.filter(g => g.id !== id)
    }));
  };

  const updateHero = (headline: string, subheadline: string) => {
    setContent(prev => ({
      ...prev,
      heroHeadline: headline,
      heroSubheadline: subheadline
    }));
  };

  const updateSettings = (aboutText: string, email: string, phone: string, themeColor: string) => {
    setContent(prev => ({
      ...prev,
      aboutText,
      contactEmail: email,
      contactPhone: phone,
      themeColor
    }));
  };

  return (
    <ContentContext.Provider value={{
      content,
      updateProduct,
      addProduct,
      deleteProduct,
      addBlogPost,
      deleteBlogPost,
      addGalleryImage,
      deleteGalleryImage,
      updateHero,
      updateSettings
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};