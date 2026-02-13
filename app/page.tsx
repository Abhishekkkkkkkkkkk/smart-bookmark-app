"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AuthButton from "@/components/AuthButton";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Home() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) =>
      setSession(session),
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div
        className="w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10
                   rounded-2xl shadow-2xl p-8 md:p-10 space-y-8 transition-all"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Smart Bookmark App
          </h1>

          <p className="text-slate-400 text-sm md:text-base">
            Save, organize & access your favorite links in real-time
          </p>
        </div>

        {/* Auth */}
        <div className="flex justify-center">
          <AuthButton session={session} />
        </div>

        {/* Content */}
        {session && (
          <div className="space-y-8">
            <BookmarkForm user={session.user} />
            <BookmarkList />
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 pt-4">
          Made By - Abhishek | Powered by Next.js • Supabase • Tailwind CSS
        </p>
      </div>
    </main>
  );
}
