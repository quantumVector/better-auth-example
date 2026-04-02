import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
  database: new Database("./sqlite.db"),
  logger: {
    level: "debug",
  },
  emailAndPassword: {
    enabled: true,
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
          redirectURI: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/auth/oauth2/callback/yandex`,
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
      ],
    }),
  ],
});
