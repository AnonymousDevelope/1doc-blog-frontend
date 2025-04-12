import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:"res.cloudinary.com",
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
};

export default withNextIntl({
  ...nextConfig,
});
