import { NextResponse } from 'next/server';
import {
  getDailyVisitingCustomerById,
  updateDailyVisitingCustomer,
  deleteDailyVisitingCustomer
} from '@/lib/db';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params; // ← MUST await here
    const customer = await getDailyVisitingCustomerById(params.id);
    if (!customer) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(customer);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params; // ← MUST await here
    const data = await request.json();
    await updateDailyVisitingCustomer(params.id, data);
    return NextResponse.json({ success: true, message: 'Updated successfully' });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ success: false, message: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params; // ← MUST await here
    await deleteDailyVisitingCustomer(params.id);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
  }
}