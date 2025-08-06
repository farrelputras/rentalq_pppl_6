import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const { idPesanan, valid } = req.body;

    const [[row]]: any = await pool.query(`SELECT idBayar FROM pesanan WHERE id = ?`, [idPesanan]);
    const idBayar = row?.idBayar;

    if (!idBayar) {
      return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
    }

    // ✅ Update status bayar & status pesanan
    await pool.query(`UPDATE pembayaran SET statusBayar = ? WHERE id = ?`, [valid, idBayar]);

    const statusPesanan = valid ? "Dikonfirmasi" : "Dibatalkan";
    await pool.query(`UPDATE pesanan SET statusPesanan = ? WHERE id = ?`, [statusPesanan, idPesanan]);

    return res.json({ success: true });
  } catch (err) {
    console.error("Validasi gagal:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
