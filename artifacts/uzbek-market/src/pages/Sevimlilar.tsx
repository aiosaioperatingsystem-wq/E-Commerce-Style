import React from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { useFavorites } from "@/contexts/FavoritesContext";
import { motion } from "framer-motion";
import { HeartCrack } from "lucide-react";

export function Sevimlilar() {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Sevimlilar</h1>
          {favorites.length > 0 && (
            <span className="bg-primary text-primary-foreground text-sm font-bold px-2.5 py-0.5 rounded-full">
              {favorites.length}
            </span>
          )}
        </div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-24 gap-5 text-center"
            data-testid="favorites-empty"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <HeartCrack className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xl font-semibold text-foreground mb-2">
                Sevimlilar ro'yxati bo'sh 💔
              </p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Mahsulot kartochkasidagi yurak belgisini bosib, sevimlilaringizni saqlang.
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {favorites.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
