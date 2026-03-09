import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const problem = body.problem;

  const solution = `
Based on your challenge: "${problem}"

Possible AI solution:

• Deploy an AI assistant to automate repetitive interactions
• Integrate workflow automation for internal processes
• Implement data analytics dashboards for better insights
• Use AI-powered document processing or knowledge assistants

Nexxovate could design a tailored AI solution combining automation, cloud infrastructure and secure integrations.
`;

  return NextResponse.json({ solution });
}