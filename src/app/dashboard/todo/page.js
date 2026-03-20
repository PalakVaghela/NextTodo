// app/todo/page.js (or wherever)
import TodoApp from "../../components/TodoApp";
import { createSupabaseServer } from "@/lib/supabaseServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTodos } from "../../actions/todo";


export default async function Todo() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
    if (!user){
      redirect('/login');
    }

  // Optional: log for debug (remove later)
  const todos = await getTodos();

  // No need for if (!user) redirect — middleware already handled it!
  // If you reach here → user exists

  return <TodoApp user={user} initialTodos={todos}/>; // pass user if TodoApp needs it
}


// Here we have createSupabaseServer() method which calls createSupabaseServer.js method, so first of all method will clearAllModuleContexts. it has 
// import { cookies } from "next/headers" and so, cookies() method, which will take cookie from http req headers. we have 2 token access token(short peiod) and refresh token(long term)
// when supabse automatoically refresh session at that time it check for access token if it is expired then it use refresh token and set access token. to set that access token setAll()
// method is clled not everytime. and this will happpend during getUser() method.
// Cookie is set on isBrowser, so if session refresh on server side and cookie is expired then it set cookie and send it with http res headers. we know that http header has cookies.

// User logs in
//    ↓
// Supabase returns JWT
//    ↓
// Browser stores cookies
//    ↓
// User visits /todo
//    ↓
// Browser sends cookies
//    ↓
// Next.js server reads cookies()
//    ↓
// createServerClient attaches JWT
//    ↓
// supabase.auth.getUser()
//    ↓
// Supabase verifies token
//    ↓
// If expired → refresh + setAll()
//    ↓
// Returns user
//    ↓
// Page renders
