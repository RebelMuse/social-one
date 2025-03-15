/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      }
    ],
    domains: ['platform-lookaside.fbsbx.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  // Add static page handling
  async rewrites() {
    return [
      {
        source: '/legal/privacy',
        destination: '/legal/privacy.html',
      },
    ]
  },
  // Ensure the privacy page is static
  async headers() {
    return [
      {
        source: '/legal/privacy',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
          {
            key: 'X-Robots-Tag',
            value: 'all',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 