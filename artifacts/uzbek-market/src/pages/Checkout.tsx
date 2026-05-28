import React, { useState } from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full bg-card border rounded-3xl p-8 text-center shadow-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2">Rahmat! Buyurtmangiz qabul qilindi ✨</h1>
            <p className="text-muted-foreground mb-8">Tez orada operatorlarimiz siz bilan bog'lanadi. Buyurtma raqami: #{Math.floor(Math.random() * 10000)}</p>
            <Link href="/" className="w-full inline-flex justify-center items-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
              Bosh sahifaga qaytish <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </main>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">Savat bo'sh. Qaytadan urinib ko'ring.</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Buyurtmani rasmiylashtirish</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Ma'lumotlaringiz</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ism va familiya</label>
                  <input required type="text" className="w-full h-12 px-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none" placeholder="Masalan: Alisher Rustamov" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon raqami</label>
                  <input required type="tel" className="w-full h-12 px-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none" placeholder="+998 90 123 45 67" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Yetkazib berish manzili</label>
                  <textarea required className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none min-h-[100px]" placeholder="Shahar, tuman, ko'cha, uy..."></textarea>
                </div>
                
                <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors mt-8" data-testid="btn-submit-order">
                  Buyurtma berish
                </button>
              </form>
            </div>

            <div>
              <div className="bg-muted/30 border rounded-3xl p-6">
                <h2 className="text-lg font-bold mb-4">Sizning xaridingiz</h2>
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-card border" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                        <div className="text-sm text-muted-foreground">{item.quantity} x {formatPrice(item.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 flex justify-between items-end">
                  <span className="font-semibold">Jami to'lov:</span>
                  <span className="text-xl font-extrabold text-primary">{formatPrice(totalPrice)}</span>
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