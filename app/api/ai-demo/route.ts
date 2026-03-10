import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const { question } = await req.json();

  const answer = `
AI could improve your business in several ways:

• Automating repetitive workflows
• AI-powered customer support
• Predictive analytics for sales
• Intelligent document processing
• AI copilots for employees

Nexxovate can design a tailored AI automation strategy for your organization.
`;

  return NextResponse.json({ answer });

}