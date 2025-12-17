
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  booking: {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    scrap_types: Array<{ type: string; weight: number }>;
    pickup_date: string;
    pickup_time: string;
    special_instructions?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Booking notification function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { booking }: BookingNotificationRequest = await req.json();
    console.log("Processing booking:", booking.id);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "WASCRAP <onboarding@resend.dev>",
      to: [booking.email],
      subject: "🎉 Pickup Confirmed - WASCRAP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #16a34a; font-size: 28px; margin: 0;">
              WAS<span style="color: #059669;">CRAP</span>
            </h1>
            <p style="color: #6b7280; font-size: 16px;">Making waste management simple & profitable</p>
          </div>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <h2 style="color: #166534; margin: 0 0 10px 0;">✅ Pickup Confirmed!</h2>
            <p style="color: #166534; margin: 0;">Hello ${booking.full_name}, your scrap pickup has been successfully scheduled.</p>
          </div>
          
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin: 0 0 15px 0;">📋 Booking Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 30%;">Booking ID:</td>
                <td style="padding: 8px 0; color: #374151; font-weight: 600;">#${booking.id.substring(0, 8)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Pickup Date:</td>
                <td style="padding: 8px 0; color: #374151; font-weight: 600;">${new Date(booking.pickup_date).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Time Slot:</td>
                <td style="padding: 8px 0; color: #374151; font-weight: 600;">${booking.pickup_time}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Address:</td>
                <td style="padding: 8px 0; color: #374151;">${booking.address}, ${booking.city}, ${booking.state} - ${booking.pincode}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #fffbeb; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #d97706; margin: 0 0 15px 0;">📦 Scrap Details</h3>
            ${booking.scrap_types.map(item => `
              <p style="margin: 5px 0; color: #92400e;">• ${item.type} - ${item.weight}kg</p>
            `).join('')}
          </div>
          
          <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #1d4ed8; margin: 0 0 10px 0;">💡 What's Next?</h3>
            <ul style="color: #1e40af; margin: 0; padding-left: 20px;">
              <li>Our team will call you 30 minutes before arrival</li>
              <li>Please keep your scrap materials ready for pickup</li>
              <li>Payment will be made instantly after weighing</li>
              <li>You'll receive a digital receipt via SMS</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #6b7280; margin: 0;">Need help? Contact us:</p>
            <p style="color: #16a34a; font-weight: 600; margin: 5px 0;">📞 +91-XXXXXXXXXX</p>
            <p style="color: #16a34a; font-weight: 600; margin: 0;">📧 support@wascrap.com</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Thanks for choosing WASCRAP - Making waste profitable, planet sustainable! 🌱
            </p>
          </div>
        </div>
      `,
    });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "WASCRAP <onboarding@resend.dev>",
      to: ["admin@wascrap.com"], // Replace with actual admin email
      subject: `🔔 New Booking Alert - ${booking.full_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #dc2626;">🚨 New Pickup Request</h1>
          
          <div style="background: #fee2e2; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #991b1b; margin: 0;">Immediate Action Required</h2>
            <p style="color: #991b1b;">A new scrap pickup has been booked and needs confirmation.</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; background: white; border: 1px solid #e5e7eb;">
            <tr style="background: #f9fafb;">
              <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: 600;">Booking ID</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">#${booking.id.substring(0, 8)}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: 600;">Customer</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${booking.full_name}</td>
            </tr>
            <tr style="background: #f9fafb;">
              <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: 600;">Phone</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${booking.phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: 600;">Email</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${booking.email}</td>
            </tr>
            <tr style="background: #f9fafb;">
              <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: 600;">Address</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${booking.address}, ${booking.city}, ${booking.state} - ${booking.pincode}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: 600;">Date & Time</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${new Date(booking.pickup_date).toLocaleDateString()} - ${booking.pickup_time}</td>
            </tr>
            <tr style="background: #f9fafb;">
              <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: 600;">Scrap Types</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">
                ${booking.scrap_types.map(item => `${item.type} (${item.weight}kg)`).join(', ')}
              </td>
            </tr>
            ${booking.special_instructions ? `
            <tr>
              <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: 600;">Special Instructions</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${booking.special_instructions}</td>
            </tr>
            ` : ''}
          </table>
          
          <div style="margin-top: 20px; text-align: center;">
            <p style="color: #dc2626; font-weight: 600;">⏰ Please confirm this booking within 2 hours</p>
          </div>
        </div>
      `,
    });

    console.log("Customer email sent:", customerEmailResponse);
    console.log("Admin email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        customerEmail: customerEmailResponse,
        adminEmail: adminEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-notification function:", error);
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
