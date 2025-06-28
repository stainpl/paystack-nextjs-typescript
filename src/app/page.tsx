'use client'

import { useState } from "react";

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

type FlashType = 'success' | 'error' | 'pending';

export default function PaystackDemo() {
  const [form, setForm] = useState({ email: '', fullName: '', amount: '' });
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState<{type: FlashType, message: string} | null>(null);

  function showFlash(type: FlashType, message: string) {
    setFlash({ type, message });
    setTimeout(() => setFlash(null), 4000);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function payWithPaystack(e: React.FormEvent) {
    e.preventDefault();
    setFlash(null);

    // Dynamically import PaystackPop ONLY in the browser
    const { default: PaystackPop } = await import('@paystack/inline-js');
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: PAYSTACK_KEY,
      email: form.email,
      amount: Number(form.amount) * 100,
      currency: "NGN",
      metadata: {
        custom_fields: [
          { display_name: "Full Name", variable_name: "full_name", value: form.fullName },
        ],
      },
      onSuccess: async (response: any) => {
        setLoading(true);
        const res = await fetch('/api/verify-paystack', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference: response.reference, ...form }),
        });
        setLoading(false);
        const result = await res.json();
        if (res.ok && result.status === "success") {
          showFlash('success', "Payment confirmed! Confirmation email sent.");
        } else if (result.status === "pending") {
          showFlash('pending', "Payment is pending. Please check back later.");
        } else {
          showFlash('error', "Payment failed or was declined.");
        }
      },
      onCancel: () => {
        showFlash('error', "Payment was not completed.");
      }
    });
  }

  return (
    <main>
      <h1>Paystack Realtime Test</h1>
      <form onSubmit={payWithPaystack} autoComplete="off">
        <label>Email
          <input name="email" type="email" required value={form.email} onChange={handleChange} />
        </label>
        <label>Full Name
          <input name="fullName" required value={form.fullName} onChange={handleChange} />
        </label>
        <label>Amount (NGN)
          <input name="amount" type="number" min={100} required value={form.amount} onChange={handleChange} />
        </label>
        <button type="submit" disabled={loading}>Pay with Paystack</button>
      </form>
      {flash && (
        <div style={{
          margin: "24px 0",
          padding: "16px",
          borderRadius: "8px",
          color: "#fff",
          background: flash.type === 'success' ? '#16a34a'
                    : flash.type === 'pending' ? '#eab308'
                    : '#dc2626'
        }}>
          {flash.message}
        </div>
      )}
    </main>
  );
}