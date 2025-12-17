import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VerifyOTPRequest {
  email: string;
  otp: string;
  username: string;
  password: string;
}

// In-memory OTP store (shared with send-otp-email in production, use Redis/DB)
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, otp, username, password }: VerifyOTPRequest = await req.json();

    if (!email || !otp || !username || !password) {
      return new Response(
        JSON.stringify({ error: "Email, OTP, username, and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // For demo purposes, accept any 6-digit OTP
    // In production, validate against stored OTP
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      return new Response(
        JSON.stringify({ error: "Invalid OTP format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Verifying OTP for ${email} with username ${username}`);

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Create user with admin client (bypasses email confirmation)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        username: username,
      }
    });

    if (authError) {
      // If user already exists, try to sign them in
      if (authError.message.includes('already been registered')) {
        return new Response(
          JSON.stringify({ error: "Email already registered. Please sign in instead." }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      throw authError;
    }

    console.log("User created successfully:", authData.user?.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Account created successfully",
        userId: authData.user?.id 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in verify-otp function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
