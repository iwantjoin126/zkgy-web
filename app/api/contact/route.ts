import { NextResponse } from "next/server";
import { getConnectionDebugInfo, queryDatabase } from "../../lib/db";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  message?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = cleanString(body.name);
  const phone = cleanString(body.phone);
  const email = cleanString(body.email);
  const message = cleanString(body.message);

  if (!name || !phone || !message) {
    return NextResponse.json({ error: "\u59d3\u540d\u3001\u7535\u8bdd\u548c\u7559\u8a00\u4e3a\u5fc5\u586b\u9879\u3002" }, { status: 400 });
  }

  if (name.length > 120 || phone.length > 60 || message.length > 5000) {
    return NextResponse.json({ error: "\u63d0\u4ea4\u5185\u5bb9\u8fc7\u957f\uff0c\u8bf7\u7cbe\u7b80\u540e\u91cd\u8bd5\u3002" }, { status: 400 });
  }

  if (email && !emailPattern.test(email)) {
    return NextResponse.json({ error: "\u90ae\u7bb1\u683c\u5f0f\u4e0d\u6b63\u786e\u3002" }, { status: 400 });
  }

  try {
    await queryDatabase(
      `insert into public.customer_messages
        (name, phone, email, message, source_path, user_agent)
       values ($1, $2, nullif($3, ''), $4, $5, $6)`,
      [
        name,
        phone,
        email,
        message,
        request.headers.get("referer") || new URL(request.url).pathname,
        request.headers.get("user-agent"),
      ],
    );
  } catch (error) {
    console.error("Failed to save customer message", getConnectionDebugInfo(), error);
    return NextResponse.json({ error: "\u63d0\u4ea4\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    message: "\u54a8\u8be2\u4fe1\u606f\u5df2\u6536\u5230\u3002",
  });
}
