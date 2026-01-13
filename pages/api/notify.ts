import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  // Demo: we slaan niks echt op. In productie:
  // - schrijf naar database
  // - of stuur naar Brevo/Mailchimp
  // - of stuur mail-notificatie naar team
  const body = req.body || {};

  if (!body.email || typeof body.email !== "string") {
    res.status(400).send("Missing email");
    return;
  }

  res.status(200).json({ ok: true });
}
