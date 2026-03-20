"use server";

import { createSupabaseServer } from '@/lib/supabaseServer';

export async function getCurrentUser() {
    const supabase = await createSupabaseServer();
    const {data : {user} , error} = await supabase.auth.getUser()

    if (!user || error){
        throw new Error("Authentication Require")
    }

    return user;
}
