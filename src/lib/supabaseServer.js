// lib/supabaseServer.js (or wherever)
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServer() {
  const cookieStore = await cookies();  // This is async in Next 15+

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
              console.log("it ends")
            });
          } catch (e) {
            // Safe to ignore in Server Components (middleware handles refresh)
            console.warn("setAll called from Server Component (ignored):", e.message);
          }
        },
      },
    }
  );
}


// This is used to craete on server side. because when we want to protect routs or anything we have to manage it brom server side. serevr will do varification if user direct try to accsess any protected page.
//  But server has no cookie it is stored in browser so when have to send it to server.
//  we know that when user req, cookie is send with req to server so server give res. based on that. That is this behavious.
// Cookies come with request -> Server verifies -> Access allowed or denied. this is called stateless authentication.
// SSR or Server Side Rendering is also known as dynamic rendering. In SSR the page is generated each time the server gets a request.

// Browser
// ↓
// Login
// ↓
// Supabase generates JWT
// ↓
// JWT stored in cookies
// ↓
// User visits /todo
// ↓
// Next.js server receives request
// ↓
// Server reads cookies
// ↓
// Supabase verifies JWT
// ↓
// If valid → show page
// If invalid → redirect
