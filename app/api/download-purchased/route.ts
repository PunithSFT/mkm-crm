import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { getAllPurchasedCustomers } from '@/lib/db';

export async function GET() {
  try {
    const data = await getAllPurchasedCustomers();
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Purchased Customers');
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="purchased-customers.xlsx"',
      },
    });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to generate file' }, { status: 500 });
  }
}