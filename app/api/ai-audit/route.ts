import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();
  const website = body.website;

  const analysis = `
Automation opportunities identified for ${website}:

• AI chatbot for automated customer support
• Intelligent document processing
• Workflow automation across operations
• AI analytics dashboards for decision making
• Automated marketing campaigns

Estimated operational efficiency improvement: 30–45%

Nexxovate can design a custom AI automation roadmap for your organization.
`;

  return NextResponse.json({ analysis });

}