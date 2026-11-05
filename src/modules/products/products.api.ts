import { ApiError, fetchJson } from '../../shared/api/client.js';
import localProducts from './products.data.js';
import type { Product } from './products.types.js';

interface ApiProduct {
  id: number;
  title: string;
  description: string;
  category: 'skin-care';
  price: number;
  stock: number;
  thumbnail: string;
}

interface ApiProductsResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isApiProduct(value: unknown): value is ApiProduct {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === 'number' &&
    Number.isInteger(value.id) &&
    typeof value.title === 'string' &&
    typeof value.description === 'string' &&
    value.category === 'skin-care' &&
    typeof value.price === 'number' &&
    Number.isFinite(value.price) &&
    typeof value.stock === 'number' &&
    Number.isInteger(value.stock) &&
    typeof value.thumbnail === 'string'
  );
}

function isApiProductsResponse(value: unknown): value is ApiProductsResponse {
  if (!isRecord(value) || !Array.isArray(value.products)) return false;

  return (
    value.products.every((product: unknown) => isApiProduct(product)) &&
    typeof value.total === 'number' &&
    Number.isInteger(value.total) &&
    typeof value.skip === 'number' &&
    Number.isInteger(value.skip) &&
    typeof value.limit === 'number' &&
    Number.isInteger(value.limit) &&
    value.total >= value.products.length &&
    value.skip >= 0 &&
    value.limit >= value.products.length
  );
}

function toProduct(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    name: apiProduct.title,
    category: 'Skincare',
    price: apiProduct.price,
    description: apiProduct.description,
    image: apiProduct.thumbnail,
    imageAlt: apiProduct.title,
    inStock: apiProduct.stock > 0,
    featured: false,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetchJson('/products/category/skin-care');

  if (!isApiProductsResponse(response)) {
    throw new ApiError('The product service returned an unexpected response.');
  }

  return [...localProducts, ...response.products.map(toProduct)];
}
