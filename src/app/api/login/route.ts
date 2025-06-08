import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db.js";

// Extend RowDataPacket untuk mengetik baris hasil query
interface UserRow extends RowDataPacket {
  idUser: number;
  username: string;
  password: string;
  nama: string;
  sudahVerifikasi: boolean;
}

// 1) Fungsi handler untuk request POST (login)
export async function POST(req: NextRequest) {
  try {
    // 2) Ambil body JSON dari request (email & password)
    const { email, password } = (await req.json()) as {
      email?: string;
      password?: string;
    };

    // 3) Validasi input: email dan password tidak boleh kosong
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    // 4) Jalankan query mencari user berdasarkan email
    const [rows] = await pool.query<UserRow[]>(
      `
      SELECT id, username, password, nama, sudahVerifikasi
      FROM users
      WHERE email = ?
      `,
      [email]
    );

    // 5) Jika user tidak ditemukan
    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Email atau password salah." },
        { status: 401 }
      );
    }

    const user = rows[0];

    // 6) Bandingkan password (note: di produksi gunakan hash)
    if (user.password !== password) {
      return NextResponse.json(
        { message: "Email atau password salah." },
        { status: 401 }
      );
    }

    // 7) Cek apakah akun sudah terverifikasi
    if (!user.sudahVerifikasi) {
      return NextResponse.json(
        {
          message:
            "Akun belum terverifikasi. Silakan cek email verifikasi Anda.",
        },
        { status: 403 }
      );
    }

    // 8) Jika login berhasil, kembalikan data user (tanpa password)
    return NextResponse.json(
      {
        message: "Login berhasil.",
        data: {
          idUser: user.idUser,
          username: user.username,
          nama: user.nama,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // 9) Tangani error dan log untuk debug
    let message = "Terjadi kesalahan server.";
    if (error instanceof Error) {
      message = error.message;
    }
    console.error("Login API error:", error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
