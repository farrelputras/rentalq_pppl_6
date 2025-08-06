import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

// GET /api/pencarian?id=...
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID pencarian tidak ditemukan" });
    }

    const [rows]: any = await pool.query("SELECT * FROM pencarian WHERE id = ?", [id]);

    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: "Data tidak ditemukan" });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("GET /api/pencarian error:", error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}

// POST /api/pencarian
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { idUser, waktuAmbil, waktuKembali } = body;

    if (!idUser || !waktuAmbil || !waktuKembali) {
      return NextResponse.json({ success: false, message: "Data tidak lengkap" });
    }

    const [result]: any = await pool.query(
      `INSERT INTO pencarian (idUser, waktuAmbil, waktuKembali)
       VALUES (?, ?, ?)`,
      [idUser, waktuAmbil, waktuKembali]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error("POST /api/pencarian error:", error);
    return NextResponse.json({ success: false, message: "Gagal menyimpan pencarian" });
  }
}
