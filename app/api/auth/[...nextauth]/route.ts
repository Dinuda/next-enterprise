import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { sendSESEmail } from "lib/aws/ses";
import prisma from "lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      
      async generateVerificationToken() {
        return "ABC123"
      },
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host } = new URL(url)
        sendSESEmail("Your verification code is ABC123", email, "Verify your account")
      }
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };