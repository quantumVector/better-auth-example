"use client";

import {authClient, signIn, signOut} from "@/lib/auth-client";
import Image from "next/image";

export default function AuthTest({ routerType }: { routerType: "app" | "pages" }) {
  const { data: session, isPending } = authClient.useSession();

  const handleSignIn = async (provider: "yandex" | "vk" | "mailru") => {
    try {
      if (provider === "vk") {
        const result = await signIn.social({
          provider: "vk",
          callbackURL: routerType === "app" ? "/app-test" : "/pages-test",
        });

        if (result?.error) {
          console.error("Sign in error:", result.error);
          alert(`Ошибка входа: ${result.error.message}`);
        }

        return;
      }

      const result = await signIn.oauth2({
        providerId: provider,
        callbackURL: routerType === "app" ? "/app-test" : "/pages-test",
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">
            Better Auth Test - Generic OAuth
          </h1>
          <p className="text-gray-600 mb-8">
            Router: <span className="font-semibold">{routerType.toUpperCase()}</span>
          </p>

          {session?.user ? (
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Информация о пользователе
                </h2>

                <div className="space-y-3">
                  {session.user.image && (
                    <div className="flex items-center gap-4">
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    </div>
                  )}

                  <div>
                    <span className="text-gray-600">ID:</span>{" "}
                    <span className="font-mono">{session.user.id}</span>
                  </div>

                  <div>
                    <span className="text-gray-600">Имя:</span>{" "}
                    <span className="font-semibold">
                      {session.user.name || "Не указано"}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-600">Email:</span>{" "}
                    <span className="font-semibold">
                      {session.user.email || "Не указан"}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-600">Email Verified:</span>{" "}
                    <span className="font-semibold">
                      {session.user.emailVerified ? "✅ Да" : "❌ Нет"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
              >
                Выйти
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">
                Войти через:
              </h2>

              <button
                onClick={() => handleSignIn("vk")}
                className="w-full bg-[#0077FF] text-white py-3 rounded-lg hover:bg-[#0066DD] transition flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.785 16.241s.288-.032.436-.193c.136-.149.131-.428.131-.428s-.019-1.304.587-1.495c.598-.189 1.367 1.26 2.182 1.818.616.421 1.084.329 1.084.329l2.179-.03s1.139-.071.599-.966c-.044-.073-.314-.662-1.617-1.87-1.364-1.263-1.181-1.059.462-3.244.999-1.329 1.397-2.139 1.272-2.486-.119-.332-.854-.244-.854-.244l-2.453.015s-.182-.025-.317.056c-.133.079-.218.263-.218.263s-.391 1.041-.912 1.928c-1.096 1.87-1.535 1.968-1.715 1.851-.418-.272-.314-1.091-.314-1.673 0-1.819.276-2.578-.538-2.774-.271-.065-.471-.108-1.165-.115-.891-.009-1.645.003-2.072.212-.284.139-.503.449-.37.467.164.022.536.1.733.368.255.346.246 1.123.246 1.123s.147 2.14-.343 2.405c-.336.182-.797-.189-1.787-1.888-.507-.87-.89-1.833-.89-1.833s-.074-.181-.206-.278c-.16-.118-.383-.155-.383-.155l-2.33.015s-.35.01-.478.162c-.114.135-.009.413-.009.413s1.84 4.303 3.926 6.472c1.915 1.989 4.088 1.858 4.088 1.858h.986z"/>
                </svg>
                VK ID
              </button>

              <button
                onClick={() => handleSignIn("yandex")}
                className="w-full bg-[#FF0000] text-white py-3 rounded-lg hover:bg-[#DD0000] transition"
              >
                Яндекс ID
              </button>

              <button
                onClick={() => handleSignIn("mailru")}
                className="w-full bg-[#005FF9] text-white py-3 rounded-lg hover:bg-[#0052D9] transition"
              >
                Mail.ru
              </button>
            </div>
          )}
        </div>

        {/* Debug информация */}
        <div className="mt-6 bg-gray-900 text-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">
            Debug: Session Data
          </h3>
          <pre className="text-xs overflow-auto max-h-96">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
