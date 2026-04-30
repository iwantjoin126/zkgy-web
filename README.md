# 中康国悦站点源码重建

这是根据已部署的 Vercel 项目 `zkgy-clone` 重建的 Next.js App Router 项目。

## 本地开发

```bash
npm install
npm run dev
```

默认本地地址：

```text
http://localhost:3000
```

## 已实现路由

- `/`
- `/about`
- `/contact`
- `/faq`
- `/coming-soon`
- `/admin`
- `/api/contact`

## 部署

当前目录已经通过 Vercel CLI 链接到项目：

```text
projectId: prj_q0xFocx2apZZ9LQZQ7trfZWK8kAb
projectName: zkgy-clone
```

`.vercel` 和环境变量文件不会提交到 Git。

## 联系表单数据库

联系页表单提交到 `/api/contact`，后端使用 PostgreSQL Session Pooler 写入 Supabase 表：

```text
public.customer_messages
```

需要在本地 `.env.local` 和 Vercel Production/Preview 环境变量中配置：

```text
POSTGRES_URL="postgresql://postgres.fhwmxdcjnqfhtfnkundu:<password>@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres?sslmode=require"
```

连接串来源：

```text
Supabase Dashboard -> Project Settings -> Database -> Connection string -> Session pooler
```
