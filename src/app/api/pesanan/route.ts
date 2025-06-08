import { NextResponse } from "next/server";
import { pool } from "@/lib/db"; // 0) Import koneksi dari pool

// 1) Fungsi GET untuk mengambil daftar pesanan
export async function GET() {
  try {
    // 2) Jalankan query untuk mengambil data pesanan
    const [rows] = await pool.query(`
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

    // 3) Return hasil dalam format JSON
    return NextResponse.json(rows);
  } catch (error) {
    // 4) Tangani error
    console.error("Failed to fetch pesanan:", error);
    return NextResponse.json(
      { error: "Failed to fetch pesanan" },
      { status: 500 }
    );
  }
}
