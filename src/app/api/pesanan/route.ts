import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

// ✅ GET /api/pesanan?id=3
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    let query = `
      SELECT 
        -- ID dan waktu sewa
        p.id AS id,
        DATE(p.waktuAmbil) AS tanggalSewa,
        DATE(p.waktuKembali) AS tanggalKembali,
        TIME(p.waktuAmbil) AS startTime,
        TIME(p.waktuKembali) AS endTime,

        -- Status pemesanan
        p.statusPesanan AS status,

        -- Informasi kendaraan
        k.namaKendaraan AS jenisMotor,
        k.transmisi,
        k.cc,
        k.nopol,
        k.fotoKendaraan AS gambar,

        -- Informasi pembayaran
        b.noInvoice,
        b.statusBayar AS statusBayar,
        b.metodeBayar AS metodeBayar,

        -- Informasi pengguna
        u.nama AS customerName,
        u.email AS customerEmail,
        u.fotoUser,

        -- Rincian biaya
        p.idBayar AS inv,
        p.basicBiaya,
        p.pickupBiaya,
        p.taxBiaya,
        p.promo,
        p.totalBiaya

      FROM pesanan p
      JOIN kendaraan k ON p.idKendaraan = k.id
      JOIN users u ON p.idUser = u.id
      JOIN pembayaran b ON p.idBayar = b.id
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

// ✅ POST /api/pesanan
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      idKendaraan,
      idUser,
      idBayar,
      waktuAmbil,
      waktuKembali,
      basicBiaya,
      pickupBiaya,
      taxBiaya,
      promo,
      totalBiaya,
    } = body;

    const [result]: any = await pool.query(
      `INSERT INTO pesanan (
        idKendaraan, idUser, idBayar, waktuAmbil, waktuKembali, 
        statusPesanan, basicBiaya, pickupBiaya, taxBiaya, promo, totalBiaya
      ) VALUES (?, ?, ?, ?, ?, 'Menunggu Konfirmasi', ?, ?, ?, ?, ?)`,
      [
        idKendaraan,
        idUser,
        idBayar,
        waktuAmbil,
        waktuKembali,
        basicBiaya,
        pickupBiaya,
        taxBiaya,
        promo,
        totalBiaya,
      ]
    );

    return NextResponse.json({
      success: true,
      insertedId: result.insertId,
    });
  } catch (error) {
    console.error("Failed to insert pesanan:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create pesanan" },
      { status: 500 }
    );
  }
}
