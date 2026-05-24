import { NextResponse } from 'next/server';
import { seed } from '@/lib/seedData';

export async function GET() {
  try {
    await seed();
    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error: any) {
    console.error('Seed Error Detail:', error);
    return NextResponse.json({ 
      error: 'Failed to seed database', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
