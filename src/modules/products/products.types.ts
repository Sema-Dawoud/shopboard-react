export interface Product {
  id: number;
  name: string;
  category: 'Skincare';
  price: number;
  description: string;
  image: string;
  imageAlt: string;
  inStock: boolean;
  featured: boolean;
}

export type ProductCategoryFilter = 'all' | Product['category'];

export type ProductSortOrder = 'default' | 'low-high' | 'high-low';

export type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success' };
