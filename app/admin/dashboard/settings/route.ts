import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { company, email } = await request.json();

    // Validate required fields
    if (!company || !email) {
      return NextResponse.json(
        { error: "Company and email are required" },
        { status: 400 }
      );
    }

    // Here you can save settings to database if needed

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
    });

  } catch (error) {
    console.error("Settings API error:", error);

    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}