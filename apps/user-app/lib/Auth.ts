import CredentialsProvider from "next-auth/providers/credentials";
import client from "@repo/database/client";
import { z } from "zod";
import bcrypt from "bcrypt";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { JWT } from "next-auth/jwt";

const InputType = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

interface CredentialType {
  email: string;
  password: string;
}
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "akhil@gmail.com" },
        password: { label: "Password", type: "text", placeholder: "123@*657" },
      },
      async authorize(credentials: CredentialType | undefined) {
        console.log(credentials);
        const { success } = InputType.safeParse(credentials);
        if (!success) {
          console.log("zod error");
          return null;
        }
        console.log("zod success");
        const findUserWithTheEmail = await client.user.findFirst({
          where: {
            email: credentials == undefined ? " " : credentials.email,
          },
        });
        if (!findUserWithTheEmail) {
          console.log("user not found");
          return null;
        }
        console.log("user found");
        const passwordMatching = await bcrypt.compare(
          credentials?.password == undefined ? " " : credentials.password,
          findUserWithTheEmail.password == null
            ? " "
            : findUserWithTheEmail.password
        );
        if (!passwordMatching) {
          console.log("password not match");
          return null;
        }
        console.log("password match");
        console.log("found user ", findUserWithTheEmail);
        return {
          id: findUserWithTheEmail.id.toString(),
          name: findUserWithTheEmail.name,
          email: findUserWithTheEmail.email,
        };
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "test",
  // adapter: PrismaAdapter(client),
  callbacks: {
    // async jwt({ token, user }:any) {
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },
    async session({ token, session }: any) {
      session.user.id = token.sub
      return session
  }
  },
};
