import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { Pool } from "pg";

const baseURL =
  process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required for Better Auth database access");
}

if (!baseURL) {
  throw new Error("BETTER_AUTH_URL is required for Better Auth callbacks");
}

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  baseURL,
  logger: {
    level: "debug",
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    vk: {
      clientId: process.env.VK_CLIENT_ID!,
      clientSecret: process.env.VK_CLIENT_SECRET!,
    },
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "yandex",
          clientId: process.env.YANDEX_CLIENT_ID!,
          clientSecret: process.env.YANDEX_CLIENT_SECRET!,
          authorizationUrl: "https://oauth.yandex.ru/authorize",
          tokenUrl: "https://oauth.yandex.ru/token",
          scopes: ["login:email", "login:info", "login:avatar"],
          redirectURI: `${baseURL}/api/auth/oauth2/callback/yandex`,
          pkce: true,
          getUserInfo: async (tokens) => {
            const response = await fetch(
              "https://login.yandex.ru/info?format=json",
              {
                headers: { Authorization: `OAuth ${tokens.accessToken}` },
              }
            );
            const profile = await response.json();

            return {
              id: String(profile.id),
              email: profile.default_email ?? profile.emails?.[0] ?? "",
              emailVerified: true,
              name:
                profile.real_name ??
                profile.display_name ??
                `${profile.first_name} ${profile.last_name}`,
              image:
                profile.default_avatar_id && !profile.is_avatar_empty
                  ? `https://avatars.yandex.net/get-yapic/${profile.default_avatar_id}/islands-200`
              : undefined,
            };
          },
        },
        {
          providerId: "mailru",
          clientId: process.env.MAILRU_CLIENT_ID!,
          clientSecret: process.env.MAILRU_CLIENT_SECRET!,
          authorizationUrl: "https://o2.mail.ru/login",
          tokenUrl: "https://o2.mail.ru/token",
          userInfoUrl: "https://o2.mail.ru/userinfo",
          scopes: ["userinfo"],
          redirectURI: `${baseURL}/api/auth/oauth2/callback/mailru`,
          authentication: "basic",
          getUserInfo: async (tokens) => {
            const response = await fetch(
              `https://o2.mail.ru/userinfo?access_token=${tokens.accessToken}`
            );
            const profile = await response.json();

            return {
              id: String(profile.email),
              email: profile.email ?? "",
              emailVerified: true,
              name:
                profile.name ??
                [profile.first_name, profile.last_name].filter(Boolean).join(" "),
            };
          },
        },
      ],
    }),
  ],
});
