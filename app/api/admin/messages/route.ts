import { NextResponse } from "next/server";
import { getConnectionDebugInfo, queryDatabase } from "../../../lib/db";
import { unauthorizedResponse, verifyAdminRequest } from "../_auth";

export const runtime = "nodejs";

type CustomerMessageRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  source_path: string | null;
  user_agent: string | null;
  created_at: string;
};

export async function GET(request: Request) {
  if (!verifyAdminRequest(request)) {
    return unauthorizedResponse();
  }

  try {
    const result = await queryDatabase<CustomerMessageRow>(
      `select id, name, phone, email, message, source_path, user_agent, created_at
       from public.customer_messages
       order by created_at desc
       limit 200`,
    );

    return NextResponse.json({ messages: result.rows });
  } catch (error) {
    console.error("Failed to list customer messages", getConnectionDebugInfo(), error);
    return NextResponse.json({ error: "\u8bfb\u53d6\u54a8\u8be2\u5931\u8d25\u3002" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!verifyAdminRequest(request)) {
    return unauthorizedResponse();
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";

  if (!id) {
    return NextResponse.json({ error: "\u7f3a\u5c11\u8bb0\u5f55 ID\u3002" }, { status: 400 });
  }

  try {
    const result = await queryDatabase<{ id: string }>(
      `delete from public.customer_messages
       where id = $1
       returning id`,
      [id],
    );

    if (!result.rowCount) {
      return NextResponse.json({ error: "\u8bb0\u5f55\u4e0d\u5b58\u5728\u3002" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete customer message", getConnectionDebugInfo(), error);
    return NextResponse.json({ error: "\u5220\u9664\u54a8\u8be2\u5931\u8d25\u3002" }, { status: 500 });
  }
}
