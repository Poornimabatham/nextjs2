'use client'

import { useEffect, useState } from 'react'

interface Task {
  id: string
  title: string
  description?: string
  createdAt: string
}

export default function HomePage() {
  const [formData, setFormData] = useState({ title: '', description: '' })
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks')
    const data = await res.json()
    setTasks(data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) return

    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      setFormData({ title: '', description: '' })
      fetchTasks()
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2 md:flex-row">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className="border p-2 flex-1"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="border p-2 flex-1"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Add Task
        </button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-2">
            ✅ <strong>{task.title}</strong> — {task.description}{' '}
            <span className="text-sm text-gray-400">
              ({new Date(task.createdAt).toLocaleString()})
            </span>
          </li>
        ))}
      </ul>
    </main>
  )
}
