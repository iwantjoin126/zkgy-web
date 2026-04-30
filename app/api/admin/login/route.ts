import { NextResponse } from "next/server";
import { adminCookieName, createAdminSessionValue, isAdminConfigured, verifyAdminPassword } from "../_auth";

export const runtime = "nodejs";

type LoginPayload = {
  password?: unknown;
};

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "\u540e\u53f0\u5bc6\u7801\u672a\u914d\u7f6e\u3002" }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as LoginPayload | null;
  const password = typeof body?.password === "string" ? body.password : "";

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "\u5bc6\u7801\u4e0d\u6b63\u786e\u3002" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, createAdminSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
