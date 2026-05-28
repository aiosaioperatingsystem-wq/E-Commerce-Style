import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products as staticProducts } from "@/data/products";
import { Search } from "lucide-react";
import { useListProducts } from "@workspace/api-client-react";

const categories = ["Barchasi", "Kiyim-kechak", "Elektronika", "Go'zallik", "Uy jihozlari", "Sport"];

export function Catalog() {
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: apiProducts } = useListProducts();
  const allProducts = apiProducts && apiProducts.length > 0
    ? apiProducts.map(p => ({ ...p, id: String(p.id), image: p.imageUrl }))
    : staticProducts;

  const filteredProducts = allProducts.filter(p => {
    const matchesCategory = activeCategory === "Barchasi" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <Header />
      
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold">Katalog</h1>
            <div className="w-full md:w-auto flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Mahsulot qidirish..." 
                className="w-full h-12 pl-10 pr-4 rounded-xl border bg-card focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-catalog-search"
              />
            </div>
          </div>

          <div className="flex overflow-x-auto gap-2 pb-4 mb-6 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                data-testid={`btn-filter-${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-muted-foreground">
                Mahsulot topilmadi
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
