import React from "react";
import { Link } from "wouter";
import { Star, Heart } from "lucide-react";
import { formatPrice } from "@/data/products";
import { motion } from "framer-motion";
import { useFavorites } from "@/contexts/FavoritesContext";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    category: string;
  };
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  const handleHeart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Link
        href={`/mahsulot/${product.id}`}
        className="group block bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 h-full"
        data-testid={`card-product-${product.id}`}
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <button
            onClick={handleHeart}
            data-testid={`button-favorite-${product.id}`}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label={favorited ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
          >
            <Heart
              className={`w-4 h-4 transition-all duration-200 ${
                favorited ? "fill-red-500 text-red-500" : "fill-none text-gray-400"
              }`}
            />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-primary text-primary" />
              <span>{product.rating}</span>
            </div>
          </div>
          <h3 className="font-medium text-foreground line-clamp-2">{product.name}</h3>
          <p className="text-lg font-bold text-primary mt-1">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
