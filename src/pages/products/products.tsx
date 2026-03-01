import React, { useState, useMemo } from "react";
import productsData from "../../data/products.json";
import { PencilIcon, PlusIcon, TrashBinIcon } from "../../icons";
import Badge from "../../components/ui/badge/Badge";
import { Modal } from "../../components/ui/modal/index";

export default function Products() {
  const [products, setProducts] = useState(productsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Form State
  const initialForm = {
    name: "",
    price: "",
    category: "Electronics",
    stock: "",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  };
  const [formData, setFormData] = useState(initialForm);

  // --- Search & Filter Logic ---
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "" || p.category.toLowerCase() === filterCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, filterCategory]);

  // --- Modal Handlers ---
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      image: product.image
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // --- File Upload Simulation ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  // --- CRUD Operations ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productPayload = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      image: formData.image,
      status: parseInt(formData.stock) > 0 ? "In Stock" : "Out of Stock"
    };

    if (editingProduct) {
      // EDIT
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productPayload } : p));
    } else {
      // ADD
      const newProduct = { id: `PROD-${Date.now()}`, ...productPayload };
      setProducts([newProduct, ...products]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Products ({filteredProducts.length})
        </h2>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 rounded bg-brand-500 px-4.5 py-2 font-medium text-white hover:bg-opacity-90">
          <PlusIcon className="h-5 w-5" /> Add Product
        </button>
      </div>

      {/* FILTER & SEARCH */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
        <input
          type="text"
          placeholder="Search product name..."
          className="w-full max-w-md rounded border border-stroke bg-gray py-2 px-4 focus:border-brand-500 outline-none dark:border-strokedark dark:bg-meta-4 text-black dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="rounded border border-stroke bg-transparent px-4 py-2 outline-none dark:border-strokedark text-black dark:text-white"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Footwear">Footwear</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">Product</th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">Category</th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">Price</th>
              <th className="px-4 py-4 font-medium text-black dark:text-white text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-stroke dark:border-strokedark">
                <td className="px-4 py-5 xl:pl-11">
                  <div className="flex items-center gap-3">
                    <img src={product.image} className="h-12 w-12 rounded-md object-cover" alt="" />
                    <p className="font-medium text-black dark:text-white">{product.name}</p>
                  </div>
                </td>
                <td className="px-4 py-5 text-black dark:text-white">{product.category}</td>
                <td className="px-4 py-5 text-black dark:text-white">${product.price}</td>
                <td className="px-4 py-5">
                  <div className="flex items-center justify-center space-x-3.5">
                    <button onClick={() => handleOpenEdit(product)} className="hover:text-brand-500"><PencilIcon className="h-5 w-5" /></button>
                    <button onClick={() => handleDelete(product.id)} className="hover:text-danger"><TrashBinIcon className="h-5 w-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL (ADD / EDIT) */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} className="max-w-[500px] p-8">
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center gap-4 mb-4">
             <img src={formData.image} className="h-24 w-24 rounded-lg object-cover border" alt="Preview" />
             <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Product Name</label>
            <input 
              type="text" required value={formData.name}
              className="w-full rounded border border-stroke p-3 outline-none focus:border-brand-500 dark:border-strokedark dark:bg-meta-4"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="number" placeholder="Price" value={formData.price}
              className="w-full rounded border border-stroke p-3 dark:bg-meta-4"
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
            <input 
              type="number" placeholder="Stock" value={formData.stock}
              className="w-full rounded border border-stroke p-3 dark:bg-meta-4"
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full rounded bg-brand-500 p-3 font-medium text-white hover:bg-opacity-90">
            {editingProduct ? "Update Product" : "Create Product"}
          </button>
        </form>
      </Modal>
    </>
  );
}