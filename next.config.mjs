// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:['i.ytimg.com']
  },
        env: {
          NEXT_PUBLIC_API_KEY:process.env.NEXT_PUBLIC_API_KEY,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
          NEXT_PUBLIC_GOOGLE_SECRET: process.env.GOOGLE_SECRET,
          NEXT_PUBLIC_GOOGLE_ID: process.env.GOOGLE_ID
        
      }
  };
  
  export default nextConfig;
  