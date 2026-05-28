import React, { useState } from "react";
import { useParams, Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { products, formatPrice } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Star, Truck, ShieldCheck, ArrowLeft, Check } from "lucide-react";

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) return <div>Mahsulot topilmadi</div>;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Link href="/katalog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Ortga qaytish
          </Link>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-3xl overflow-hidden border">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-muted-foreground px-3 py-1 bg-muted rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  {product.rating}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-4xl font-extrabold text-primary mb-6">{formatPrice(product.price)}</p>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg mb-8 w-fit border border-green-200">
                <Truck className="w-5 h-5" />
                <span className="font-semibold text-sm">Ertaga yetkaziladi</span>
              </div>

              <div className="space-y-4 mb-8">
                <button 
                  onClick={handleAddToCart}
                  className={`w-full h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    added ? "bg-green-500 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                  data-testid="btn-add-cart"
                >
                  {added ? <><Check className="w-6 h-6" /> Qo'shildi</> : "Savatga qo'shish"}
                </button>
              </div>

              <div className="border-t pt-6 mt-auto space-y-4">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-semibold">Kafolat</h4>
                    <p className="text-sm text-muted-foreground">Mahsulot uchun 1 yil rasmiy kafolat beriladi.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}