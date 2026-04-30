import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

export const adminCookieName = "zkgy_admin_session";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || process.env.ADMIN_READ_WRITE_TOKEN || process.env.contact_READ_WRITE_TOKEN || "";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || getAdminPassword();
}

function hashValue(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

export function isAdminConfigured() {
  return Boolean(getAdminPassword());
}

export function verifyAdminPassword(password: string) {
  const expectedPassword = getAdminPassword();

  if (!expectedPassword || !password) {
    return false;
  }

  const expected = Buffer.from(hashValue(expectedPassword));
  const actual = Buffer.from(hashValue(password));

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function createAdminSessionValue() {
  return hashValue(`admin:${getAdminPassword()}`);
}

export function verifyAdminRequest(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const sessionCookie = cookies.find((cookie) => cookie.startsWith(`${adminCookieName}=`));
  const sessionValue = sessionCookie ? decodeURIComponent(sessionCookie.split("=").slice(1).join("=")) : "";
  const expectedValue = createAdminSessionValue();

  if (!sessionValue || !expectedValue) {
    return false;
  }

  const expected = Buffer.from(expectedValue);
  const actual = Buffer.from(sessionValue);

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "\u8bf7\u5148\u767b\u5f55\u540e\u53f0\u3002" }, { status: 401 });
}
