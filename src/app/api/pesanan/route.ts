// app/api/pesanan/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rentalq',
};

export async function GET() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(`
      SELECT 
        p.idPesanan AS id,
        DATE(p.waktuAmbil) AS tanggalSewa,
        DATE(p.waktuKembali) AS tanggalKembali,
        TIME(p.waktuAmbil) AS startTime,
        TIME(p.waktuKembali) AS endTime,
        k.namaKendaraan AS jenisMotor,
        p.statusPesanan AS status,
        k.fotoKendaraan AS gambar,
        p.idBayar AS inv,
        CONCAT('Rp', FORMAT(p.totalBiaya, 0)) AS total
      FROM pesanan p
      JOIN kendaraan k ON p.idKendaraan = k.idKendaraan
      ORDER BY p.waktuAmbil DESC
    `);
    await connection.end();

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch pesanan:', error);
    return NextResponse.json({ error: 'Failed to fetch pesanan' }, { status: 500 });
  }
}
