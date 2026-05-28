import { db, productsTable } from "./index";

const SEED_PRODUCTS = [
  { name: "Samsung Galaxy A55", price: 3290000, category: "Elektronika", imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&auto=format", description: "Zamonaviy smartfon, 50MP kamera, 5000mAh batareya.", rating: 4.8 },
  { name: "Milliy libos (Adras ko'ylak)", price: 185000, category: "Kiyim-kechak", imageUrl: "https://images.unsplash.com/photo-1583391733959-b09e2e6c8b16?w=400&h=400&fit=crop&auto=format", description: "An'anaviy o'zbek adras matodan tikilgan ko'ylak.", rating: 4.9 },
  { name: "AirPods Pro 2", price: 1890000, category: "Elektronika", imageUrl: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop&auto=format", description: "Faol shovqinni kamaytirish, suyuqlikdan himoya.", rating: 4.7 },
  { name: "Nike Air Max", price: 690000, category: "Sport", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format", description: "Qulay sport poyabzali, har qanday faoliyat uchun.", rating: 4.6 },
  { name: "Xiaomi Mi Band 8", price: 390000, category: "Elektronika", imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?w=400&h=400&fit=crop&auto=format", description: "Aqlli bilakuzuk, yurak urishi va uyqu monitoringi.", rating: 4.5 },
  { name: "Silk Atlas to'n", price: 450000, category: "Kiyim-kechak", imageUrl: "https://images.unsplash.com/photo-1522204657746-fccce27f9cb8?w=400&h=400&fit=crop&auto=format", description: "Xom ipakdan tayyorlangan milliy to'n, bayramlar uchun ideal.", rating: 4.9 },
  { name: "Philips blender", price: 259000, category: "Uy jihozlari", imageUrl: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop&auto=format", description: "Kuchli blender, 1200W, 5 tezlik rejimi.", rating: 4.4 },
  { name: "Zara ko'ylagi", price: 320000, category: "Kiyim-kechak", imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop&auto=format", description: "Zamonaviy stil, yumshoq mato, barcha o'lchamlarda.", rating: 4.7 },
  { name: "Dyson Fen", price: 4200000, category: "Go'zallik", imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=400&fit=crop&auto=format", description: "Professional soch quritgich, issiqlik himoyasi.", rating: 4.8 },
  { name: "Kofe mashina DeLonghi", price: 5400000, category: "Uy jihozlari", imageUrl: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop&auto=format", description: "Avtomatik espresso mashina, 15 bar bosim.", rating: 4.9 },
];

export async function seedIfEmpty() {
  const existing = await db.select().from(productsTable);
  if (existing.length > 0) return;
  await db.insert(productsTable).values(SEED_PRODUCTS);
}
