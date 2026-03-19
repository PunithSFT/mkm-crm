import { NextResponse } from 'next/server';
import { addVisitingClient, getAllVisitingClients } from '@/lib/db';

export async function GET() {
  const clients = await getAllVisitingClients();
  return NextResponse.json(clients);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await addVisitingClient(data);
    return NextResponse.json({ success: true, message: 'Client data has been successfully synchronized.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'An error occurred while saving the data.' }, { status: 500 });
  }
}