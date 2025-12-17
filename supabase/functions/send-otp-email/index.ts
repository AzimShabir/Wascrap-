import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OTPRequest {
  email: string;
  type: 'customer' | 'buyer';
}

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, type }: OTPRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP
    otpStore.set(email.toLowerCase(), { otp, expiresAt });

    console.log(`Generated OTP for ${email}: ${otp}`);

    const portalName = type === 'buyer' ? 'Scrap Buyer Portal' : 'Customer Portal';
    
    const emailResponse = await resend.emails.send({
      from: "WaScrap <noreply@resend.dev>",
      to: [email],
      subject: `Your OTP for ${portalName} - ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, ${type === 'buyer' ? '#3b82f6, #2563eb' : '#10b981, #059669'}); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Email Verification</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Your one-time password (OTP) for ${portalName} is:
            </p>
            <div style="background: ${type === 'buyer' ? '#3b82f6' : '#10b981'}; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <h2 style="margin: 0; font-size: 36px; letter-spacing: 8px;">${otp}</h2>
            </div>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              This OTP is valid for <strong>10 minutes</strong>. Do not share this code with anyone.
            </p>
            <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
              If you didn't request this OTP, please ignore this email.
            </p>
          </div>
        </div>
      `,
    });

    console.log("OTP email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "OTP sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-otp-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
