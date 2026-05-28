import React from "react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-muted py-12 mt-auto border-t">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4 text-primary">UzBozor</h3>
          <p className="text-sm text-muted-foreground">O'zbekistonning eng zamonaviy onlayn do'koni. Sifat va qulaylik uyg'unligi.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Bo'limlar</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/katalog" className="hover:text-primary transition-colors">Barcha mahsulotlar</Link></li>
            <li><Link href="/katalog" className="hover:text-primary transition-colors">Yangi kelganlar</Link></li>
            <li><Link href="/katalog" className="hover:text-primary transition-colors">Chegirmalar</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Mijozlar uchun</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Yetkazib berish</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">To'lov usullari</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Qaytarish va almashtirish</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Bog'lanish</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>+998 90 123 45 67</li>
            <li>info@uzbozor.uz</li>
            <li>Toshkent sh., Amir Temur shoh ko'chasi</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} UzBozor. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}