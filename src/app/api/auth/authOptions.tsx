import  { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:  process.env.NEXT_PUBLIC_GOOGLE_ID || "",
      clientSecret:  process.env.NEXT_PUBLIC_GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile https://www.googleapis.com/auth/youtube.readonly"
        },
      },
    }),

  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, account}) {
      if(account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({session, token}) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: "123456",
  }

 
};



