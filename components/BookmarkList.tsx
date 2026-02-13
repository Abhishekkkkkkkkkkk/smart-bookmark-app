"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<any[]>([])

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false })

    setBookmarks(data || [])
  }

  useEffect(() => {
    fetchBookmarks()

    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        fetchBookmarks
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const deleteBookmark = async (id: string) => {
    // Optimistic UI update
    setBookmarks((prev) => prev.filter((b) => b.id !== id))

    await supabase.from("bookmarks").delete().eq("id", id)
  }

  if (bookmarks.length === 0) {
    return (
      <p className="text-center text-slate-400 mt-6">
        No bookmarks yet
      </p>
    )
  }

  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {bookmarks.map((b) => {
        const domain = new URL(b.url).hostname

        return (
          <div
            key={b.id}
            className="relative bg-black rounded-xl p-6 flex flex-col items-center
                       shadow-lg hover:scale-105 transition-transform duration-300"
          >
            {/* Remove icon */}
            <button
              onClick={() => deleteBookmark(b.id)}
              className="absolute top-2 right-2 text-white hover:text-red-500 transition"
            >
              ✕
            </button>

            {/* Website logo */}
            <img
              src={`https://www.google.com/s2/favicons?sz=128&domain=${domain}`}
              alt={b.title}
              className="w-16 h-16 rounded-full bg-white p-2"
            />

            {/* Bookmark name */}
            <a
              href={b.url}
              target="_blank"
              className="mt-4 px-4 py-1 rounded-full bg-red-900 text-white
                         text-sm hover:bg-red-800 transition"
            >
              {b.title}
            </a>
          </div>
        )
      })}
    </div>
  )
}
