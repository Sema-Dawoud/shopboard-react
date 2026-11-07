import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteFooter } from '../shared/components/SiteFooter.js';
import { SiteHeader } from '../shared/components/SiteHeader.js';
import { useCartStore } from '../cart/cart.store.js';
import { ErrorBoundary } from './ErrorBoundary.js';
import { ToastProvider } from './ToastContext.js';

export function SiteLayout() {
  const location = useLocation();
  const cartCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <ToastProvider>
      <SiteHeader cartCount={cartCount} />
      <main>
        <ErrorBoundary key={location.pathname}>
          <Suspense
            fallback={
              <p className="products-status" role="status">
                Loading page…
              </p>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <SiteFooter />
    </ToastProvider>
  );
}
