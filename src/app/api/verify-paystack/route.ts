import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { reference } = await req.json();
  const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

  if (!reference || !PAYSTACK_SECRET_KEY) {
    return NextResponse.json({ error: "Missing reference or secret key" }, { status: 400 });
  }

  const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  });
  const verifyData = await verifyRes.json();

  // Log for debugging
  console.log("Paystack verify response:", verifyData);

  if (verifyData.status && verifyData.data) {
    const status = verifyData.data.status; // "success", "pending", "failed"
    return NextResponse.json({ status });
  } else {
    return NextResponse.json({ status: "failed", error: verifyData.message || "Verification error" }, { status: 400 });
  }
}