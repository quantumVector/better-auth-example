This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Better Auth Database

The project uses PostgreSQL for Better Auth so it can run on Vercel. SQLite is not suitable for Vercel Functions because the deployment filesystem is not persistent.

Recommended setup:

1. Create a Postgres database, for example Neon through the Vercel Marketplace.
2. Add these environment variables locally and in Vercel:

```bash
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=https://your-project.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-project.vercel.app
DATABASE_URL=postgres://user:password@host:5432/database?sslmode=require
```

3. Install dependencies after updating `package.json`.
4. Apply the Better Auth schema:

```bash
npx auth@latest migrate
```

For VK ID, use this callback URL in the VK app settings:

```text
https://your-project.vercel.app/api/auth/oauth2/callback/vk
```
