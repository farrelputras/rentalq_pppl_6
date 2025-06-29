import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { pool } from "@/lib/db";

interface ExistingUserRow extends RowDataPacket {
  idUser: number;
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, phone } = await req.json() as {
      username?: string;
      email?: string;
      password?: string;
      phone?: string;
    };

    // Validasi dasar
    if (!username || !email || !password || !phone) {
      return NextResponse.json(
        { message: "Semua field (username, email, password, phone) wajib diisi." },
        { status: 400 }
      );
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Format email tidak valid." },
        { status: 400 }
      );
    }

    // Cek apakah email sudah digunakan
    const [rows] = await pool.query<ExistingUserRow[]>(
      `SELECT idUser FROM Users WHERE email = ?`,
      [email]
    );

    if (rows.length > 0) {
      return NextResponse.json(
        { message: "Email sudah terdaftar. Silakan gunakan email lain." },
        { status: 409 }
      );
    }

    // Simpan user baru ke database
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO Users (username, password, nama, noTelp, email, fotoUser, sudahVerifikasi)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        username,
        password, 
        username, // Gunakan username sebagai nama default
        phone,
        email,
        "/default.png",
        0
      ]
    );

    return NextResponse.json(
      {
        message: "Registrasi berhasil.",
        data: {
          idUser: result.insertId,
          username,
          email,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan server.";
    console.error("Register API error:", error);
    return NextResponse.json({ message }, { status: 500 });
  }
}