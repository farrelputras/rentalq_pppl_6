import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db"; // 0) Import koneksi database dari pool

// 1) Fungsi GET untuk ambil daftar motor berdasarkan filter query
export async function GET(req: NextRequest) {
  try {
    // 2) Ambil parameter dari URL (query string)
    const id = req.nextUrl.searchParams.get("id");
    const merk = req.nextUrl.searchParams.get("merk");
    const tipe = req.nextUrl.searchParams.get("tipe");
    const cc = req.nextUrl.searchParams.get("cc");
    const sort = req.nextUrl.searchParams.get("sort");

    console.log("Query params:", { id, merk, tipe, cc, sort });

    // 3) Siapkan query dasar dan parameter
    let query = `
      SELECT 
        id AS id,
        namaKendaraan AS name,
        transmisi AS transmission,
        cc,
        nopol,
        hargaPerHari AS price,
        fotoKendaraan AS image
      FROM kendaraan
      WHERE ketersediaan = 1
    `;
    const params: any[] = [];

    // 4) Bangun kondisi query berdasarkan parameter yang dikirim
    if (id) {
      query += " AND id = ?";
      params.push(id);

    } else {
      if (merk) {
        query += " AND namaKendaraan LIKE ?";
        params.push(`%${merk}%`);
      }

      if (tipe) {
        query += " AND LOWER(transmisi) LIKE ?";
        params.push(`%${tipe.toLowerCase()}%`);
      }

      if (cc) {
        query += " AND cc = ?";
        params.push(cc);
      }

      // 5) Sorting (jika diminta)
      if (sort === "Lowest Price") {
        query += " ORDER BY hargaPerHari ASC";
      } else if (sort === "Highest Price") {
        query += " ORDER BY hargaPerHari DESC";
      }
    }

    // 6) Eksekusi query dengan pool
    const [rows] = await pool.query(query, params);

    // 7) Return hasil dalam bentuk JSON
    return NextResponse.json(rows);
  } catch (error) {
    // 8) Tangani error
    console.error("Failed to fetch motor list:", error);
    return NextResponse.json(
      { error: "Failed to fetch motor list" },
      { status: 500 }
    );
  }
}
