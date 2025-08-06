import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

// ✅ POST: verifikasi oleh admin
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { idPesanan, valid } = req.body;

    if (!idPesanan || typeof valid !== "boolean") {
      return res.status(400).json({ success: false, message: "Data tidak lengkap" });
    }

    const status = valid ? "Dikonfirmasi" : "Dibatalkan";
    await pool.query(`UPDATE pesanan SET statusPesanan = ? WHERE id = ?`, [status, idPesanan]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to update status:", error);
    return res.status(500).json({ success: false, message: "Gagal mengupdate status pesanan" });
  }
}
