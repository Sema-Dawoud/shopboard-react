export type ProductCategory = 'Skincare';

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  image: string;
  imageAlt: string;
  inStock: boolean;
  featured: boolean;
}

export type ProductCategoryFilter = 'all' | ProductCategory;

export type ProductSortOrder = 'default' | 'low-high' | 'high-low';

export type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success' };
