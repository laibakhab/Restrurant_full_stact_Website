import prisma from './prisma';

const categories = [
  { name: 'Biryani', slug: 'biryani' },
  { name: 'BBQ', slug: 'bbq' },
  { name: 'Burgers', slug: 'burgers' },
  { name: 'Pizza', slug: 'pizza' },
  { name: 'Drinks', slug: 'drinks' },
  { name: 'Desserts', slug: 'desserts' },
];

const menuItemsData = [
  {
    name: 'Special Chicken Biryani',
    price: 450,
    description: 'Aromatic basmati rice cooked with tender chicken and authentic spices.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categorySlug: 'biryani',
    tags: ['popular', 'spicy']
  },
  {
    name: 'Beef Seekh Kabab',
    price: 600,
    description: 'Succulent beef skewers grilled to perfection over charcoal.',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categorySlug: 'bbq',
    tags: ['popular']
  },
  {
    name: 'Mutton Karahi',
    price: 1800,
    description: 'Traditional mutton karahi with green chilies and ginger.',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categorySlug: 'bbq',
    tags: ['spicy']
  },
  {
    name: 'Zinger Burger',
    price: 350,
    description: 'Crispy fried chicken breast with lettuce and mayo in a soft bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categorySlug: 'burgers',
    tags: ['popular']
  },
  {
    name: 'Classic Beef Burger',
    price: 450,
    description: 'Juicy beef patty with cheese, pickles, and our special sauce.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categorySlug: 'burgers',
    tags: []
  },
  {
    name: 'Chicken Tikka Pizza',
    price: 950,
    description: 'Traditional tikka chunks, onions, and green peppers with mozzarella.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categorySlug: 'pizza',
    tags: ['spicy']
  },
  {
    name: 'Veggie Supreme Pizza',
    price: 850,
    description: 'Loaded with bell peppers, olives, mushrooms, and sweet corn.',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categorySlug: 'pizza',
    tags: ['veg']
  },
  {
    name: 'Mint Margarita',
    price: 250,
    description: 'Refreshing blend of fresh mint, lime, and soda.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categorySlug: 'drinks',
    tags: ['popular']
  },
  {
    name: 'Gulab Jamun (2pcs)',
    price: 150,
    description: 'Hot milk-solid based sweets soaked in sugar syrup.',
    image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categorySlug: 'desserts',
    tags: []
  }
];

export async function seed() {
  try {
    console.log('Starting seed process...');
    
    // Clear existing data sequentially to avoid foreign key issues
    console.log('Cleaning up existing data...');
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.menuItem.deleteMany({});
    await prisma.category.deleteMany({});
    
    // Insert Categories
    console.log('Inserting categories...');
    const createdCategories = [];
    for (const cat of categories) {
      const created = await prisma.category.create({ data: cat });
      createdCategories.push(created);
    }
    
    // Map category slugs to IDs
    const categoryMap = createdCategories.reduce((acc, cat) => {
      acc[cat.slug] = cat.id;
      return acc;
    }, {} as Record<string, string>);
    
    // Insert Menu Items
    console.log('Inserting menu items...');
    for (const item of menuItemsData) {
      const { categorySlug, ...rest } = item;
      await prisma.menuItem.create({
        data: {
          ...rest,
          categoryId: categoryMap[categorySlug]
        }
      });
    }
    
    console.log('Database seeded successfully');
    return { success: true };
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}
