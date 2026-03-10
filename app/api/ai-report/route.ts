import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";

export async function POST(req: Request) {

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const { problem, email } = await req.json();

  const ai = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are an enterprise AI consultant."
      },
      {
        role: "user",
        content: `Create an AI automation strategy report for this problem: ${problem}`
      }
    ]
  });

  const report = ai.choices?.[0]?.message?.content || "Report generation failed.";

  const doc = new PDFDocument();
  const chunks: Uint8Array[] = [];

  doc.on("data", (chunk) => chunks.push(chunk));

  doc.fontSize(20).text("Nexxovate AI Automation Report");
  doc.moveDown();
  doc.fontSize(12).text(report);

  doc.end();

  const pdfBuffer = await new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  await transporter.sendMail({
    from: `"Nexxovate AI" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your AI Automation Report",
    text: "Your AI report is attached.",
    attachments: [
      {
        filename: "nexxovate-ai-report.pdf",
        content: pdfBuffer
      }
    ]
  });

  return NextResponse.json({ success: true });

}