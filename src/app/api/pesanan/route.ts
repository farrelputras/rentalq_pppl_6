import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

// GET /api/pesanan?id=3
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    let query = `
      SELECT 
        p.id AS id,
        DATE(p.waktuAmbil) AS tanggalSewa,
        DATE(p.waktuKembali) AS tanggalKembali,
        TIME(p.waktuAmbil) AS startTime,
        TIME(p.waktuKembali) AS endTime,
        k.namaKendaraan AS jenisMotor,
        k.transmisi,
        k.cc,
        k.nopol,
        p.statusPesanan AS status,
        k.fotoKendaraan AS gambar,
        p.idBayar AS inv,
        p.basicBiaya,
        p.pickupBiaya,
        p.taxBiaya,
        p.promo,
        p.totalBiaya
      FROM pesanan p
      JOIN kendaraan k ON p.idKendaraan = k.id
    `;

    if (id) {
      query += ` WHERE p.id = ?`;
    }

    const [rows] = await pool.query(query, id ? [id] : []);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Failed to fetch pesanan:", error);
    return NextResponse.json(
      { error: "Failed to fetch pesanan" },
      { status: 500 }
    );
  }
}
