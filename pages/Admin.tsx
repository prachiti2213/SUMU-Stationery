import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { Product, BlogPost, GalleryImage, PageRoute } from '../types';
import { generateBlogPost, enhanceProductDescription } from '../services/geminiService';
import { LayoutDashboard, Package, FileText, Image as ImageIcon, Settings, Wand2, Plus, Trash2, Save, Lock, ExternalLink, Pencil, ArrowLeft } from 'lucide-react';

export const Admin = () => {
  const { 
    content, 
    addProduct, deleteProduct, updateProduct,
    addBlogPost, deleteBlogPost, 
    addGalleryImage, deleteGalleryImage,
    updateHero, updateSettings 
  } = useContent();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'blog' | 'gallery' | 'settings'>('dashboard');
  
  // Login State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Editing State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Local state for forms
  const [isGenerating, setIsGenerating] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [newBlogTopic, setNewBlogTopic] = useState('');
  const [newGalleryImage, setNewGalleryImage] = useState<Partial<GalleryImage>>({ category: 'Lifestyle' });
  
  // Settings local state (sync with content initially)
  const [settingsForm, setSettingsForm] = useState({
    heroHeadline: content.heroHeadline,
    heroSubheadline: content.heroSubheadline,
    aboutText: content.aboutText,
    contactEmail: content.contactEmail,
    contactPhone: content.contactPhone,
    themeColor: content.themeColor
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Trim whitespace to prevent copy-paste errors
    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (cleanUser === 'sumuwebsitelogin' && cleanPass === 'sumuweb@login') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleAiBlogGen = async () => {
    if (!newBlogTopic) return alert("Please enter a topic.");
    setIsGenerating(true);
    const generatedContent = await generateBlogPost(newBlogTopic);
    
    const title = newBlogTopic;
    const excerpt = generatedContent.substring(0, 100) + "...";
    
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: title,
      excerpt: excerpt,
      content: generatedContent,
      date: new Date().toISOString().split('T')[0],
      imageUrl: 'https://picsum.photos/800/400'
    };
    
    addBlogPost(newPost);
    setIsGenerating(false);
    setNewBlogTopic('');
  };

  const handleAiProductDesc = async (isEditing: boolean) => {
    const targetProduct = isEditing ? editingProduct : newProduct;
    if (!targetProduct?.name) return alert("Enter product name first");
    
    setIsGenerating(true);
    const desc = await enhanceProductDescription(targetProduct.name, targetProduct.specifications || "standard pencil");
    
    if (isEditing && editingProduct) {
      setEditingProduct({ ...editingProduct, description: desc });
    } else {
      setNewProduct({ ...newProduct, description: desc });
    }
    setIsGenerating(false);
  };

  const handleSaveNewProduct = () => {
    if (!newProduct.name || !newProduct.category) return alert("Name and Category required");
    addProduct({
      id: Date.now().toString(),
      name: newProduct.name,
      category: newProduct.category,
      description: newProduct.description || '',
      specifications: newProduct.specifications || '',
      useCase: newProduct.useCase || '',
      imageUrl: newProduct.imageUrl || 'https://picsum.photos/600/600',
      price: newProduct.price || 'Contact for Quote'
    });
    setNewProduct({});
    alert("Product Created Successfully!");
  };

  const handleUpdateProduct = () => {
    if (!editingProduct || !editingProduct.name || !editingProduct.category) return alert("Name and Category required");
    updateProduct(editingProduct);
    setEditingProduct(null);
    alert("Product Updated Successfully!");
  };

  const handleSaveGalleryImage = () => {
    if (!newGalleryImage.url) return alert("Image URL required");
    addGalleryImage({
      id: Date.now().toString(),
      url: newGalleryImage.url,
      caption: newGalleryImage.caption || '',
      category: newGalleryImage.category as any
    });
    setNewGalleryImage({ category: 'Lifestyle', url: '', caption: '' });
  };

  const handleSaveSettings = () => {
    updateHero(settingsForm.heroHeadline, settingsForm.heroSubheadline);
    updateSettings(
      settingsForm.aboutText, 
      settingsForm.contactEmail, 
      settingsForm.contactPhone, 
      settingsForm.themeColor
    );
    alert("Settings Saved Successfully!");
  };

  const SidebarItem = ({ id, icon, label }: { id: string, icon: React.ReactNode, label: string }) => (
    <button 
      onClick={() => {
        setActiveTab(id as any);
        setEditingProduct(null); // Reset editing state when changing tabs
      }}
      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === id ? 'bg-sumu-wood text-white' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-sumu-stone flex items-center justify-center p-4 font-sans relative">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-100 relative z-10">
          <div className="text-center mb-8">
            <div className="bg-sumu-stone w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-sumu-wood">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-serif font-bold text-sumu-charcoal">Admin Access</h1>
            <p className="text-gray-500 text-sm mt-2">Sign in to manage website content</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
              <input 
                name="username"
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-sumu-wood transition-colors text-gray-900 bg-white"
                placeholder="sumuwebsitelogin"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                name="password"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-sumu-wood transition-colors text-gray-900 bg-white"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
            <button 
              type="submit" 
              className="w-full bg-sumu-charcoal text-white py-3 rounded-lg font-bold hover:bg-sumu-wood transition-colors shadow-lg cursor-pointer"
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to={PageRoute.HOME} className="text-sm text-gray-500 hover:text-sumu-wood inline-flex items-center">
              <ExternalLink size={14} className="mr-1"/> Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col fixed h-full z-20 shadow-sm">
        <h2 className="text-xl font-serif font-bold text-sumu-charcoal mb-8">SUMU Admin</h2>
        <nav className="space-y-2 flex-1">
          <SidebarItem id="dashboard" icon={<LayoutDashboard size={18} />} label="Overview" />
          <SidebarItem id="products" icon={<Package size={18} />} label="Products" />
          <SidebarItem id="gallery" icon={<ImageIcon size={18} />} label="Gallery" />
          <SidebarItem id="blog" icon={<FileText size={18} />} label="Blog Posts" />
          <SidebarItem id="settings" icon={<Settings size={18} />} label="Settings" />
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-100 space-y-4">
           <Link 
            to={PageRoute.HOME} 
            target="_blank"
            className="flex items-center justify-center space-x-2 w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
           >
             <ExternalLink size={16} />
             <span>View Website</span>
           </Link>
          <button onClick={() => setIsAuthenticated(false)} className="flex items-center justify-center space-x-2 w-full text-red-500 hover:text-red-700 text-xs font-semibold">
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 fade-in">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
                  <Package className="text-sumu-wood" size={20} />
                </div>
                <p className="text-3xl font-bold">{content.products.length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Gallery Images</h3>
                  <ImageIcon className="text-sumu-wood" size={20} />
                </div>
                <p className="text-3xl font-bold">{content.gallery.length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Blog Posts</h3>
                  <FileText className="text-sumu-wood" size={20} />
                </div>
                <p className="text-3xl font-bold">{content.blogPosts.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="fade-in">
            {editingProduct ? (
              /* EDIT MODE */
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setEditingProduct(null)} 
                      className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Edit Product: {editingProduct.name}</h1>
                  </div>
                  <button 
                    onClick={handleUpdateProduct}
                    className="bg-sumu-wood text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-opacity-90 font-bold shadow-md"
                  >
                    <Save size={18} /> <span>Save Changes</span>
                  </button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                      <input 
                        className="w-full p-3 border border-gray-200 rounded-lg text-gray-900" 
                        value={editingProduct.name} 
                        onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input 
                        className="w-full p-3 border border-gray-200 rounded-lg text-gray-900" 
                        value={editingProduct.category}
                        onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
                      <input 
                        className="w-full p-3 border border-gray-200 rounded-lg text-gray-900" 
                        value={editingProduct.specifications}
                        onChange={e => setEditingProduct({...editingProduct, specifications: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input 
                        className="w-full p-3 border border-gray-200 rounded-lg text-gray-900" 
                        value={editingProduct.price || ''}
                        onChange={e => setEditingProduct({...editingProduct, price: e.target.value})}
                        placeholder="$0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Use Case</label>
                      <input 
                        className="w-full p-3 border border-gray-200 rounded-lg text-gray-900" 
                        value={editingProduct.useCase}
                        onChange={e => setEditingProduct({...editingProduct, useCase: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input 
                        className="w-full p-3 border border-gray-200 rounded-lg text-gray-900" 
                        value={editingProduct.imageUrl}
                        onChange={e => setEditingProduct({...editingProduct, imageUrl: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <div className="flex gap-2">
                       <textarea 
                        className="w-full p-3 border border-gray-200 rounded-lg h-32 text-gray-900" 
                        value={editingProduct.description}
                        onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                      />
                      <button 
                        onClick={() => handleAiProductDesc(true)}
                        disabled={isGenerating}
                        className="bg-indigo-50 text-indigo-600 px-4 rounded-lg flex flex-col items-center justify-center hover:bg-indigo-100 transition h-32 w-24 flex-shrink-0"
                      >
                        <Wand2 size={24} className={`mb-2 ${isGenerating ? "animate-spin" : ""}`} />
                        <span className="text-xs font-bold text-center">AI Rewrite</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* LIST MODE */
              <div className="space-y-8">
                <h1 className="text-2xl font-bold text-gray-800">Manage Products</h1>
                
                {/* Create New Product */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4">Create New Product</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input 
                      className="p-3 border border-gray-200 rounded-lg text-gray-900" 
                      placeholder="Product Name" 
                      value={newProduct.name || ''} 
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    />
                    <input 
                      className="p-3 border border-gray-200 rounded-lg text-gray-900" 
                      placeholder="Category" 
                      value={newProduct.category || ''}
                      onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                    />
                    <input 
                      className="p-3 border border-gray-200 rounded-lg text-gray-900" 
                      placeholder="Specifications" 
                      value={newProduct.specifications || ''}
                      onChange={e => setNewProduct({...newProduct, specifications: e.target.value})}
                    />
                    <input 
                      className="p-3 border border-gray-200 rounded-lg text-gray-900" 
                      placeholder="Price (e.g. $10.00)" 
                      value={newProduct.price || ''}
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    />
                    <input 
                      className="p-3 border border-gray-200 rounded-lg md:col-span-2 text-gray-900" 
                      placeholder="Image URL" 
                      value={newProduct.imageUrl || ''}
                      onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex gap-2 mb-2">
                       <textarea 
                        className="w-full p-3 border border-gray-200 rounded-lg h-24 text-gray-900" 
                        placeholder="Description" 
                        value={newProduct.description || ''}
                        onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                      />
                      <button 
                        onClick={() => handleAiProductDesc(false)}
                        disabled={isGenerating}
                        className="bg-indigo-50 text-indigo-600 px-4 rounded-lg flex flex-col items-center justify-center hover:bg-indigo-100 transition"
                      >
                        <Wand2 size={20} className={isGenerating ? "animate-spin" : ""} />
                        <span className="text-xs mt-1 font-bold">AI Write</span>
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={handleSaveNewProduct}
                    className="bg-sumu-wood text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-opacity-90 font-bold cursor-pointer"
                  >
                    <Plus size={18} /> <span>Create Product</span>
                  </button>
                </div>

                {/* Product List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                      <tr>
                        <th className="px-6 py-4">Image</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {content.products.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <img src={p.imageUrl} alt={p.name} className="w-12 h-12 object-cover rounded" />
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                          <td className="px-6 py-4 text-gray-500">{p.category}</td>
                          <td className="px-6 py-4 text-gray-500">{p.price || '-'}</td>
                          <td className="px-6 py-4 text-right flex justify-end space-x-3">
                            <button 
                              onClick={() => setEditingProduct(p)} 
                              className="text-blue-500 hover:text-blue-700 flex items-center"
                              title="Edit"
                            >
                              <Pencil size={18} />
                            </button>
                            <button 
                              onClick={() => deleteProduct(p.id)} 
                              className="text-red-400 hover:text-red-600 flex items-center"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
           <div className="space-y-8 fade-in">
             <h1 className="text-2xl font-bold text-gray-800">Manage Gallery</h1>
             
             {/* Add Image */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Add Gallery Image</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input 
                    className="p-3 border border-gray-200 rounded-lg text-gray-900" 
                    placeholder="Image URL" 
                    value={newGalleryImage.url || ''}
                    onChange={e => setNewGalleryImage({...newGalleryImage, url: e.target.value})}
                  />
                  <input 
                    className="p-3 border border-gray-200 rounded-lg text-gray-900" 
                    placeholder="Caption" 
                    value={newGalleryImage.caption || ''}
                    onChange={e => setNewGalleryImage({...newGalleryImage, caption: e.target.value})}
                  />
                  <select 
                    className="p-3 border border-gray-200 rounded-lg bg-white text-gray-900"
                    value={newGalleryImage.category}
                    onChange={e => setNewGalleryImage({...newGalleryImage, category: e.target.value as any})}
                  >
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Product">Product</option>
                    <option value="Student">Student</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
                <button 
                  onClick={handleSaveGalleryImage}
                  className="bg-sumu-wood text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-opacity-90 font-bold cursor-pointer"
                >
                  <Plus size={18} /> <span>Add Image</span>
                </button>
             </div>

             {/* Gallery Grid */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {content.gallery.map(img => (
                  <div key={img.id} className="relative group rounded-xl overflow-hidden shadow-sm">
                    <img src={img.url} alt={img.caption} className="w-full aspect-square object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <button 
                         onClick={() => deleteGalleryImage(img.id)}
                         className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                       >
                         <Trash2 size={20} />
                       </button>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-white/90 p-2 text-xs">
                      <p className="font-bold truncate">{img.caption}</p>
                      <p className="text-gray-500">{img.category}</p>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        )}

        {/* BLOG TAB */}
        {activeTab === 'blog' && (
          <div className="space-y-8 fade-in">
            <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
            
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Wand2 size={24} /> AI Content Generator
                  </h3>
                  <p className="opacity-90 mb-4">Enter a topic and let Gemini API write your blog post.</p>
                  <div className="flex gap-2">
                    <input 
                      className="text-gray-900 px-4 py-2 rounded-lg w-80 focus:outline-none" 
                      placeholder="e.g. The history of the pencil..."
                      value={newBlogTopic}
                      onChange={(e) => setNewBlogTopic(e.target.value)}
                    />
                    <button 
                      onClick={handleAiBlogGen}
                      disabled={isGenerating}
                      className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold hover:bg-indigo-50 transition shadow-sm cursor-pointer"
                    >
                      {isGenerating ? 'Generating...' : 'Generate Draft'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {content.blogPosts.map(post => (
                <div key={post.id} className="bg-white p-6 rounded-xl border border-gray-100 flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{post.title}</h4>
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                  </div>
                  <button onClick={() => deleteBlogPost(post.id)} className="text-red-400 hover:text-red-600 ml-4">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6 fade-in">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">Site Settings</h1>
              <button 
                onClick={handleSaveSettings}
                className="bg-sumu-wood text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-opacity-90 font-bold shadow-lg cursor-pointer"
              >
                <Save size={18} /> <span>Save Changes</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Brand Settings */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Brand Identity</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme Primary Color</label>
                    <div className="flex items-center space-x-3">
                      <input 
                        type="color" 
                        value={settingsForm.themeColor}
                        onChange={(e) => setSettingsForm({...settingsForm, themeColor: e.target.value})}
                        className="h-10 w-20 p-1 rounded border border-gray-200 cursor-pointer"
                      />
                      <span className="text-sm text-gray-500 font-mono">{settingsForm.themeColor}</span>
                    </div>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Hero Headline</label>
                     <input 
                      className="w-full p-3 border border-gray-200 rounded-lg text-gray-900"
                      value={settingsForm.heroHeadline}
                      onChange={(e) => setSettingsForm({...settingsForm, heroHeadline: e.target.value})}
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subheadline</label>
                     <input 
                      className="w-full p-3 border border-gray-200 rounded-lg text-gray-900"
                      value={settingsForm.heroSubheadline}
                      onChange={(e) => setSettingsForm({...settingsForm, heroSubheadline: e.target.value})}
                     />
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Information</h3>
                <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                     <input 
                      className="w-full p-3 border border-gray-200 rounded-lg text-gray-900"
                      value={settingsForm.contactEmail}
                      onChange={(e) => setSettingsForm({...settingsForm, contactEmail: e.target.value})}
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                     <input 
                      className="w-full p-3 border border-gray-200 rounded-lg text-gray-900"
                      value={settingsForm.contactPhone}
                      onChange={(e) => setSettingsForm({...settingsForm, contactPhone: e.target.value})}
                     />
                   </div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                 <h3 className="text-lg font-semibold mb-4 text-gray-800">Pages Content</h3>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">About Us Text</label>
                   <textarea 
                    className="w-full p-3 border border-gray-200 rounded-lg h-40 text-gray-900"
                    value={settingsForm.aboutText}
                    onChange={(e) => setSettingsForm({...settingsForm, aboutText: e.target.value})}
                   />
                 </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};