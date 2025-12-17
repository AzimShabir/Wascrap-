
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  to: string;
  type: 'order_completed' | 'order_cancelled';
  bookingId: string;
  reason?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, type, bookingId, reason }: NotificationRequest = await req.json();

    let subject = "";
    let htmlContent = "";

    if (type === 'order_completed') {
      subject = "🎉 Your Scrap Pickup Order Has Been Completed!";
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Order Completed Successfully! ✅</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1f2937; margin-top: 0;">Great News!</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Your scrap pickup order (ID: <strong>${bookingId}</strong>) has been successfully completed by our team.
            </p>
            <div style="background: #10b981; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0;">✅ What happens next?</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Payment processing will be completed within 24 hours</li>
                <li>You'll receive a detailed receipt via email</li>
                <li>Thank you for contributing to a cleaner environment!</li>
              </ul>
            </div>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Thank you for choosing our scrap collection service. Your contribution makes a real difference in creating a more sustainable future.
            </p>
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 14px;">
                Questions? Contact us at support@wascrap.com
              </p>
            </div>
          </div>
        </div>
      `;
    } else if (type === 'order_cancelled') {
      subject = "❌ Your Scrap Pickup Order Has Been Cancelled";
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Order Cancelled</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1f2937; margin-top: 0;">We're Sorry</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Unfortunately, your scrap pickup order (ID: <strong>${bookingId}</strong>) has been cancelled.
            </p>
            <div style="background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0;">📋 Cancellation Reason:</h3>
              <p style="margin: 0; font-weight: 500;">${reason || 'No specific reason provided'}</p>
            </div>
            <div style="background: #10b981; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0;">🔄 Next Steps:</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>You can place a new order anytime through our platform</li>
                <li>No charges have been made to your account</li>
                <li>Contact us if you have any questions or concerns</li>
              </ul>
            </div>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              We apologize for any inconvenience caused. We're committed to providing the best service possible and look forward to serving you in the future.
            </p>
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 14px;">
                Questions? Contact us at support@wascrap.com or call us at +91-XXXXXXXXXX
              </p>
            </div>
          </div>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "WaScrap <noreply@wascrap.com>",
      to: [to],
      subject: subject,
      html: htmlContent,
    });

    console.log("Notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
