"use client";

import { supabase } from "@/lib/supabaseClient";

export default function AuthButton({ session }: any) {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return session ? (
    <button
      onClick={handleLogout}
      className="px-6 py-2 rounded-full bg-red-500 hover:bg-red-600 active:scale-95 transition-all shadow-md"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={handleLogin}
      className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600
                 hover:from-blue-600 hover:to-indigo-700
                 active:scale-95 transition-all shadow-lg font-medium"
    >
      Login with Google
    </button>
  );
}
