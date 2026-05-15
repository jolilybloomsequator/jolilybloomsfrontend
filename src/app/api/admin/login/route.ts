import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const adminEmail = process.env.ADMIN_EMAIL || "info@jolilybloomsequator.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "PrincessRhea2023!";

    // Validate credentials
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create response with session cookie
    const response = NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );

    // Set secure session cookie (expires in 7 days)
    response.cookies.set({
      name: "admin_session",
      value: Buffer.from(JSON.stringify({ email, timestamp: Date.now() })).toString("base64"),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}

export async function POST_LOGOUT(request: NextRequest) {
  const response = NextResponse.json(
    { success: true, message: "Logged out" },
    { status: 200 }
  );

  response.cookies.delete("admin_session");

  return response;
}
