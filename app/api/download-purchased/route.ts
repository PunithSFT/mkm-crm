import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { getAllPurchasedCustomers } from '@/lib/db';

export async function GET() {
  try {
    const rawData = await getAllPurchasedCustomers();

    // Clean data: empty/whitespace → null (shows as blank cell in Excel)
    const cleanedData = rawData.map((c: any) => ({
      Date: c.Date?.trim() || null,
      'Customer Name': c['Customer Name']?.trim() || null,
      Item: c.Item?.trim() || null,
      'Purchased Amount': c['Purchased Amount'] ? Number(c['Purchased Amount']) : null,
      'Telephone Number': c['Telephone Number']?.trim() || null,
      Value: c.Value ? Number(c.Value) : null,
      'Short Description': c['Short Description']?.trim() || null,
    }));

    const ws = XLSX.utils.json_to_sheet(cleanedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Purchased Customers');

    // Optional: Auto-size columns
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    ws['!cols'] = [];
    for (let C = range.s.c; C <= range.e.c; ++C) {
      let maxw = 10;
      for (let R = range.s.r; R <= range.e.r; ++R) {
        const cell = ws[XLSX.utils.encode_cell({ c: C, r: R })];
        if (cell && cell.v != null) {
          const len = String(cell.v).length;
          if (len > maxw) maxw = len;
        }
      }
      ws['!cols'][C] = { wch: Math.min(maxw + 2, 60) };
    }

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="purchased-customers.xlsx"',
      },
    });
  } catch (e) {
    console.error('Export error:', e);
    return NextResponse.json({ error: 'Failed to generate file' }, { status: 500 });
  }
}