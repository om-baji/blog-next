import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { SessionStrategy } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/server/db";
import bcrypt from "bcryptjs";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    // GoogleProvider({
    //   clientId: process.env.AUTH_GOOGLE_ID as string,
    //   clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    // }),
    Credentials({
      credentials: {
        email: { type: "email", placeholder: "email" },
        password: { type: "password", placeholder: "password" },
      },
      authorize: async (credentials) : Promise<{ id: string; name?: string; email: string } | null> => {
        try {
          if (!credentials?.password || !credentials.email) {
            return null;
          }
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });
          if (!user) throw new Error("User does not exist");

          const isValid = await bcrypt.compare(
            credentials?.password,
            user.password || ""
          );

          if (!isValid) throw new Error("Wrong password");

          return {
            name: user.name || "",
            email: user.email || "",
            id: user.id,
          };
        } catch (error) {
          console.log("Authorization error ", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" as SessionStrategy },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id as string;
        token.email = user.email as string;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
