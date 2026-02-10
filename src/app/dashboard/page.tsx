"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Session kontrolü - client-side only
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const storedUsername = sessionStorage.getItem("username");

    if (!isLoggedIn) {
      router.push("/login");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUsername(storedUsername || "Kullanıcı");
       
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("username");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span data-testid="welcome-message" className="text-gray-600">
              Hoş geldin, <strong>{username}</strong>
            </span>
            <button
              onClick={handleLogout}
              data-testid="logout-button"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Toplam Kullanıcı</p>
                <p
                  data-testid="total-users"
                  className="text-3xl font-bold text-gray-800"
                >
                  1,234
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Aktif Oturum</p>
                <p
                  data-testid="active-sessions"
                  className="text-3xl font-bold text-gray-800"
                >
                  56
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Başarılı İşlem</p>
                <p
                  data-testid="successful-ops"
                  className="text-3xl font-bold text-gray-800"
                >
                  98.5%
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Son Aktiviteler
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  Yeni kullanıcı kaydı
                </p>
                <p className="text-sm text-gray-500">2 dakika önce</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  Sistem güncellemesi tamamlandı
                </p>
                <p className="text-sm text-gray-500">15 dakika önce</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="bg-yellow-100 p-2 rounded-full">
                <svg
                  className="w-5 h-5 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800">Bakım planlandı</p>
                <p className="text-sm text-gray-500">1 saat önce</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
