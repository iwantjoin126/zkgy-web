import { NextResponse } from "next/server";
import { Pool } from "pg";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  message?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const globalForPg = globalThis as typeof globalThis & {
  customerMessagesPool?: Pool;
};

function getPool() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Missing POSTGRES_URL or DATABASE_URL");
  }

  globalForPg.customerMessagesPool ??= new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
    max: 1,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
  });

  return globalForPg.customerMessagesPool;
}

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
    return NextResponse.json({ error: "姓名、电话和留言为必填项。" }, { status: 400 });
  }

  if (name.length > 120 || phone.length > 60 || message.length > 5000) {
    return NextResponse.json({ error: "提交内容过长，请精简后重试。" }, { status: 400 });
  }

  if (email && !emailPattern.test(email)) {
    return NextResponse.json({ error: "邮箱格式不正确。" }, { status: 400 });
  }

  try {
    await getPool().query(
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
    console.error("Failed to save customer message", error);
    return NextResponse.json({ error: "提交失败，请稍后再试。" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    message: "咨询信息已收到。",
  });
}
