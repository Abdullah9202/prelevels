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
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000', // Port your backend server runs on
        pathname: '/uploads/images/**', // Adjust this to match your image path
      }
    ],
  },
};

export default nextConfig;
  
