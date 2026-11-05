import cleanserAndSerumImage from '../../assets/beauty/skincare-hero.jpg';
import skincareEssentialsImage from '../../assets/beauty/skincare-duo.jpg';
import type { Product } from './products.types.js';

const products: Product[] = [
  {
    id: 101,
    name: 'Ela De Pure Gel Facial Cleanser',
    category: 'Skincare',
    price: 18,
    description: 'A gentle everyday cleanse in a 100 ml tube.',
    image: cleanserAndSerumImage,
    imageAlt: 'Ela De Pure gel facial cleanser tube',
    inStock: true,
    featured: true,
  },
  {
    id: 102,
    name: 'Ela De Pure Hydralift Serum',
    category: 'Skincare',
    price: 28,
    description: 'A hydrating serum in a 30 ml dropper bottle.',
    image: cleanserAndSerumImage,
    imageAlt: 'Ela De Pure Hydralift serum bottle',
    inStock: true,
    featured: true,
  },
  {
    id: 103,
    name: 'Ela De Pure Rosehip Oil',
    category: 'Skincare',
    price: 24,
    description: 'Rosehip oil in an amber glass bottle.',
    image: skincareEssentialsImage,
    imageAlt: 'Ela De Pure Rosehip Oil amber dropper bottle',
    inStock: true,
    featured: false,
  },
  {
    id: 104,
    name: 'Ela De Pure Shea Butter',
    category: 'Skincare',
    price: 22,
    description: 'A rich shea butter jar for your daily care shelf.',
    image: skincareEssentialsImage,
    imageAlt: 'Ela De Pure Shea Butter skincare jar',
    inStock: true,
    featured: false,
  },
];

export default products;
