import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [amount, setAmount] = useState('')
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push({
      pathname: '/demo',
      query: { email, fullName, amount }
    })
  }

  return (
    <main style={{ maxWidth: 400, margin: 'auto', padding: 32 }}>
      <h1>Paystack Demo</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Full Name
          <input required value={fullName} onChange={e => setFullName(e.target.value)} />
        </label>
        <br />
        <label>
          Amount (NGN)
          <input required type="number" min={100} value={amount} onChange={e => setAmount(e.target.value)} />
        </label>
        <br />
        <button type="submit">Proceed to Paystack Demo</button>
      </form>
    </main>
  )
}