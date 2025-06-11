import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db.js";

interface UserRow extends RowDataPacket {
  idUser: number;
  username: string;
  password: string;
  nama: string;
  email: string;
  sudahVerifikasi: boolean;
}

interface AdminRow extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  nama: string;
  email: string;
  noTelp: string;
  sudahVerifikasi: number;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = (await req.json()) as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    // 🌐 1. Coba cari di tabel users (login via email)
    const [userRows] = await pool.query<UserRow[]>(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (userRows.length > 0) {
      const user = userRows[0];
      if (user.password !== password) {
        return NextResponse.json(
          { message: "Email atau password salah." },
          { status: 401 }
        );
      }

      if (!user.sudahVerifikasi) {
        return NextResponse.json(
          {
            message: "Akun belum terverifikasi. Silakan cek email verifikasi Anda.",
          },
          { status: 403 }
        );
      }

      return NextResponse.json(
        {
          message: "Login berhasil sebagai user.",
          role: "user",
          data: {
            idUser: user.idUser,
            username: user.username,
            nama: user.nama,
            email: user.email,
          },
        },
        { status: 200 }
      );
    }

    // 🛡️ 2. Jika tidak ada user, coba cari di tabel admin (login via email juga)
    const [adminRows] = await pool.query<AdminRow[]>(
      `SELECT * FROM admin WHERE email = ?`,
      [email]
    );

    if (adminRows.length > 0) {
      const admin = adminRows[0];
      if (admin.password !== password) {
        return NextResponse.json(
          { message: "Email atau password salah." },
          { status: 401 }
        );
      }

      if (!admin.sudahVerifikasi) {
        return NextResponse.json(
          {
            message: "Akun admin belum terverifikasi.",
          },
          { status: 403 }
        );
      }

      return NextResponse.json(
        {
          message: "Login berhasil sebagai admin.",
          role: "admin",
          data: {
            idAdmin: admin.id,
            username: admin.username,
            nama: admin.nama,
            email: admin.email,
            noTelp: admin.noTelp,
          },
        },
        { status: 200 }
      );
    }

    // ❌ Tidak ditemukan
    return NextResponse.json(
      { message: "Email atau password salah." },
      { status: 404 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
