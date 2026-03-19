import { NextResponse } from 'next/server';
import { addPurchasedCustomer, getAllPurchasedCustomers } from '@/lib/db';

export async function GET() {
  const customers = await getAllPurchasedCustomers();
  return NextResponse.json(customers);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await addPurchasedCustomer(data);
    return NextResponse.json({ success: true, message: 'Customer data has been successfully synchronized.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'An error occurred while saving the data.' }, { status: 500 });
  }
}