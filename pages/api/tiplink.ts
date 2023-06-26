// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { TipLink } from "@tiplink/api";
import CryptoJS from "crypto-js";

type Data = {
  tiplinkPublicKey: string;
  tiplinkUrl: string;
  decryptedTiplink: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tiplink = await TipLink.create();
  const tiplinkPublicKey = tiplink.keypair.publicKey.toBase58();

  const tiplinkUrl = tiplink.url.toString();
  console.log("Tiplink URL", tiplinkUrl);

  const secretKey = process.env.SECRET_KEY as string;

  // Encrypt
  const ciphertext = CryptoJS.AES.encrypt(tiplinkUrl, secretKey).toString();
  console.log("ciphertext", ciphertext);

  res
    .status(200)
    .json({
      tiplinkPublicKey: tiplinkPublicKey,
      tiplinkUrl: ciphertext,
      decryptedTiplink: tiplinkUrl,
    });
}
