
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_email, user_name } = await req.json();
    
    // Send email notification
    const emailData = {
      to: "kubernitifinancialservices@gmail.com",
      subject: "New Kuberiti Account Created",
      html: `
        <h1>New User Registration</h1>
        <p>A new user has registered on Kuberiti:</p>
        <ul>
          <li><strong>Name:</strong> ${user_name}</li>
          <li><strong>Email:</strong> ${user_email}</li>
        </ul>
        <p>Time: ${new Date().toISOString()}</p>
      `,
    };
    
    // Using the Supabase built-in email sender
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("SENDGRID_API_KEY")}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: emailData.to }],
            subject: emailData.subject,
          },
        ],
        from: { email: "noreply@kuberiti.com", name: "Kuberiti" },
        content: [{ type: "text/html", value: emailData.html }],
      }),
    });
    
    console.log("Email notification response:", response.status);
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in notify-new-user function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
