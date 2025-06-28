# Paystack Demo (Next.js)

A simple demo on how to accept payments with Paystack in a Next.js app, verify transactions server-side, and show real-time payment status to users with flash messages.

---

## Features

- Paystack Inline payment integration (test mode)
- Server-side transaction verification with Paystack API
- Flash messages for payment success, failure, or pending status
- Easy to adapt for production/live keys

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/YOUR-USERNAME/paystack-demo.git
cd paystack-demo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
```

- Get your keys from your [Paystack dashboard](https://dashboard.paystack.com/#/settings/developer).
- **Use test keys for local development!**

### 4. Start the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. Enter your email, name, and amount (minimum ₦100).
2. Click **"Pay with Paystack"**.
3. Use Paystack test card to complete payment:
    - Card number: `4084 0840 8408 4081`
    - Expiry: Any future date (e.g., 12/30)
    - CVV: `408`
    - PIN: `1234`
    - OTP: `123456`
4. You’ll see a success, failure, or pending flash message after verification.

---

## Deploying to Production

- Swap your test keys for live keys in `.env.local`.
- Update your Paystack dashboard settings for allowed IPs/webhooks if needed.

---

## License

MIT

---

## Credits

- [Paystack Documentation](https://paystack.com/docs/)
- Next.js
