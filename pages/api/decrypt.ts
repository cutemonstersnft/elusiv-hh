import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { encryptedMemo } = req.body;

    // Ensure the encryptedMemo is provided
    if (!encryptedMemo) {
      res.status(400).json({ error: "Encrypted memo is required" });
      return;
    }

    
    const prefixLength = '[XX] '.length;
    const actualEncryptedMemo = encryptedMemo.slice(prefixLength);

    // Decrypt
    const secretKey = process.env.SECRET_KEY as string;
    const bytes = CryptoJS.AES.decrypt(actualEncryptedMemo, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log(originalText)

    res.status(200).json({ decryptedMemo: originalText });
  } else {
    res.status(405).json({ error: "Only POST requests are accepted" });
  }
}
