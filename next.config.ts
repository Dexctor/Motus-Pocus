import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PixiJS v8 is ESM — ensure Turbopack/webpack bundle it correctly
  transpilePackages: ['pixi.js'],
};

export default nextConfig;
