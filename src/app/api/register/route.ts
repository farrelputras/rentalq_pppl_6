import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'
import { RowDataPacket, ResultSetHeader } from 'mysql2'

// Koneksi Database
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "rentalq",
};

// Interface untuk tipe baris hasil SELECT
interface ExistingUserRow extends RowDataPacket {
  idUser: number
  email: string
}

export async function POST(req: NextRequest) {
  try {
    // 1) Ambil body JSON
    const { fullname, email, password, confirmPassword } = (await req.json()) as {
      fullname?: string
      email?: string
      password?: string
      confirmPassword?: string
    }

    // 2) Validasi input
    if (!fullname || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: 'Semua field (nama, email, password, konfirmasi password) wajib diisi.' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: 'Password dan konfirmasi password tidak cocok.' },
        { status: 400 }
      )
    }

    // 3) Validasi format email sederhana (bisa diperluas sesuai kebutuhan)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Format email tidak valid.' },
        { status: 400 }
      )
    }

    // 4) Buat koneksi ke MySQL (port: string → number) 
    const connection = await mysql.createConnection(dbConfig);

    try {
      // 5) Cek apakah email sudah terdaftar
      const [rows] = await connection.execute<ExistingUserRow[]>(
        `SELECT idUser, email
         FROM Users
         WHERE email = ?`,
        [email]
      )
      if (rows.length > 0) {
        return NextResponse.json(
          { message: 'Email sudah terdaftar. Silakan gunakan email lain.' },
          { status: 409 }
        )
      }

      // 6) Generate username: bagian sebelum '@' pada email
      const atIndex = email.indexOf('@')
      const username = atIndex > 0 ? email.slice(0, atIndex) : email

      // 7) Lakukan INSERT ke tabel Users
      //    Kita set:
      //      - username = email
      //      - nama = fullname
      //      - noTelp = '' (placeholder)
      //      - email = email
      //      - fotoUser = 'images/user/default.png' (default)
      //      - sudahVerifikasi = 0 (belum terverifikasi)
      const [result] = await connection.execute<ResultSetHeader>(
        `
        INSERT INTO Users 
          (username, password, nama, noTelp, email, fotoUser, sudahVerifikasi)
        VALUES 
          (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          username,           // username hasil trim sebelum '@'
          password,           // password (plaintext—untuk produksi sebaiknya hash+salt)
          fullname,           // nama
          '',                 // noTelp (kosong)
          email,              // email
          'images/user/default.png', // fotoUser default
          0,                  // sudahVerifikasi (false)
        ]
      )

      // 8) Jika berhasil, kembalikan 201 Created dengan data minimal (tanpa password)
      return NextResponse.json(
        {
          message: 'Registrasi berhasil.',
          data: {
            idUser: result.insertId,
            username: email,
            nama: fullname,
          },
        },
        { status: 201 }
      )
    } finally {
      await connection.end()
    }
  } catch (error) {
    // 9) Tangani error (bisa ENV, MySQL, atau yang lain)
    let message = 'Terjadi kesalahan server.'
    if (error instanceof Error) {
      message = error.message
    }
    console.error('Register API error:', error)
    return NextResponse.json({ message }, { status: 500 })
  }
}