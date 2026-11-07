import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SiteLayout } from './app/SiteLayout.js';

const HomePage = lazy(() => import('./pages/HomePage.js'));
const ShopPage = lazy(
  () => import('./products/components/products/ShopPage.js'),
);
const ProductDetailsPage = lazy(
  () => import('./products/components/products/ProductDetailsPage.js'),
);
const CartPage = lazy(() => import('./cart/components/cart/CartPage.js'));
const CheckoutPage = lazy(
  () => import('./checkout/components/checkout/CheckoutPage.js'),
);
const AboutPage = lazy(() => import('./pages/AboutPage.js'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.js'));

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
