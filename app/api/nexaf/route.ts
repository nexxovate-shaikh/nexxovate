import { NextResponse } from "next/server";

import { composeAnswer, retrieve } from "@/lib/nexaf";
import { generateAI } from "@/lib/ai";

export const runtime = "nodejs";

/**
 * ASK NEXAF
 *
 * Retrieval first, always. A language model is used only to phrase
 * material that already exists in the Nexxovate knowledge index, and
 * only when one is configured — it is never the source of a fact. If
 * the index has no confident match, NEXAF says so rather than
 * improvising capability.
 */
export async function POST(req: Request) {
  try {
    const { query } = (await req.json()) as { query?: string };

    if (!query || typeof query !== "string" || query.trim().length < 2) {
      return NextResponse.json(
        { error: "Ask me something about Nexxovate." },
        { status: 400 }
      );
    }

    const base = composeAnswer(query);

    // no grounding → do not call a model, do not guess
    if (!base.grounded || !process.env.GROQ_API_KEY) {
      return NextResponse.json(base);
    }

    const context = retrieve(query, 3)
      .map((m) => `SOURCE: ${m.entry.title}\n${m.entry.body}`)
      .join("\n\n---\n\n");

    const prompt = `You are NEXAF, the enterprise answer interface for Nexxovate.

Answer the question using ONLY the context below. Do not add capabilities,
metrics, clients or claims that are not present in it. If the context does not
cover the question, say so plainly and suggest speaking with the Nexxovate team.

Write 2–4 sentences. Confident, precise, enterprise register. No bullet lists,
no marketing superlatives, no emoji.

CONTEXT:
${context}

QUESTION: ${query}`;

    const phrased = await generateAI(prompt);

    const usable =
      typeof phrased === "string" &&
      phrased.trim().length > 40 &&
      !phrased.startsWith("AI server error") &&
      !phrased.startsWith("Groq returned empty");

    return NextResponse.json({
      ...base,
      answer: usable ? phrased.trim() : base.answer,
      phrasedByModel: usable,
    });
  } catch (error) {
    console.error("NEXAF ERROR:", error);
    return NextResponse.json(
      {
        answer:
          "NEXAF is unavailable right now. The team can answer directly in the meantime.",
        sources: [{ label: "Contact Nexxovate", href: "/contact" }],
        grounded: false,
        phrasedByModel: false,
      },
      { status: 200 }
    );
  }
}
