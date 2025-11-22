import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

// GET - Read all items
export async function GET() {
  try {
    const db = await connectDB();
    const [rows] = await db.execute('SELECT * FROM items ORDER BY created_at DESC');
    await db.end();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create new item
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, subtitle, description, status } = body;
    
    const db = await connectDB();
    const [result] = await db.execute(
      'INSERT INTO items (title, subtitle, description, status) VALUES (?, ?, ?, ?)',
      [title, subtitle, description, status || 'reguler']
    );
    await db.end();
    
    return NextResponse.json({ 
      id: result.insertId, 
      title, 
      subtitle,
      description, 
      status 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Update item
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, title, subtitle, description, status } = body;
    
    const db = await connectDB();
    await db.execute(
      'UPDATE items SET title = ?, subtitle = ?, description = ?, status = ? WHERE id = ?',
      [title, subtitle,description, status, id]
    );
    await db.end();
    
    return NextResponse.json({ message: 'Item updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Delete item
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    const db = await connectDB();
    await db.execute('DELETE FROM items WHERE id = ?', [id]);
    await db.end();
    
    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}