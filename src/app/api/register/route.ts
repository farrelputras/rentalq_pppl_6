import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { pool } from "@/lib/db"; // 0) Gunakan koneksi dari pool

// 0.1) Interface hasil SELECT untuk cek existing user
interface ExistingUserRow extends RowDataPacket {
  idUser: number;
  email: string;
}

// 1) Fungsi handler untuk registrasi user
export async function POST(req: NextRequest) {
  try {
    // 2) Ambil body dari request
    const { fullname, email, password, confirmPassword } =
      (await req.json()) as {
        fullname?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
      };

    // 3) Validasi input dasar
    if (!fullname || !email || !password || !confirmPassword) {
      return NextResponse.json(
        {
          message:
            "Semua field (nama, email, password, konfirmasi password) wajib diisi.",
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Password dan konfirmasi password tidak cocok." },
        { status: 400 }
      );
    }

    // 4) Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Format email tidak valid." },
        { status: 400 }
      );
    }

    // 5) Cek apakah email sudah digunakan
    const [rows] = await pool.query<ExistingUserRow[]>(
      `
      SELECT idUser, email
      FROM Users
      WHERE email = ?
      `,
      [email]
    );

    if (rows.length > 0) {
      return NextResponse.json(
        { message: "Email sudah terdaftar. Silakan gunakan email lain." },
        { status: 409 }
      );
    }

    // 6) Generate username dari email (sebelum @)
    const atIndex = email.indexOf("@");
    const username = atIndex > 0 ? email.slice(0, atIndex) : email;

    // 7) Simpan data user ke database
    const [result] = await pool.query<ResultSetHeader>(
      `
      INSERT INTO Users 
        (username, password, nama, noTelp, email, fotoUser, sudahVerifikasi)
      VALUES 
        (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        username, // username dari email
        password, // password plaintext (❗hash di produksi!)
        fullname,
        "",
        email,
        "images/user/default.png",
        0,
      ]
    );

    // 8) Kembalikan respon sukses tanpa password
    return NextResponse.json(
      {
        message: "Registrasi berhasil.",
        data: {
          idUser: result.insertId,
          username: email,
          nama: fullname,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // 9) Tangani error server
    let message = "Terjadi kesalahan server.";
    if (error instanceof Error) {
      message = error.message;
    }
    console.error("Register API error:", error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
