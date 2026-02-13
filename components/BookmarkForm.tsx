"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function BookmarkForm({ user }: any) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!title || !url) return

    await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: user.id,
    })

    setTitle("")
    setUrl("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 space-y-4"
    >
      <input
        type="text"
        placeholder="Bookmark title"
        className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="url"
        placeholder="https://example.com"
        className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        className="w-full py-2 rounded-lg bg-green-500 hover:bg-green-600
                   active:scale-95 transition-all font-medium"
      >
        Add Bookmark
      </button>
    </form>
  )
}