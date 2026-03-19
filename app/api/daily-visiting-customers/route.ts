import { NextResponse } from 'next/server';
import { addDailyVisitingCustomer, getAllDailyVisitingCustomers } from '@/lib/db';

export async function GET() {
  const visits = await getAllDailyVisitingCustomers();
  return NextResponse.json(visits);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await addDailyVisitingCustomer(data);
    return NextResponse.json({ success: true, message: 'Visit data has been successfully synchronized.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'An error occurred while saving the data.' }, { status: 500 });
  }
}