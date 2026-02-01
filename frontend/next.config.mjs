/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000", //
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "your-backend-domain.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
