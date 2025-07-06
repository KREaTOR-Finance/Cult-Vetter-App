import { useState } from 'react'

export default function SubmitProject() {
  const [form, setForm] = useState({
    name: '',
    symbol: '',
    liquidity: '',
    volume24h: '',
    price: '',
    website: '',
    telegram: '',
    discord: '',
    email: '',
    swap: '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    alert("Thanks for the submission, it's being reviewed.")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="bg-card border border-border rounded-lg p-8 w-full max-w-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Submit Your Project</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="Project Name" className="flex-1 px-3 py-2 border rounded-md" />
            <input value={form.symbol} onChange={e => setForm(f => ({ ...f, symbol: e.target.value }))} required placeholder="Symbol" className="w-32 px-3 py-2 border rounded-md" />
          </div>
          <div className="flex gap-4">
            <input type="number" value={form.liquidity} onChange={e => setForm(f => ({ ...f, liquidity: e.target.value }))} required placeholder="Liquidity" className="flex-1 px-3 py-2 border rounded-md" />
            <input type="number" value={form.volume24h} onChange={e => setForm(f => ({ ...f, volume24h: e.target.value }))} required placeholder="24h Volume" className="flex-1 px-3 py-2 border rounded-md" />
          </div>
          <div className="flex gap-4">
            <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required placeholder="Price" className="flex-1 px-3 py-2 border rounded-md" />
            <input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="Website URL" className="flex-1 px-3 py-2 border rounded-md" />
          </div>
          <div className="flex gap-4">
            <input value={form.telegram} onChange={e => setForm(f => ({ ...f, telegram: e.target.value }))} placeholder="Telegram" className="flex-1 px-3 py-2 border rounded-md" />
            <input value={form.discord} onChange={e => setForm(f => ({ ...f, discord: e.target.value }))} placeholder="Discord" className="flex-1 px-3 py-2 border rounded-md" />
          </div>
          <div className="flex gap-4">
            <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Email" className="flex-1 px-3 py-2 border rounded-md" />
            <input value={form.swap} onChange={e => setForm(f => ({ ...f, swap: e.target.value }))} placeholder="Swap Link" className="flex-1 px-3 py-2 border rounded-md" />
          </div>
          <div className="flex justify-center mt-6">
            <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Submit to Admin</button>
          </div>
        </form>
      </div>
    </div>
  )
} 