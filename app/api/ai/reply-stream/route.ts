import { streamAI } from "@/lib/ai-stream";

export async function POST(req: Request) {
  const { lead } = await req.json();

  const prompt = `
You are Nexxovate's elite sales closer.

Write a premium reply email.

Name: ${lead.Name}
Interest: ${lead.Interest}
Business: ${lead["Business Type"]}
`;

  const stream = await streamAI(prompt);

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}