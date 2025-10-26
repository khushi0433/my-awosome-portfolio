import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { ContactEmailTemplate } from "@/templates/email-templates";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactData = z.infer<typeof contactSchema>;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  debug: true,
  logger: true,
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection error:", error);
  } else {
    console.log("SMTP connection successful!");
  }
});

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

    const contactHtml = render(ContactEmailTemplate({ data: formData }));
    const textVersion = `New Contact submission:

            Name: ${formData.name}
            Email: ${formData.email}
            Subject: ${formData.subject}
            Message:
            ${formData.message}
                `;

    await transporter.sendMail({
      from: "Contact freelancer khushbu -  <khushbubaloch01@gmail.com>",
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact: ${formData.subject}`,
      text: textVersion,
      html: await contactHtml,
    });

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