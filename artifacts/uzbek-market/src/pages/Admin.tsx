import React, { useState } from "react";
import { Link } from "wouter";
import { formatPrice } from "@/data/products";
import {
  useListProducts,
  useListOrders,
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
  getListProductsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2, Plus, Package, ShoppingBag, ArrowLeft, Loader2, ChevronDown, ChevronUp, Pencil, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["Kiyim-kechak", "Elektronika", "Go'zallik", "Uy jihozlari", "Sport", "Avtomobil"];

type OrderItem = { id: string; name: string; price: number; quantity: number; image: string };

type EditForm = {
  name: string;
  category: string;
  price: string;
  imageUrl: string;
  description: string;
};

export function Admin() {
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ name: "", category: "", price: "", imageUrl: "", description: "" });
  const [editError, setEditError] = useState("");

  const queryClient = useQueryClient();
  const { data: products = [], isLoading: productsLoading } = useListProducts();
  const { data: orders = [], isLoading: ordersLoading } = useListOrders();
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();

  const invalidateProducts = () =>
    queryClient.invalidateQueries({ queryKey: getListProductsQueryKey() });

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string).trim();
    const category = data.get("category") as string;
    const price = parseInt(data.get("price") as string, 10);
    const imageUrl = (data.get("imageUrl") as string).trim();
    const description = (data.get("description") as string).trim();

    if (!name || !category || isNaN(price) || !imageUrl) {
      setFormError("Iltimos, barcha majburiy maydonlarni to'ldiring.");
      return;
    }

    try {
      await createProduct.mutateAsync({ data: { name, category, price, imageUrl, description } });
      await invalidateProducts();
      form.reset();
      setFormSuccess(true);
      setTimeout(() => setFormSuccess(false), 3000);
    } catch {
      setFormError("Mahsulot qo'shishda xatolik yuz berdi.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu mahsulotni o'chirishni xohlaysizmi?")) return;
    try {
      await deleteProduct.mutateAsync({ id });
      await invalidateProducts();
    } catch {
      alert("O'chirishda xatolik yuz berdi.");
    }
  };

  const startEdit = (product: { id: number; name: string; category: string; price: number; imageUrl: string; description: string }) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      imageUrl: product.imageUrl,
      description: product.description,
    });
    setEditError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditError("");
  };

  const handleSaveEdit = async (id: number) => {
    setEditError("");
    const name = editForm.name.trim();
    const category = editForm.category;
    const price = parseInt(editForm.price, 10);
    const imageUrl = editForm.imageUrl.trim();
    const description = editForm.description.trim();

    if (!name || !category || isNaN(price) || !imageUrl) {
      setEditError("Barcha majburiy maydonlarni to'ldiring.");
      return;
    }

    try {
      await updateProduct.mutateAsync({ id, data: { name, category, price, imageUrl, description } });
      await invalidateProducts();
      setEditingId(null);
    } catch {
      setEditError("Saqlashda xatolik yuz berdi.");
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-50 w-full bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" data-testid="link-back-home">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Saytga qaytish</span>
            </Link>
            <span className="text-muted-foreground/40">|</span>
            <span className="text-xl font-bold text-primary">UzBozor Admin</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Tizim ishlayapti
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Jami buyurtmalar", value: orders.length, icon: ShoppingBag, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Jami mahsulotlar", value: products.length, icon: Package, color: "text-violet-600", bg: "bg-violet-50" },
            { label: "Bugungi buyurtmalar", value: orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString()).length, icon: ShoppingBag, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Umumiy savdo", value: formatPrice(orders.reduce((s, o) => s + o.totalPrice, 0)), icon: Package, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((stat, i) => (
            <div key={i} className="bg-card border rounded-2xl p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold truncate">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["orders", "products"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "orders" ? "Buyurtmalar" : "Mahsulotlar"}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Barcha buyurtmalar</h2>
              {ordersLoading && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
            </div>

            {orders.length === 0 && !ordersLoading ? (
              <div className="bg-card border rounded-2xl p-12 text-center text-muted-foreground">
                Hali buyurtmalar yo'q
              </div>
            ) : (
              <div className="space-y-3">
                {[...orders].reverse().map((order) => (
                  <div key={order.id} className="bg-card border rounded-2xl shadow-sm overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-sm">
                          #{order.id}
                        </div>
                        <div>
                          <p className="font-semibold">{order.customerName || "Ism ko'rsatilmagan"}</p>
                          <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <p className="font-bold text-primary">{formatPrice(order.totalPrice)}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString("uz-UZ", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Qabul qilindi
                        </span>
                        {expandedOrder === order.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedOrder === order.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t px-5 py-4 bg-muted/20 space-y-3">
                            <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
                              <div>
                                <span className="font-medium text-muted-foreground">Manzil:</span>
                                <p>{order.deliveryAddress}</p>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">Sana:</span>
                                <p>{new Date(order.createdAt).toLocaleString("uz-UZ")}</p>
                              </div>
                            </div>
                            <p className="font-semibold text-sm mb-2">Mahsulotlar:</p>
                            {(order.items as OrderItem[]).map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 bg-card rounded-xl p-3 border">
                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-muted" />
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">{item.quantity} x {formatPrice(item.price)}</p>
                                </div>
                                <p className="font-semibold text-sm">{formatPrice(item.price * item.quantity)}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Product list */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Mahsulotlar ({products.length})</h2>
                {productsLoading && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
              </div>

              {products.length === 0 && !productsLoading ? (
                <div className="bg-card border rounded-2xl p-12 text-center text-muted-foreground">
                  Hali mahsulotlar yo'q. Yangi mahsulot qo'shing.
                </div>
              ) : (
                <div className="space-y-3">
                  {products.map((product) => (
                    <div key={product.id} className="bg-card border rounded-2xl shadow-sm overflow-hidden">
                      {editingId === product.id ? (
                        /* ── Inline edit form ── */
                        <div className="p-4 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                              <label className="text-xs font-medium text-muted-foreground">Nomi *</label>
                              <input
                                value={editForm.name}
                                onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                                className="w-full h-9 px-3 mt-1 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-muted-foreground">Kategoriya *</label>
                              <select
                                value={editForm.category}
                                onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))}
                                className="w-full h-9 px-3 mt-1 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary outline-none"
                              >
                                <option value="">Tanlang...</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-muted-foreground">Narxi (so'm) *</label>
                              <input
                                type="number"
                                value={editForm.price}
                                onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))}
                                className="w-full h-9 px-3 mt-1 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary outline-none"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-xs font-medium text-muted-foreground">Rasm URL *</label>
                              <input
                                value={editForm.imageUrl}
                                onChange={e => setEditForm(f => ({ ...f, imageUrl: e.target.value }))}
                                className="w-full h-9 px-3 mt-1 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary outline-none"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-xs font-medium text-muted-foreground">Tavsif</label>
                              <input
                                value={editForm.description}
                                onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                                className="w-full h-9 px-3 mt-1 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary outline-none"
                              />
                            </div>
                          </div>
                          {editError && (
                            <p className="text-xs text-destructive bg-destructive/10 px-3 py-1.5 rounded-lg">{editError}</p>
                          )}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveEdit(product.id)}
                              disabled={updateProduct.isPending}
                              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-60"
                            >
                              {updateProduct.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                              Saqlash
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="flex items-center gap-1.5 px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-semibold hover:bg-muted/80"
                            >
                              <X className="w-3.5 h-3.5" /> Bekor
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* ── Read view ── */
                        <div className="flex items-center gap-4 p-4">
                          <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-xl object-cover bg-muted flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                            <p className="text-sm font-bold text-primary">{formatPrice(product.price)}</p>
                          </div>
                          <div className="flex gap-1 flex-shrink-0">
                            <button
                              onClick={() => startEdit(product)}
                              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                              title="Tahrirlash"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                              title="O'chirish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add product form */}
            <div className="lg:col-span-2">
              <div className="bg-card border rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" /> Yangi mahsulot qo'shish
                </h3>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Nomi *</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Masalan: iPhone 15 Pro"
                      className="w-full h-11 px-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Kategoriya *</label>
                    <select
                      name="category"
                      required
                      className="w-full h-11 px-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
                    >
                      <option value="">Tanlang...</option>
                      {CATEGORIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Narxi (so'm) *</label>
                    <input
                      name="price"
                      type="number"
                      required
                      min="0"
                      placeholder="Masalan: 990000"
                      className="w-full h-11 px-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Rasm URL *</label>
                    <input
                      name="imageUrl"
                      type="text"
                      required
                      placeholder="https://images.unsplash.com/..."
                      className="w-full h-11 px-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Tavsif</label>
                    <textarea
                      name="description"
                      rows={3}
                      placeholder="Mahsulot haqida qisqacha ma'lumot..."
                      className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none text-sm resize-none"
                    />
                  </div>

                  {formError && (
                    <p className="text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-lg">{formError}</p>
                  )}
                  {formSuccess && (
                    <p className="text-sm text-green-700 bg-green-50 px-4 py-2 rounded-lg">
                      Mahsulot muvaffaqiyatli qo'shildi!
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={createProduct.isPending}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {createProduct.isPending ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Saqlanmoqda...</>
                    ) : (
                      <><Plus className="w-4 h-4" /> Saqlash</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
