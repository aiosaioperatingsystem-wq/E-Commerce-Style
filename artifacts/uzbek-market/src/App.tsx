import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { BottomNav } from "@/components/BottomNav";

import { Home } from "@/pages/Home";
import { Catalog } from "@/pages/Catalog";
import { ProductDetail } from "@/pages/ProductDetail";
import { Cart } from "@/pages/Cart";
import { Checkout } from "@/pages/Checkout";
import { Sevimlilar } from "@/pages/Sevimlilar";
import { Admin } from "@/pages/Admin";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/katalog" component={Catalog} />
      <Route path="/mahsulot/:id" component={ProductDetail} />
      <Route path="/savat" component={Cart} />
      <Route path="/buyurtma" component={Checkout} />
      <Route path="/sevimlilar" component={Sevimlilar} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppShell() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <RouterWithNav />
    </WouterRouter>
  );
}

function RouterWithNav() {
  return (
    <>
      <Switch>
        {/* Admin gets no bottom nav */}
        <Route path="/admin" component={Admin} />
        {/* All other routes get bottom nav */}
        <Route>
          <>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/katalog" component={Catalog} />
              <Route path="/mahsulot/:id" component={ProductDetail} />
              <Route path="/savat" component={Cart} />
              <Route path="/buyurtma" component={Checkout} />
              <Route path="/sevimlilar" component={Sevimlilar} />
              <Route component={NotFound} />
            </Switch>
            <BottomNav />
          </>
        </Route>
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <FavoritesProvider>
          <TooltipProvider>
            <AppShell />
            <Toaster />
          </TooltipProvider>
        </FavoritesProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
