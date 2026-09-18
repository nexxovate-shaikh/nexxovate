import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;

const TEXTUAL = [
  "text/plain",
  "text/markdown",
  "text/csv",
  "application/json",
];

/**
 * Knowledge intake for the agent workspace.
 *
 * The previous page posted to /api/upload-doc, which did not exist, and then
 * reported success regardless. This route actually stores what it receives —
 * metadata always, extracted text where the format allows it — and says
 * plainly when storage is not configured rather than pretending.
 */
export async function POST(req: Request) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Knowledge storage is not configured for this environment. Document intake is provisioned per engagement.",
      },
      { status: 503 }
    );
  }

  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "No file received." },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { ok: false, error: "That file is larger than the 8 MB intake limit." },
        { status: 413 }
      );
    }

    const isTextual =
      TEXTUAL.includes(file.type) || /\.(txt|md|csv|json)$/i.test(file.name);

    const content = isTextual ? (await file.text()).slice(0, 200_000) : null;

    const { getDB } = await import("@/lib/db");
    const db = await getDB();

    const result = await db.collection("knowledge").insertOne({
      name: file.name,
      type: file.type || "application/octet-stream",
      bytes: file.size,
      extracted: Boolean(content),
      content,
      uploadedAt: new Date(),
    });

    return NextResponse.json({
      ok: true,
      id: String(result.insertedId),
      extracted: Boolean(content),
      message: content
        ? "Stored and indexed for the agent workspace."
        : "Stored. Text extraction for this format is provisioned per engagement.",
    });
  } catch (error) {
    console.error("KNOWLEDGE INTAKE ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Intake failed. Please try again." },
      { status: 500 }
    );
  }
}
