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
  customerMessagesFallbackPool?: Pool;
};

const supabaseProjectRef = "fhwmxdcjnqfhtfnkundu";

function getPool() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Missing POSTGRES_URL or DATABASE_URL");
  }

  const databaseUrl = new URL(connectionString);
  const poolConfig = createPoolConfig(databaseUrl);

  globalForPg.customerMessagesPool ??= new Pool(poolConfig);

  return globalForPg.customerMessagesPool;
}

function getFallbackPool() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Missing POSTGRES_URL or DATABASE_URL");
  }

  const databaseUrl = new URL(connectionString);
  const fallbackHost = getPoolerFallbackHost(databaseUrl.hostname);

  if (!fallbackHost) {
    return null;
  }

  globalForPg.customerMessagesFallbackPool ??= new Pool(createPoolConfig(databaseUrl, fallbackHost));

  return globalForPg.customerMessagesFallbackPool;
}

function createPoolConfig(databaseUrl: URL, hostOverride?: string) {
  return {
    host: hostOverride || databaseUrl.hostname,
    port: databaseUrl.port ? Number(databaseUrl.port) : 5432,
    database: databaseUrl.pathname.replace(/^\//, ""),
    user: normalizePoolerUser(databaseUrl),
    password: decodeURIComponent(databaseUrl.password),
    ssl: {
      rejectUnauthorized: false,
    },
    max: 1,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
  };
}

function getConnectionDebugInfo() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    return { hasConnectionString: false };
  }

  try {
    const databaseUrl = new URL(connectionString);

    return {
      hasConnectionString: true,
      host: databaseUrl.hostname,
      port: databaseUrl.port || "5432",
      database: databaseUrl.pathname.replace(/^\//, ""),
      user: normalizePoolerUser(databaseUrl),
      hasQuery: Boolean(databaseUrl.search),
    };
  } catch {
    return {
      hasConnectionString: true,
      parseable: false,
    };
  }
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizePoolerUser(databaseUrl: URL) {
  const username = decodeURIComponent(databaseUrl.username);

  if (databaseUrl.hostname.endsWith(".pooler.supabase.com")) {
    return `postgres.${supabaseProjectRef}`;
  }

  return username;
}

function getPoolerFallbackHost(hostname: string) {
  if (!hostname.endsWith(".pooler.supabase.com") || !hostname.startsWith("aws-0-")) {
    return null;
  }

  return hostname.replace(/^aws-0-/, "aws-1-");
}

function shouldTryPoolerFallback(error: unknown) {
  return error instanceof Error && error.message.includes("Tenant or user not found");
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
    if (shouldTryPoolerFallback(error)) {
      const fallbackPool = getFallbackPool();

      if (fallbackPool) {
        try {
          await fallbackPool.query(
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

          return NextResponse.json({
            ok: true,
            message: "OK",
          });
        } catch (fallbackError) {
          console.error("Failed to save customer message with fallback pooler", fallbackError);
        }
      }
    }

    console.error("Failed to save customer message", getConnectionDebugInfo(), error);
    return NextResponse.json({ error: "提交失败，请稍后再试。" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    message: "咨询信息已收到。",
  });
}
