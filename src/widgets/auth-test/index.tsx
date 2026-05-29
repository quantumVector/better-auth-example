"use client";

import {authClient, signIn, signOut} from "@/lib/auth-client";
import Image from "next/image";

type AuthTestProps = {
  routerType: "app" | "pages";
  callbackURL?: string;
};

export default function AuthTest({ routerType, callbackURL }: AuthTestProps) {
  const { data: session, isPending } = authClient.useSession();
  const redirectTo =
    callbackURL ?? (routerType === "app" ? "/app-test" : "/pages-test");

  const handleSignIn = async (provider: "yandex" | "vk" | "mailru") => {
    try {
      if (provider === "vk") {
        const result = await signIn.social({
          provider: "vk",
          callbackURL: redirectTo,
        });

        if (result?.error) {
          console.error("Sign in error:", result.error);
          alert(`Ошибка входа: ${result.error.message}`);
        }

        return;
      }

      const result = await signIn.oauth2({
        providerId: provider,
        callbackURL: redirectTo,
      });

      if (result?.error) {
        console.error("Sign in error:", result.error);
        alert(`Ошибка входа: ${result.error.message}`);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      alert(`Ошибка: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-sm text-gray-500">Загрузка...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-950">
          Better Auth
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Проверка входа через OAuth-провайдеры.
        </p>
        <div className="mt-4 inline-flex rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600">
          {routerType === "app" ? "App Router" : "Pages Router"}
        </div>

        {session?.user ? (
          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-3">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gray-100" />
              )}

              <div className="min-w-0">
                <div className="truncate font-medium text-gray-950">
                  {session.user.name || "Имя не указано"}
                </div>
                <div className="truncate text-sm text-gray-500">
                  {session.user.email || "Email не указан"}
                </div>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
            >
              Выйти
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-3">
            <button
              onClick={() => handleSignIn("vk")}
              className="w-full rounded-md bg-[#0077FF] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#006BE6]"
            >
              Войти через VK ID
            </button>

            <button
              onClick={() => handleSignIn("yandex")}
              className="w-full rounded-md bg-[#FC3F1D] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#E5391A]"
            >
              Войти через Яндекс ID
            </button>

            <button
              onClick={() => handleSignIn("mailru")}
              className="w-full rounded-md bg-[#005FF9] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0054DD]"
            >
              Войти через Mail.ru
            </button>
          </div>
        )}

        <div className="mt-8">
          <div className="mb-2 text-xs uppercase tracking-wide text-gray-400">
            Session JSON
          </div>
          <pre className="max-h-96 overflow-auto rounded-md bg-gray-950 p-4 text-xs leading-relaxed text-gray-100">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}
