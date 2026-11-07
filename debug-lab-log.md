# Debug lab log

## Bug 1

- **What I saw:** React displayed a warning about a missing unique key prop.
- **Component:** `CategoryChips` (historical name; no component with this name exists in the current source).
- **How I found it:** Console warning.
- **Cause:** The list items rendered with `map()` do not have unique keys.
- **Fix:** Add a unique `key` prop to each element rendered inside `map()`.
- **Current reference:** The closest category-list rendering is the category options map in `src/products/components/products/ProductCollection.tsx`, where each option has `key={productCategory}`. It is a select, not chips, so the current code does not establish that it is the same historical component.

## Bug 2

- **What I saw:** The number 0 appeared on sold-out product cards.
- **Component:** `ProductCard` (current component name; the `stock &&` expression is historical and is not present in the current component).
- **How I found it:** React DevTools - inspected the stock prop.
- **Cause:** Using `stock &&` in JSX renders 0 when stock is zero.
- **Fix:** Use `stock > 0 &&` instead.
- **Current reference:** `src/products/components/products/ProductCard.tsx` displays the product category and disables the add button using `product.inStock`. `src/products/products.api.ts` maps API stock to that boolean. The current source does not display a stock count, so it does not reproduce the logged symptom or expression.

## Bug 3

- **What I saw:** The favorite heart moved to another product after sorting.
- **Component:** `ProductList` (historical name; absent from the current source) / `ProductCard` (current name).
- **How I found it:** React DevTools - inspected component keys before and after sorting.
- **Cause:** Using the array index as the key instead of a stable product ID.
- **Fix:** Use `key={product.id}` for each ProductCard.
- **Current reference:** `src/products/components/products/ShopPage.tsx` derives the sorted products, and `src/products/components/products/ProductCollection.tsx` maps them to `ProductCard` with `key={product.id}`. The current `ProductCard` has no favorite-heart UI, so the logged visual symptom cannot be confirmed from the current code.

## Bug 4

- **What I saw:** Products remained sorted by price after switching back to Featured.
- **Component:** `ProductList` (historical name; absent from the current source).
- **How I found it:** Changed sorting options and checked the product order.
- **Cause:** The `sort()` method modified the original products array.
- **Fix:** Create a copy of the array before sorting it using `[...products].sort()`.
- **Current reference:** `src/products/products.logic.ts` implements `sortProducts` by copying the array before sorting. `src/products/components/products/ShopPage.tsx` uses that function. This is the current implementation of the logged sorting behavior.

## Bug 5

- **What I saw:** Clicking the + button did not update the quantity or total correctly.
- **Component:** `CartRow` (historical name; absent from the current source).
- **How I found it:** React DevTools - inspected `item.qty` before and after clicking +.
- **Cause:** The cart item was mutated directly instead of creating a new state object.
- **Fix:** Create a new cart array and a new item object when updating the quantity.
- **Current reference:** `src/cart/components/cart/CartSection.tsx` renders the cart item controls, `src/cart/components/cart/CartPage.tsx` connects their callbacks to the store, and `src/cart/cart.store.ts` updates items immutably. The current cart model uses `quantity`, not `qty`.
