import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    console.log('--- API MENU START ---');
    const items = await prisma.menuItem.findMany({
      include: {
        category: true
      }
    });
    console.log('Items found:', items.length);
    const categories = await prisma.category.findMany();
    console.log('Categories found:', categories.length);
    
    return NextResponse.json({ items, categories });
  } catch (error: any) {
    console.error('API Menu Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch menu', 
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
