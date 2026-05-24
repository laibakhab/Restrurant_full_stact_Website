import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, total, paymentMethod } = body;

    const order = await prisma.order.create({
      data: {
        customerName: customer.name,
        customerPhone: customer.phone,
        customerAddress: customer.address,
        customerCity: customer.city || 'Karachi',
        total: total,
        paymentMethod: paymentMethod,
        items: {
          create: items.map((item: any) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          }))
        }
      }
    });
    
    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error('API Order Error:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
