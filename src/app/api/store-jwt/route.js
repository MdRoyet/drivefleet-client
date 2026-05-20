import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { token } = await request.json();

    const response = NextResponse.json({
      success: true,
      message: "Token secured in cookie proxy storage layer.",
    });

    // 🔒 LOCALHOST BULLETPROOF CONFIGURATION
    response.cookies.set("drivefleet_jwt", token, {
      httpOnly: true, // Prevents Cross-Site Scripting (XSS)
      secure: false, // ⚠️ CRITICAL: Must be false for local http:// development (No SSL)
      sameSite: "lax", // Allows standard port-to-port cross-communication on localhost
      path: "/", // Available globally across your entire domain structure
      maxAge: 7 * 24 * 60 * 60, // 7 Days lifespan
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Cookie destroyed cleanly.",
  });
  response.cookies.delete("drivefleet_jwt");
  return response;
}
