/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      remotePatterns: [
        {
          // The `src` property hostname must end with `.example.com`,
          // otherwise this will respond with 400 Bad Request.
          protocol: 'https',
          hostname: '**.tailwindui.com',
        },
      ],
    },
  },
}
// module.exports = {
  
// };

module.exports = nextConfig
