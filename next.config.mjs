import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/**
 * Pin the workspace root. Without it Next walks up and finds the lockfile in
 * the parent folder, which sits outside this repository.
 */
const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
