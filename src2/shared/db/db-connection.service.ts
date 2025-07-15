import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class DbConnectionService {

  public createSupabaseClient(): SupabaseClient<any, "public", any> {
    const supabaseUrl = process.env.SUPABASEURL || "https://thhtwppvxkfikpejcojk.supabase.co";
    const supabaseKey = process.env.SUPABASEKEY;

    return createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false
      }
    });
  }

}