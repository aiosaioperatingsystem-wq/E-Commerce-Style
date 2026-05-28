import React from "react";
import { Link } from "wouter";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary tracking-tight">UzBozor</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Bosh sahifa</Link>
            <Link href="/katalog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Katalog</Link>
          </nav>
        </div>

        <div className="flex-1 max-w-md hidden sm:flex items-center relative">
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
          <input 
            type="search" 
            placeholder="Qidiruv..." 
            className="w-full h-10 pl-9 pr-4 rounded-full bg-muted border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            data-testid="input-search"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link href="/savat" className="relative p-2 text-foreground hover:bg-muted rounded-full transition-colors" data-testid="link-cart">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-[10px] font-bold text-primary-foreground rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}