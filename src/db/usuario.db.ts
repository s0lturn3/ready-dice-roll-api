import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class UsuarioDbModel {

  public createSupabaseClient(): SupabaseClient<any, "public", any> {
    const supabaseUrl = "https://thhtwppvxkfikpejcojk.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoaHR3cHB2eGtmaWtwZWpjb2prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNjIwNzQsImV4cCI6MjA1NTkzODA3NH0.odFRt3IovEGzIRf_jpPFdTqd_8su80E3HcJ0nD1gANs";

    return createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false
      }
    });
  }

}