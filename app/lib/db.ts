import { Pool, QueryResultRow } from "pg";

const globalForPg = globalThis as typeof globalThis & {
  customerMessagesPool?: Pool;
  customerMessagesFallbackPool?: Pool;
};

const supabaseProjectRef = "fhwmxdcjnqfhtfnkundu";

function getConnectionString() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Missing POSTGRES_URL or DATABASE_URL");
  }

  return connectionString;
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

function getPool() {
  const databaseUrl = new URL(getConnectionString());

  globalForPg.customerMessagesPool ??= new Pool(createPoolConfig(databaseUrl));

  return globalForPg.customerMessagesPool;
}

function getFallbackPool() {
  const databaseUrl = new URL(getConnectionString());
  const fallbackHost = getPoolerFallbackHost(databaseUrl.hostname);

  if (!fallbackHost) {
    return null;
  }

  globalForPg.customerMessagesFallbackPool ??= new Pool(createPoolConfig(databaseUrl, fallbackHost));

  return globalForPg.customerMessagesFallbackPool;
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

export function getConnectionDebugInfo() {
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

export async function queryDatabase<T extends QueryResultRow = QueryResultRow>(query: string, values: unknown[] = []) {
  try {
    return await getPool().query<T>(query, values);
  } catch (error) {
    if (shouldTryPoolerFallback(error)) {
      const fallbackPool = getFallbackPool();

      if (fallbackPool) {
        return fallbackPool.query<T>(query, values);
      }
    }

    throw error;
  }
}
