"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simüle edilmiş login kontrolü
    // Gerçek projede bu bir API çağrısı olur
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (username === "test" && password === "test123") {
      // Başarılı login - session storage'a kaydet
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("username", username);
      router.push("/dashboard");
    } else {
      setError("Geçersiz kullanıcı adı veya şifre");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Hoş Geldiniz</h1>
          <p className="text-gray-500 mt-2">Devam etmek için giriş yapın</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Kullanıcı Adı
            </label>
            <input
              type="text"
              id="username"
              data-testid="username-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-800"
              placeholder="Kullanıcı adınızı girin"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Şifre
            </label>
            <input
              type="password"
              id="password"
              data-testid="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-800"
              placeholder="Şifrenizi girin"
              required
            />
          </div>

          {error && (
            <div
              data-testid="error-message"
              className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            data-testid="login-button"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo bilgileri:</p>
          <p className="font-mono bg-gray-100 px-2 py-1 rounded mt-1">
            test / test123
          </p>
        </div>
      </div>
    </div>
  );
}
