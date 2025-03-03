/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "stickers.fullyst.com",
          },
        ],
      },
};

export default nextConfig;
