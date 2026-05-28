import React from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

export function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Savat</h1>

          {items.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">🛒</div>
              <h2 className="text-2xl font-bold mb-2">Savatingiz bo'sh</h2>
              <p className="text-muted-foreground mb-8">Xarid qilishni boshlash uchun katalogga o'ting</p>
              <Link href="/katalog" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
                Katalogga o'tish <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 bg-card border rounded-2xl shadow-sm items-center">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl bg-muted" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-primary font-bold">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-muted px-2 py-1 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-background rounded-md text-foreground" data-testid={`btn-minus-${item.id}`}>
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-background rounded-md text-foreground" data-testid={`btn-plus-${item.id}`}>
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors ml-2" data-testid={`btn-remove-${item.id}`}>
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-card border rounded-3xl p-6 shadow-sm sticky top-24">
                  <h2 className="text-xl font-bold mb-6">Buyurtma xulosasi</h2>
                  <div className="space-y-4 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mahsulotlar</span>
                      <span className="font-medium">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Yetkazib berish</span>
                      <span className="font-medium">Tekin</span>
                    </div>
                  </div>
                  <div className="border-t pt-4 mb-8 flex justify-between items-end">
                    <span className="text-lg font-semibold">Jami</span>
                    <span className="text-2xl font-extrabold text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                  <Link href="/buyurtma" className="w-full flex justify-center bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors" data-testid="link-checkout">
                    Buyurtmani rasmiylashtirish
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}