// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.daisyui.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'http', // AZAK
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/uploads/images/**',
      },
      {
        protocol: 'http', // AZAK
        hostname: 'localhost',
        port: '8000',
        pathname: '/uploads/images/**',
      },
      {
        protocol: 'https', // AZAK
        hostname: 'prelevels.com',
        port: '',
        pathname: '/uploads/images/**',
      },
      {
        protocol: 'https', // AZAK
        hostname: 'www.prelevels.com',
        port: '',
        pathname: '/uploads/images/**',
      },
    ],
  },
};

export default nextConfig;
