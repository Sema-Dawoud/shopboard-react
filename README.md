# ShopBoard

ShopBoard is a responsive skincare store built with React, TypeScript, and Vite. It includes a product catalog, persistent shopping cart, and a mock shipping checkout.

## Features

- Multi-page navigation with React Router.
- Home, Shop, Product Details, Cart, Checkout, About, and 404 pages.
- Lazy-loaded route pages with a shared site layout and a Suspense loading fallback.
- Product data shared through Products Context. The catalog starts with local products and adds products fetched from DummyJSON through the Vite `/api` proxy.
- Shared cart state managed by Zustand and persisted in `localStorage`.
- Product search, category filtering, and price sorting.
- Product details loaded by product ID, with separate loading, unavailable, and not-found states.
- Shipping checkout built with React Hook Form and Zod. Orders are mock submissions; no payment details are collected.
- Checkout uses local shadcn/ui Button, Card, Input, and Label components with Tailwind CSS utilities layered alongside the existing CSS design system.
- Loading, API error, empty-cart, and no-results states, plus toast notifications.
- A route-content Error Boundary with a retry action.
- Responsive, mobile-first layouts and accessible labels and status messages.

## Tech stack

### Runtime dependencies

- React and React DOM 19
- React Router DOM 7
- Zustand 5
- React Hook Form 7
- Zod 4 and `@hookform/resolvers` 7
- Radix UI label and slot primitives, `class-variance-authority`, `clsx`, and `tailwind-merge` for the shadcn/ui components

### Development tools

- TypeScript 6 and Vite 8 with `@vitejs/plugin-react`
- Tailwind CSS 4 with `@tailwindcss/vite`
- ESLint 10 with `typescript-eslint`, React Hooks, and React Refresh plugins
- Prettier 3
- Husky 9 and lint-staged 17

The UI keeps its existing CSS design system. Tailwind CSS 4 is configured through the Vite plugin for the shadcn/ui checkout components; Tailwind Preflight is omitted to preserve existing global styles. The shadcn/ui CLI configuration is in `components.json`.

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run the project checks:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

`npm run build` runs the TypeScript project build and creates the production bundle in `dist/`. The Husky pre-commit hook runs `npx lint-staged`, then typecheck, lint, format check, and build sequentially; any failure stops the hook.

## Routes

| Route              | Page                                                |
| ------------------ | --------------------------------------------------- |
| `/`                | Home page with featured products and store sections |
| `/shop`            | Searchable, filterable, sortable product collection |
| `/products/:id`    | Product details for the requested product ID        |
| `/cart`            | Shopping cart and order total                       |
| `/checkout`        | Shipping form and mock order confirmation           |
| `/about`           | About the store                                     |
| Any unmatched path | 404 page                                            |

## Architecture

- **Shared cart state:** Zustand owns cart items and cart actions because they are used across pages and the shared header. Its persist middleware stores the cart in `localStorage`.
- **Shared product data:** `ProductsProvider` fetches the catalog once and exposes products, loading/error state, and retry through Products Context. Pages and components consume it with `useProducts`.
- **Local and derived state:** The search query is URL-backed; UI-only state such as filters, form values, and page-specific request status stays near the component that uses it. Counts, filtered products, cart lines, and totals are derived from source state rather than stored twice.
- **Route loading and render errors:** `App` lazy-loads each route. `SiteLayout` keeps the header and footer shared, and places a Suspense fallback and route `Outlet` inside an Error Boundary. The boundary provides a retry action for render failures and resets when the pathname changes. API failures continue to use the pages' own loading, error, and retry states.

## Component hierarchy and data flow

```text
StrictMode
└── BrowserRouter
    └── ProductsProvider
        └── App (Routes with lazy-loaded pages)
            └── SiteLayout
                └── ToastProvider
                    ├── SiteHeader
                    ├── main: ErrorBoundary > Suspense > Outlet (matched page)
                    ├── SiteFooter
                    └── ToastRegion
```

- `SiteLayout` reads cart items from Zustand, derives their total quantity as `cartCount`, and passes it to `SiteHeader` for the header count and bag link.
- `HomePage` reads products through `useProducts` and the add action through `useCartStore`. It passes `products` and `onAddToCart` to `FeaturedProducts`, which passes each product and the same action to `ProductCard`.
- `ShopPage` reads the shared products and load state, derives unique categories with `getProductCategories`, and derives searched, filtered, and sorted product lists. It passes those values and the filter, sort, retry, and add-to-cart handlers to `ProductCollection`.
- `ProductsProvider` supplies products, loading/error state, and retry through Products Context; pages and components access them with `useProducts`. Cart pages and checkout access shared cart items and actions directly with Zustand selectors.
- App-wide state is the product catalog/load status in Products Context, cart item IDs/quantities in Zustand, and toast notices in `ToastProvider`. The search query is kept in the URL; shop category/sort filters, checkout form/order confirmation, mobile menu, and product-detail request state stay with their owning components. Product categories, visible product lists, cart lines, counts, and totals are derived rather than stored separately.
- `CheckoutPage` joins Zustand cart IDs and quantities with products from `useProducts` to derive order-summary lines and the total. A valid mock submission calls the cart's `clearCart` action and sets its local order-confirmation state.

## Project structure

```text
src/
├── App.tsx
├── main.tsx
├── index.css
├── app/
│   ├── ErrorBoundary.tsx
│   ├── SiteLayout.tsx
│   ├── ToastContext.tsx
│   ├── toast-context.ts
│   └── useToast.ts
├── assets/
│   ├── images.d.ts
│   ├── tulip-logo.svg
│   └── beauty/
│       ├── skincare-duo.jpg
│       └── skincare-hero.jpg
├── cart/
│   ├── cart.store.ts
│   ├── cart.types.ts
│   └── components/cart/
│       ├── CartPage.tsx
│       └── CartSection.tsx
├── checkout/
│   └── components/checkout/
│       └── CheckoutPage.tsx
├── home/
│   └── components/home/
│       ├── AccountSection.tsx
│       ├── CategorySection.tsx
│       ├── EditorialSection.tsx
│       ├── HeroSection.tsx
│       ├── StoreBenefits.tsx
│       └── ValuesStrip.tsx
├── pages/
│   ├── AboutPage.tsx
│   ├── HomePage.tsx
│   └── NotFoundPage.tsx
├── products/
│   ├── ProductsProvider.tsx
│   ├── products-context.ts
│   ├── products.api.ts
│   ├── products.data.ts
│   ├── products.logic.ts
│   ├── products.types.ts
│   ├── useProducts.ts
│   └── components/products/
│       ├── FeaturedProducts.tsx
│       ├── ProductCard.tsx
│       ├── ProductCollection.tsx
│       ├── ProductDetailsPage.tsx
│       └── ShopPage.tsx
└── shared/
    ├── api/client.ts
    ├── components/
    │   ├── BrandLogo.tsx
    │   ├── SiteFooter.tsx
    │   ├── SiteHeader.tsx
    │   ├── ToastRegion.tsx
    │   └── ui/
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── input.tsx
    │       └── label.tsx
    └── utils/
        ├── cn.ts
        └── format-price.ts
```
