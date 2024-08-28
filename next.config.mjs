// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {

        env: {
          NEXTAUTH_URL: process.env.NEXTAUTH_URL,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
          GOOGLE_SECRET: process.env.GOOGLE_SECRET,
          GOOGLE_ID: process.env.GOOGLE_ID
        
      }
  };
  
  export default nextConfig;
  