import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signin", // Optional: your custom sign-in page
  },
  callbacks: {
    async session({ session, token }) {
      // Add user email to session
      session.user.email = token.email;
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile?.email) {
        token.email = profile.email;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
