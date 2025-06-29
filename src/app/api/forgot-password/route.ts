import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db.js';
import { RowDataPacket } from 'mysql2';

export async function POST(req: NextRequest) {
  try {
    const { email, newPassword } = (await req.json()) as {
      email?: string;
      newPassword?: string;
    };

    if (!email || !newPassword) {
      return NextResponse.json(
        { message: 'Email dan password baru wajib diisi.' },
        { status: 400 }
      );
    }

    // Cek user ada?
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT idUser FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { message: 'Email tidak ditemukan.' },
        { status: 404 }
      );
    }

    // Update password (plain-text: ganti dengan hashing sesuai kebutuhan)
    await pool.execute(
      'UPDATE users SET password = ? WHERE email = ?',
      [newPassword, email]
    );

    return NextResponse.json(
      { message: 'Password berhasil direset.' },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Forgot-password error:', err);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}