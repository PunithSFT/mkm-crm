import { NextResponse } from 'next/server';
import { 
  getPurchasedCustomerById, 
  updatePurchasedCustomer, 
  deletePurchasedCustomer 
} from '@/lib/db';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }  // ← note: Promise here
) {
  try {
    const params = await context.params;  // ← await it!
    const customer = await getPurchasedCustomerById(params.id);
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }
    return NextResponse.json(customer);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;  // ← await it!
    const data = await request.json();
    await updatePurchasedCustomer(params.id, data);
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
    const params = await context.params;  // ← await it!
    await deletePurchasedCustomer(params.id);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
  }
}