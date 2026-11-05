# ShopBoard

A responsive skincare store built with React, TypeScript, and Vite.

## Features

- Fetch products from the ShopBoard API with a local fallback.
- Search products by name.
- Filter products by category.
- Sort products by price.
- Add products to the cart and update quantities.
- Remove individual products or clear the cart.
- Persist cart data using localStorage.
- Handle loading, error, empty, and no-results states.
- Display toast notifications.
- Responsive layout for different screen sizes.

## Tech Stack

- React
- TypeScript
- Vite
- ESLint
- Prettier
- Husky
- lint-staged

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

Check formatting:

```bash
npm run format:check
```

## Project Structure

```text
src/
├── App.tsx
├── main.tsx
├── index.css
├── assets/
│   ├── images.d.ts
│   ├── tulip-logo.svg
│   └── beauty/
│       ├── skincare-duo.jpg
│       └── skincare-hero.jpg
├── components/
│   ├── AccountSection.tsx
│   ├── BrandLogo.tsx
│   ├── CartSection.tsx
│   ├── CategorySection.tsx
│   ├── EditorialSection.tsx
│   ├── FeaturedProducts.tsx
│   ├── HeroSection.tsx
│   ├── ProductCard.tsx
│   ├── ProductCollection.tsx
│   ├── SiteFooter.tsx
│   ├── SiteHeader.tsx
│   ├── StoreBenefits.tsx
│   ├── ToastRegion.tsx
│   └── ValuesStrip.tsx
├── modules/
│   ├── cart/
│   │   ├── cart.logic.ts
│   │   ├── cart.state.ts
│   │   └── cart.types.ts
│   └── products/
│       ├── products.api.ts
│       ├── products.data.ts
│       ├── products.logic.ts
│       └── products.types.ts
└── shared/
    ├── api/
    │   └── client.ts
    └── utils/
        └── format-price.ts
```

## Components

| Component         | Responsibility                              | Props                                                                        |
| ----------------- | ------------------------------------------- | ---------------------------------------------------------------------------- |
| `AccountSection`  | Displays the account section.               | None                                                                         |
| `BrandLogo`       | Displays the store logo and brand name.     | `className?: string`                                                         |
| `CartSection`     | Displays cart items, quantities, and total. | `items`, `count`, `total`, `onIncrease`, `onDecrease`, `onRemove`, `onClear` |
| `CategorySection` | Displays category                           |
