// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:['i.ytimg.com','lh3.googleusercontent.com','yt3.ggpht.com']
  },
        env: {
          NEXT_PUBLIC_API_KEY:process.env.NEXT_PUBLIC_API_KEY,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
          GOOGLE_SECRET: process.env.GOOGLE_SECRET,
          GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
        
      }
  };
  
  export default nextConfig;
  