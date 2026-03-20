import { createBrowserClient } from "@supabase/ssr";


export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// There is two client craetion management server and client side.
// This createClient store data in browsr. when user do login, logout, signup at this time it store seesion and cookie in browser.
// SO withiut it login , sign up will not work.
// we send with projects keys and all so that it will know in which user should be created.
