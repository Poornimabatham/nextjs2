'use client'

import { useState } from 'react'

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    alert(data.message)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Contact Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="border p-2 w-full" />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="border p-2 w-full" />
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Submit</button>
      </form>
    </main>
  )
}
