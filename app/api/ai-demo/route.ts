import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();
  const prompt = body.prompt;

  const answer = `
Based on your request: "${prompt}"

Possible AI solution:

• Deploy an AI assistant to automate repetitive workflows
• Integrate intelligent document processing
• Use AI analytics dashboards to extract insights
• Automate customer interactions using conversational AI

Nexxovate can design and deploy this solution tailored to your organization.
`;

  return NextResponse.json({ answer });

}