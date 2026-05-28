import React from "react";
import { Link, useLocation } from "wouter";
import { Home, LayoutGrid, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

const navItems = [
  { href: "/", label: "Bosh sahifa", Icon: Home, testId: "nav-home" },
  { href: "/katalog", label: "Katalog", Icon: LayoutGrid, testId: "nav-catalog" },
  { href: "/sevimlilar", label: "Sevimlilar", Icon: Heart, testId: "nav-favorites" },
  { href: "/savat", label: "Savat", Icon: ShoppingCart, testId: "nav-cart" },
];

export function BottomNav() {
  const [location] = useLocation();
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border/60 safe-area-inset-bottom"
      data-testid="bottom-nav"
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ href, label, Icon, testId }) => {
          const isActive = href === "/" ? location === "/" : location.startsWith(href);
          const badge =
            href === "/savat" && totalItems > 0
              ? totalItems
              : href === "/sevimlilar" && totalFavorites > 0
              ? totalFavorites
              : null;

          return (
            <Link
              key={href}
              href={href}
              data-testid={testId}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-all duration-200 ${
                    isActive ? "scale-110" : ""
                  } ${href === "/sevimlilar" && isActive ? "fill-primary" : ""}`}
                />
                {badge !== null && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 bg-primary text-[9px] font-bold text-primary-foreground rounded-full flex items-center justify-center px-0.5">
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium leading-none ${isActive ? "text-primary" : ""}`}>
                {label}
              </span>
              {isActive && (
                <span className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
