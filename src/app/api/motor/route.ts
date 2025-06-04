import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Ganti sesuai dengan konfigurasi database kamu
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "rentalq",
};

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const merk = req.nextUrl.searchParams.get("merk");
    const tipe = req.nextUrl.searchParams.get("tipe");
    const cc = req.nextUrl.searchParams.get("cc");
    const sort = req.nextUrl.searchParams.get("sort");

    console.log("Query params:", { id, merk, tipe, cc, sort });

    const connection = await mysql.createConnection(dbConfig);

    // Bangun query dasar
    let query = `
      SELECT 
        idKendaraan AS id,
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

    if (id) {
      query += " AND idKendaraan = ?";
      params.push(id);
    } else {
      if (merk) {
        query += " AND namaKendaraan LIKE ?";
        params.push(`%${merk}%`);
      }

      if (tipe) {
        query += " AND transmisi LIKE ?";
        params.push(`%${tipe}%`);
      }

      if (cc) {
        query += " AND cc = ?";
        params.push(cc);
      }

      if (sort === "Lowest Price") {
        query += " ORDER BY hargaPerHari ASC";
      } else if (sort === "Highest Price") {
        query += " ORDER BY hargaPerHari DESC";
      }
    }

    const [rows] = await connection.execute(query, params);
    await connection.end();

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Failed to fetch motor list:", error);
    return NextResponse.json(
      { error: "Failed to fetch motor list" },
      { status: 500 }
    );
  }
}
