import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'
import { RowDataPacket } from 'mysql2'

// Koneksi Database
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "rentalq",
};

// Extend RowDataPacket untuk mengetik baris hasil query
interface UserRow extends RowDataPacket {
  idUser: number
  username: string
  password: string
  nama: string
  sudahVerifikasi: boolean
}

export async function POST(req: NextRequest) {
  try {
    // DEBUG: Tampilkan nilai environment variables
    console.log('--- DEBUG ENV ---')
    console.log('DB_HOST       =', process.env.DB_HOST)
    console.log('DB_PORT       =', process.env.DB_PORT)
    console.log('DB_USER       =', process.env.DB_USER)
    console.log('DB_PASSWORD   =', process.env.DB_PASSWORD ? '<<terisi>>' : '<<KOSONG>>')
    console.log('DB_NAME       =', process.env.DB_NAME)
    console.log('-----------------')

    // 1) Ambil body JSON (email & password)
    const { email, password } = (await req.json()) as {
      email?: string
      password?: string
    }

    // 2) Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email dan password wajib diisi.' },
        { status: 400 }
      )
    }

    // 3) Buat koneksi ke MySQL (port: string → number)
    const connection = await mysql.createConnection(dbConfig);
    
    try {
      // 4) Jalankan query mencari user berdasarkan email
      const [rows] = await connection.execute<UserRow[]>(
        `
        SELECT idUser, username, password, nama, sudahVerifikasi
        FROM users
        WHERE email = ?
        `,
        [email]
      )
      // rows sekarang bertipe UserRow[]

      // 5) Jika user tidak ditemukan
      if (rows.length === 0) {
        return NextResponse.json(
          { message: 'Email atau password salah.' },
          { status: 401 }
        )
      }

      const user = rows[0]

      // 6) Bandingkan password (contoh men‐compare plaintext; di produksi sebaiknya hash + salt)
      if (user.password !== password) {
        return NextResponse.json(
          { message: 'Email atau password salah.' },
          { status: 401 }
        )
      }

      // 7) Cek apakah akun sudah terverifikasi
      if (!user.sudahVerifikasi) {
        return NextResponse.json(
          { message: 'Akun belum terverifikasi. Silakan cek email verifikasi Anda.' },
          { status: 403 }
        )
      }

      // 8) Jika lolos semua, kembalikan data user (tanpa password)
      return NextResponse.json(
        {
          message: 'Login berhasil.',
          data: {
            idUser: user.idUser,
            username: user.username,
            nama: user.nama,
          },
        },
        { status: 200 }
      )
    } finally {
      // Tutup koneksi setelah query
      await connection.end()
    }
  } catch (error) {
    // Tangani error sebagai unknown, lalu periksa instanceof Error
    let message = 'Terjadi kesalahan server.'
    if (error instanceof Error) {
      message = error.message
    }
    console.error('Login API error:', error)
    return NextResponse.json({ message }, { status: 500 })
  }
}