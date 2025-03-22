import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class DbConnectionService {

  public createSupabaseClient(): SupabaseClient<any, "public", any> {
    const supabaseUrl = "https://thhtwppvxkfikpejcojk.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoaHR3cHB2eGtmaWtwZWpjb2prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDM2MjA3NCwiZXhwIjoyMDU1OTM4MDc0fQ.XQ3XEXWYiRnZx8V9LysGeSgs4zPywsUK_lvAim2RX90";

    return createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false
      }
    });
  }

}