import type {
  Product,
  ProductCategoryFilter,
  ProductSortOrder,
} from './products.types.js';

export function searchProducts(
  products: Product[],
  searchTerm: string,
): Product[] {
  const query = searchTerm.trim().toLowerCase();

  if (query.length === 0) {
    return [...products];
  }

  return products.filter((product) =>
    [product.name, product.category, product.description]
      .join(' ')
      .toLowerCase()
      .includes(query),
  );
}

export function getProductCategories(
  products: readonly Product[],
): Product['category'][] {
  return [...new Set(products.map((product) => product.category))].sort(
    (a, b) => a.localeCompare(b),
  );
}

export function filterProducts(
  products: Product[],
  category: ProductCategoryFilter,
): Product[] {
  if (category === 'all') {
    return [...products];
  }

  return products.filter((product) => product.category === category);
}

export function sortProducts(
  products: Product[],
  sortOrder: ProductSortOrder,
): Product[] {
  const sortedProducts = [...products];

  if (sortOrder === 'low-high') {
    return sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOrder === 'high-low') {
    return sortedProducts.sort((a, b) => b.price - a.price);
  }

  return sortedProducts;
}
