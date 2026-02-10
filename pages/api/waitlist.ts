import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  try {
    const { email, listingId, profile } = req.body || {};

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).send("Invalid email");
    }
    if (!listingId || typeof listingId !== "string") {
      return res.status(400).send("Invalid listingId");
    }

    // DEMO: log only. In productie: opslaan in DB/CRM + trigger e-mail.
    console.log("WAITLIST_SIGNUP", {
      email,
      listingId,
      profile,
      at: new Date().toISOString(),
    });

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(500).send(e?.message || "Server error");
  }
}
