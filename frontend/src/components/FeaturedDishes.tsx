import React from 'react';
import MenuCard from './MenuCard';
import Link from 'next/link';

const featuredDishes = [
  {
    id: '1',
    name: 'Special Chicken Biryani',
    price: 450,
    description: 'Aromatic basmati rice cooked with tender chicken and authentic spices.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: { name: 'Biryani', slug: 'biryani' },
    tags: ['popular', 'spicy']
  },
  {
    id: '2',
    name: 'Beef Seekh Kabab',
    price: 600,
    description: 'Succulent beef skewers grilled to perfection over charcoal.',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: { name: 'BBQ', slug: 'bbq' },
    tags: ['popular']
  },
  {
    id: '3',
    name: 'Zinger Burger',
    price: 350,
    description: 'Crispy fried chicken breast with lettuce and mayo in a soft bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: { name: 'Burgers', slug: 'burgers' },
    tags: ['popular']
  },
  {
    id: '4',
    name: 'Chicken Tikka Pizza',
    price: 950,
    description: 'Traditional tikka chunks, onions, and green peppers with mozzarella.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: { name: 'Pizza', slug: 'pizza' },
    tags: ['spicy']
  }
];

const FeaturedDishes = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-[#27251F] uppercase tracking-tighter mb-4">
              Our <span className="text-[#E31837]">Fan Favorites</span>
            </h2>
            <div className="w-24 h-2 bg-[#E31837] mx-auto md:mx-0 rounded-full"></div>
          </div>
          <Link href="/menu" className="btn-secondary">
            View All Dishes
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredDishes.map((dish) => (
            <MenuCard 
              key={dish.id} 
              {...dish} 
              category={dish.category.slug} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
