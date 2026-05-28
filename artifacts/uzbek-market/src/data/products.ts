export const products = [
  { id: '1', name: 'Samsung Galaxy A55', price: 3290000, category: 'Elektronika', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&auto=format', rating: 4.8 },
  { id: '2', name: 'Milliy libos (Adras ko\'ylak)', price: 185000, category: 'Kiyim-kechak', image: 'https://images.unsplash.com/photo-1583391733959-b09e2e6c8b16?w=400&h=400&fit=crop&auto=format', rating: 4.9 },
  { id: '3', name: 'AirPods Pro 2', price: 1890000, category: 'Elektronika', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop&auto=format', rating: 4.7 },
  { id: '4', name: 'Nike Air Max', price: 690000, category: 'Sport', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format', rating: 4.6 },
  { id: '5', name: 'Xiaomi Mi Band 8', price: 390000, category: 'Elektronika', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?w=400&h=400&fit=crop&auto=format', rating: 4.5 },
  { id: '6', name: 'Silk Atlas to\'n', price: 450000, category: 'Kiyim-kechak', image: 'https://images.unsplash.com/photo-1522204657746-fccce27f9cb8?w=400&h=400&fit=crop&auto=format', rating: 4.9 },
  { id: '7', name: 'Philips blender', price: 259000, category: 'Uy jihozlari', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop&auto=format', rating: 4.4 },
  { id: '8', name: 'Zara ko\'ylagi', price: 320000, category: 'Kiyim-kechak', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop&auto=format', rating: 4.7 },
  { id: '9', name: 'Dyson Fen', price: 4200000, category: 'Go\'zallik', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=400&fit=crop&auto=format', rating: 4.8 },
  { id: '10', name: 'Kofe mashina DeLonghi', price: 5400000, category: 'Uy jihozlari', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop&auto=format', rating: 4.9 },
];

export const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
};