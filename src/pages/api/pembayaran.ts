import formidable from "formidable";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

// ✅ Disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// ✅ POST: upload bukti & simpan ke database
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "/public/uploads/bukti");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    multiples: false,
  });

  try {
    const { fields, files } = await new Promise<any>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const idPesanan = fields.id;
    const file = Array.isArray(files.bukti) ? files.bukti[0] : files.bukti;

    if (!idPesanan || !file?.filepath) {
      return res.status(400).json({ success: false, message: "ID atau file tidak valid" });
    }

    const filePath = `uploads/bukti/${path.basename(file.filepath)}`;
    const [[row]]: any = await pool.query(`SELECT idBayar FROM pesanan WHERE id = ?`, [idPesanan]);
    const idBayar = row?.idBayar;

    if (!idBayar) {
      return res.status(404).json({ success: false, message: "Pesanan tidak ditemukan" });
    }

    await pool.query(`UPDATE pembayaran SET buktiPembayaran = ? WHERE id = ?`, [filePath, idBayar]);

    return res.status(200).json({ success: true, path: filePath });
  } catch (err) {
    console.error("Upload failed:", err);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan saat upload." });
  }
}
