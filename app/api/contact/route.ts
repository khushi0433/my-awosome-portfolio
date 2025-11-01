import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { render } from "@react-email/render";
import { Resend } from "resend";
import { ContactEmailTemplate } from "@/templates/email-templates";
import dotenv from "dotenv";
dotenv.config();

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactData = z.infer<typeof contactSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const formData = validation.data;

    const contactHtml = await render(ContactEmailTemplate({ data: formData }));
    const textVersion = `New Contact submission:

            Name: ${formData.name}
            Email: ${formData.email}
            Subject: ${formData.subject}
            Message:
            ${formData.message}
                `;

    const { error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: `New Contact: ${formData.subject}`,
      text: textVersion,
      html: contactHtml,
    });

    if (error) {
      throw new Error(`Resend error: ${error.message}`);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}