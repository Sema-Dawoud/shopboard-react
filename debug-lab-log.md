# Debug lab log

## Bug 1

- **What I saw:** React displayed a warning about a missing unique key prop.
- **Component:** CategoryChips
- **How I found it:** Console warning
- **Cause:** The list items rendered with map() do not have unique keys.
- **Fix:** Add a unique key prop to each element rendered inside map().

## Bug 2

- **What I saw:** The number 0 appeared on sold-out product cards.
- **Component:** ProductCard
- **How I found it:** React DevTools - inspected the stock prop.
- **Cause:** Using `stock &&` in JSX renders 0 when stock is zero.
- **Fix:** Use `stock > 0 &&` instead.

## Bug 3

- **What I saw:** The favorite heart moved to another product after sorting.
- **Component:** ProductList / ProductCard
- **How I found it:** React DevTools - inspected component keys before and after sorting.
- **Cause:** Using the array index as the key instead of a stable product ID.
- **Fix:** Use `key={product.id}` for each ProductCard.

## Bug 4

- **What I saw:** Products remained sorted by price after switching back to Featured.
- **Component:** ProductList
- **How I found it:** Changed sorting options and checked the product order.
- **Cause:** The sort() method modified the original products array.
- **Fix:** Create a copy of the array before sorting it using [...products].sort().

## Bug 5

- **What I saw:** Clicking the + button did not update the quantity or total correctly.
- **Component:** CartRow
- **How I found it:** React DevTools - inspected item.qty before and after clicking +.
- **Cause:** The cart item was mutated directly instead of creating a new state object.
- **Fix:** Create a new cart array and a new item object when updating the quantity.
