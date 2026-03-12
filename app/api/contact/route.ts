import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "contact@petertechy.com",
        pass: process.env.EMAIL_PASS || "your-app-password",
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER || "contact@petertechy.com",
      to: "contact@petertechy.com",
      subject: `New Lead: ${name} - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366F1;">New Lead from Peter Techy Automation</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Company:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${company || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Service:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Budget:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${budget || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${message}</td>
            </tr>
          </table>
        </div>
      `,
    };

    // Email to client
    const clientMailOptions = {
      from: process.env.EMAIL_USER || "contact@petertechy.com",
      to: email,
      subject: "Thank you for contacting Peter Techy Automation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366F1;">Thanks for contacting Peter Techy Automation!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for reaching out. I've received your inquiry about <strong>${service}</strong> and will review it shortly.</p>
          <p><strong>What happens next?</strong></p>
          <ul>
            <li>I'll review your requirements within 24 hours</li>
            <li>I'll reach out to schedule a free 30-minute strategy call</li>
            <li>We'll discuss how AI automation can transform your business</li>
          </ul>
          <p>If you have any urgent questions, feel free to reply to this email.</p>
          <p>Best regards,<br/>Peter Techy</p>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(clientMailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

