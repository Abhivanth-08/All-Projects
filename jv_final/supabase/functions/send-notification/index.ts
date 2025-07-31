
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'job_application' | 'product_booking';
  data: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received notification request');
    const { type, data }: NotificationRequest = await req.json();
    console.log('Request type:', type);
    console.log('Request data:', JSON.stringify(data, null, 2));
    
    let emailContent = '';
    let subject = '';
    
    if (type === 'job_application') {
      subject = `New Job Application - ${data.position}`;
      emailContent = `
        <h2>New Job Application Received</h2>
        <p><strong>Position:</strong> ${data.position}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Education:</strong> ${data.education}</p>
        <p><strong>Experience:</strong> ${data.experience || 'Not specified'}</p>
        <p><strong>Additional Info:</strong> ${data.additional_info || 'None'}</p>
        <p><strong>Applied on:</strong> ${new Date().toLocaleString()}</p>
      `;
    } else if (type === 'product_booking') {
      subject = `New Product Booking - ${data.product_name}`;
      emailContent = `
        <h2>New Product Booking Received</h2>
        <p><strong>Product:</strong> ${data.product_name}</p>
        <p><strong>Quantity:</strong> ${data.quantity}</p>
        <p><strong>Deadline:</strong> ${data.deadline || 'Not specified'}</p>
        <p><strong>Customer Name:</strong> ${data.user_name}</p>
        <p><strong>Customer Email:</strong> ${data.user_email}</p>
        <p><strong>Customer Phone:</strong> ${data.user_phone}</p>
        <p><strong>Booked on:</strong> ${new Date().toLocaleString()}</p>
      `;
    }

    console.log('Email subject:', subject);
    console.log('Email content prepared');

    // Configure SMTP client (Gmail)
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 587,
        tls: true,
        auth: {
          username: "ndt701024@gmail.com",
          password: "wosm azbx rnnk kczd",
        },
      },
    });

    console.log('SMTP client configured');

    // Determine sender email from payload
    let senderEmail = '';
    let senderName = '';
    if (type === 'job_application') {
      senderEmail = data.email || 'no-reply@yourdomain.com';
      senderName = data.name || 'Applicant';
    } else if (type === 'product_booking') {
      senderEmail = data.user_email || 'no-reply@yourdomain.com';
      senderName = data.user_name || 'Customer';
    }

    console.log('Sender email:', senderEmail);
    console.log('Attempting to send email...');

    // Send email from user to company (Updated recipient email)
    let sendResult;
    try {
      sendResult = await client.send({
        from: "ndt701024@gmail.com",
        to: "23am004@kpriet.ac.in",
        subject: subject,
        content: emailContent,
        html: emailContent,
        headers: {
          "Reply-To": senderEmail
        }
      });
      console.log('Email send result:', sendResult);
    } catch (smtpError) {
      console.error('SMTP send error:', smtpError);
      await client.close();
      return new Response(
        JSON.stringify({ error: 'SMTP send error: ' + smtpError.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    await client.close();
    console.log('SMTP client closed');

    if (!sendResult) {
      console.error('No send result received');
      return new Response(
        JSON.stringify({ error: 'No response from email server' }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log('Email sent successfully via SMTP');
    
    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully', result: sendResult }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
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
