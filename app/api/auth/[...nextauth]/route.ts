import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(
            "http://localhost:3001/auth/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );
          if (data) {
            return data?.user;
          }
          return null;
        } catch (err) {
          if (axios.isAxiosError(err)) {
            throw new Error(err.response?.data?.message);
          } else {
            throw new Error("Something went wrong.");
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
