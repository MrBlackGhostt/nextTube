import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextApiHandler } from "next";
import { signIn } from "next-auth/react";
import { pages } from "next/dist/build/templates/app-page";

const authOptions = NextAuth({
  // Configure one or more authentication providers

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // Add more providers here if needed
  ],
  // A secret is used to encrypt session cookies
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider == 'google') {
        return true
      }
      return false; 
    },
 
  
  },
  session: {
    strategy: 'jwt',
   },

 
});



const handler: NextApiHandler = (req, res) => authOptions(req, res, NextAuth);
export { handler as GET, handler as POST };