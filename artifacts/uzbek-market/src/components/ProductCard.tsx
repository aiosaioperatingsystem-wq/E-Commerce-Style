import React from "react";
import { Link } from "wouter";
import { Star } from "lucide-react";
import { formatPrice } from "@/data/products";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/mahsulot/${product.id}`} className="group block bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 h-full" data-testid={`card-product-${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
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