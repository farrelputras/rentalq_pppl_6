import { NextRequest, NextResponse } from 'next/server'
import formidable, { File, Files, Fields } from 'formidable'
import path from 'path'
import { pool } from '@/lib/db.js'

export const config = {
  api: { bodyParser: false }
}

async function handleMultipart(req: NextRequest) {
  const form = formidable({
    multiples: false,
    uploadDir: path.join(process.cwd(), '/public/uploads'),
    keepExtensions: true
  })

  const [fields, files]: [Fields, Files] = await new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => err ? reject(err) : resolve([fields, files]))
  })

  console.log('PROFILE MULTIPART FIELDS:', fields)
  console.log('PROFILE MULTIPART FILES:', files)

  const email = Array.isArray(fields.email) ? fields.email[0] : fields.email
  if (!email) throw new Error('Email is required')

  // avatar upload
  const avatarFile = files.avatar && Array.isArray(files.avatar) ? files.avatar[0] : files.avatar as File
  if (avatarFile && avatarFile.newFilename) {
    const photoPath = `/uploads/${avatarFile.newFilename}`
    console.log('Updating fotoUser to:', photoPath)
    await pool.execute('UPDATE users SET fotoUser = ? WHERE email = ?', [photoPath, email])
  }

  // username & phone if present
  const newUsername = Array.isArray(fields.newUsername) ? fields.newUsername[0] : fields.newUsername
  if (typeof newUsername === 'string' && newUsername.trim()) {
    console.log('Updating username to:', newUsername.trim())
    await pool.execute('UPDATE users SET username = ? WHERE email = ?', [newUsername.trim(), email])
  }

  const newPhone = Array.isArray(fields.newPhone) ? fields.newPhone[0] : fields.newPhone
  if (typeof newPhone === 'string' && newPhone.trim()) {
    console.log('Updating noTelp to:', newPhone.trim())
    await pool.execute('UPDATE users SET noTelp = ? WHERE email = ?', [newPhone.trim(), email])
  }

  return { message: 'Profile updated successfully' }
}

async function handleJson(req: NextRequest) {
  const body = await req.json()
  console.log('PROFILE JSON BODY:', body)
  const { email, newUsername, newPhone } = body
  if (!email) return NextResponse.json({ message: 'Email is required' }, { status: 400 })

  if (newUsername && typeof newUsername === 'string') {
    console.log('Updating username (JSON) to:', newUsername.trim())
    await pool.execute('UPDATE users SET username = ? WHERE email = ?', [newUsername.trim(), email])
  }
  if (newPhone && typeof newPhone === 'string') {
    console.log('Updating noTelp (JSON) to:', newPhone.trim())
    await pool.execute('UPDATE users SET noTelp = ? WHERE email = ?', [newPhone.trim(), email])
  }
  return { message: 'Profile updated successfully' }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || ''
    console.log('CONTENT-TYPE:', contentType)
    const result = contentType.includes('multipart/form-data')
      ? await handleMultipart(req)
      : await handleJson(req)

    return NextResponse.json(result)
  } catch (err: any) {
    console.error('Profile update error:', err)
    return NextResponse.json({ message: err.message || 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const email = url.searchParams.get('email')
    console.log('PROFILE GET email:', email)
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

    const [rows]: any = await pool.query(
      'SELECT username, fotoUser FROM users WHERE email = ? LIMIT 1',
      [email]
    )
    if (!rows.length) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    return NextResponse.json({ username: rows[0].username, photo: rows[0].fotoUser })
  } catch (err) {
    console.error('Profile fetch error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
