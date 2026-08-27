import React, { useState, useMemo } from "react";
import { PencilIcon, TrashBinIcon } from "../../icons";
import { Modal } from "../../components/ui/modal/index";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  revenue: number;
  status: "Active" | "Inactive";
  icon: string;
  color: string;
}

const initialCategories: Category[] = [
  { id: 1, name: "Electronics", slug: "electronics", description: "Phones, laptops, tablets & gadgets", productCount: 156, revenue: 284000, status: "Active", icon: "💻", color: "bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400" },
  { id: 2, name: "Audio", slug: "audio", description: "Headphones, speakers, earbuds", productCount: 74, revenue: 98500, status: "Active", icon: "🎧", color: "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400" },
  { id: 3, name: "Smartphones", slug: "smartphones", description: "iOS and Android devices", productCount: 92, revenue: 312000, status: "Active", icon: "📱", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400" },
  { id: 4, name: "TVs", slug: "tvs", description: "OLED, QLED and smart TVs", productCount: 38, revenue: 145000, status: "Active", icon: "📺", color: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400" },
  { id: 5, name: "Accessories", slug: "accessories", description: "Cables, cases, bags & more", productCount: 214, revenue: 56000, status: "Active", icon: "🎒", color: "bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400" },
  { id: 6, name: "Cameras", slug: "cameras", description: "DSLR, mirrorless & action cams", productCount: 43, revenue: 189000, status: "Active", icon: "📷", color: "bg-teal-100 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400" },
  { id: 7, name: "Home", slug: "home", description: "Smart home and appliances", productCount: 67, revenue: 112000, status: "Active", icon: "🏠", color: "bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400" },
  { id: 8, name: "Gaming", slug: "gaming", description: "Consoles, games & peripherals", productCount: 0, revenue: 0, status: "Inactive", icon: "🎮", color: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500" },
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [formData, setFormData] = useState({ name: "", description: "", status: "Active" as "Active" | "Inactive" });

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "" || cat.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, filterStatus]);

  const totalRevenue = categories.filter((c) => c.status === "Active").reduce((sum, c) => sum + c.revenue, 0);
  const totalProducts = categories.filter((c) => c.status === "Active").reduce((sum, c) => sum + c.productCount, 0);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "", status: "Active" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description, status: category.status });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.name.toLowerCase().replace(/\s+/g, "-");
    if (editingCategory) {
      setCategories(categories.map((c) =>
        c.id === editingCategory.id ? { ...c, name: formData.name, slug, description: formData.description, status: formData.status } : c
      ));
    } else {
      const icons = ["📦", "🛒", "⚙️", "🔧", "🌟"];
      const colors = ["bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400", "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400"];
      setCategories([
        { id: Date.now(), name: formData.name, slug, description: formData.description, productCount: 0, revenue: 0, status: formData.status, icon: icons[Math.floor(Math.random() * icons.length)], color: colors[0] },
        ...categories,
      ]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this category?")) setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Organize your store's product hierarchy
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Category
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Categories</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Active</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            {categories.filter((c) => c.status === "Active").length}
          </p>
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-500/20 dark:bg-sky-500/10">
          <p className="text-xs font-medium text-sky-600 dark:text-sky-400">Total Products</p>
          <p className="mt-1 text-2xl font-bold text-sky-700 dark:text-sky-400">{totalProducts}</p>
        </div>
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-500/20 dark:bg-violet-500/10">
          <p className="text-xs font-medium text-violet-600 dark:text-violet-400">Category Revenue</p>
          <p className="mt-1 text-2xl font-bold text-violet-700 dark:text-violet-400">
            ${(totalRevenue / 1000).toFixed(0)}k
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-brand-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.02]">
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Category</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Slug</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Products</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Revenue</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 text-center">Status</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg ${category.color}`}>
                        {category.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">{category.name}</p>
                        <p className="text-xs text-gray-400">{category.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <code className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      /{category.slug}
                    </code>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.productCount}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-gray-800 dark:text-white">
                      {category.revenue > 0 ? `$${(category.revenue / 1000).toFixed(0)}k` : "—"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
                      category.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:ring-emerald-500/20"
                        : "bg-gray-100 text-gray-500 ring-gray-200 dark:bg-gray-800 dark:text-gray-500 dark:ring-gray-700"
                    }`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(category)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-500/10 dark:hover:text-brand-400 transition-colors"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 transition-colors"
                      >
                        <TrashBinIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[460px] p-6">
        <h3 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">
          {editingCategory ? "Edit Category" : "Add Category"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text" required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="e.g. Electronics"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Brief description"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "Active" | "Inactive" })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-brand-500 py-3 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
          >
            {editingCategory ? "Update Category" : "Create Category"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
