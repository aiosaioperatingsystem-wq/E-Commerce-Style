import React from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { ArrowRight } from "lucide-react";

const categories = [
  { name: "Kiyim-kechak", icon: "👕" },
  { name: "Elektronika", icon: "📱" },
  { name: "Go'zallik", icon: "✨" },
  { name: "Uy jihozlari", icon: "🏠" },
  { name: "Sport", icon: "⚽" },
  { name: "Avtomobil", icon: "🚗" },
];

export function Home() {
  return (
    <div className="min-h-screen flex flex-col pb-20">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="bg-primary text-primary-foreground rounded-3xl overflow-hidden relative min-h-[400px] flex items-center px-8 md:px-16">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&auto=format" 
              alt="Hero bg" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            />
            <div className="relative z-20 max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">Yangi kollekciya — 2024</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl">
                O'zbekistonning eng zamonaviy onlayn do'koni. Eng sara mahsulotlarni kashf eting.
              </p>
              <Link 
                href="/katalog" 
                className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 rounded-full font-bold hover:bg-background/90 transition-colors"
                data-testid="link-hero-cta"
              >
                Xaridni boshlash <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Kategoriyalar</h2>
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x scrollbar-hide">
              {categories.map((cat, i) => (
                <Link 
                  key={i} 
                  href="/katalog" 
                  className="flex-shrink-0 snap-center flex flex-col items-center gap-3 w-28 group"
                >
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-3xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                    {cat.icon}
                  </div>
                  <span className="text-sm font-medium text-center">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Products */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Siz uchun tavsiyalar</h2>
              <Link href="/katalog" className="text-primary font-medium hover:underline flex items-center gap-1">
                Barchasi <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {products.slice(0, 10).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}