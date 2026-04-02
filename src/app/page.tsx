import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Better Auth Research
        </h1>

        <p className="text-gray-600 mb-8 text-center">
          Тестирование Better Auth с российскими OAuth провайдерами
        </p>

        <div className="space-y-4">
          <Link
            href="/app-test"
            className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-center font-semibold"
          >
            App Router Test
          </Link>

          <Link
            href="/pages-test"
            className="block w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-center font-semibold"
          >
            Pages Router Test
          </Link>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold mb-2">Провайдеры для тестирования:</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ VK ID</li>
            <li>✓ Яндекс ID</li>
            <li>✓ Mail.ru</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
