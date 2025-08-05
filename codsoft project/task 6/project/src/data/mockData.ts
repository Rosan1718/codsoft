import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    description: 'High-quality wireless headphones with noise cancellation and superior sound quality. Perfect for music lovers and professionals.',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 25,
    rating: 4.8,
    reviews: 124,
    tags: ['wireless', 'headphones', 'audio', 'premium'],
    featured: true
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    description: 'Track your health and fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and 7-day battery life.',
    images: [
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 18,
    rating: 4.6,
    reviews: 89,
    tags: ['smartwatch', 'fitness', 'health', 'wearable'],
    featured: true
  },
  {
    id: '3',
    name: 'Minimalist Leather Backpack',
    price: 149.99,
    originalPrice: 189.99,
    description: 'Stylish and functional leather backpack perfect for work or travel. Made from genuine leather with multiple compartments.',
    images: [
      'https://images.pexels.com/photos/1545558/pexels-photo-1545558.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    stock: 12,
    rating: 4.7,
    reviews: 56,
    tags: ['backpack', 'leather', 'fashion', 'travel']
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    price: 899.99,
    description: 'High-performance camera lens for professional photography. Sharp images with beautiful bokeh effect.',
    images: [
      'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 8,
    rating: 4.9,
    reviews: 34,
    tags: ['camera', 'lens', 'photography', 'professional']
  },
  {
    id: '5',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    description: 'Comfortable and sustainable t-shirt made from 100% organic cotton. Available in multiple colors.',
    images: [
      'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    stock: 45,
    rating: 4.4,
    reviews: 78,
    tags: ['t-shirt', 'organic', 'cotton', 'sustainable']
  },
  {
    id: '6',
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    description: 'Keep your drinks at the perfect temperature with this insulated stainless steel water bottle. Eco-friendly and durable.',
    images: [
      'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Lifestyle',
    stock: 32,
    rating: 4.5,
    reviews: 92,
    tags: ['water bottle', 'stainless steel', 'eco-friendly', 'insulated']
  },
  {
    id: '7',
    name: 'Bluetooth Portable Speaker',
    price: 79.99,
    originalPrice: 99.99,
    description: 'Powerful portable speaker with rich bass and crystal-clear sound. Perfect for parties or outdoor activities.',
    images: [
      'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 22,
    rating: 4.6,
    reviews: 67,
    tags: ['speaker', 'bluetooth', 'portable', 'audio']
  },
  {
    id: '8',
    name: 'Artisan Coffee Beans',
    price: 19.99,
    description: 'Premium single-origin coffee beans roasted to perfection. Rich flavor with notes of chocolate and caramel.',
    images: [
      'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Food & Drink',
    stock: 56,
    rating: 4.8,
    reviews: 143,
    tags: ['coffee', 'artisan', 'premium', 'organic']
  }
];

export const categories = [
  'All Categories',
  'Electronics',
  'Fashion',
  'Lifestyle',
  'Food & Drink'
];