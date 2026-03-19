import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { getAllVisitingClients } from '@/lib/db';

export async function GET() {
  try {
    const data = await getAllVisitingClients();
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Visiting Clients');
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="visiting-clients.xlsx"',
      },
    });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to generate file' }, { status: 500 });
  }
}