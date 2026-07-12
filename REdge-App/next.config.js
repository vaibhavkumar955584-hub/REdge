/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
    ],
  },
  webpack: (config) => {
    // Setting resolve.alias to false tells webpack to ignore a module
    // This is required for pdfjs-dist which uses canvas and encoding
    // that are not available in the browser/edge runtime.
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  // Ensure the build doesn't fail due to ESLint warnings
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ensure the build doesn't fail due to TypeScript errors (already checked, but safe)
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
