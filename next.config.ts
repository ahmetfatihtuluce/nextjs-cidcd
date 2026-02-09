import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker için standalone output
  // Bu ayar, Next.js'in tüm bağımlılıkları içeren
  // tek başına çalışabilir bir build oluşturmasını sağlar
  output: "standalone",
};

export default nextConfig;
