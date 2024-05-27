import NextAuth, { CredentialsSignin } from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import prisma from "@/libs/prismadb"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcryptjs"


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Passoword",
                    type: "password"
                }
            },
            authorize: async (credentials) => {

                const email = credentials.email as string | undefined
                const password = credentials.password as string | undefined

                if (!email || !password) {
                    throw new Error("Credentials required....");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                })

                if (!user || !user.password) {
                    throw new Error("Invalid Credentials")
                }

                const isCorrectPassword = await bcrypt.compare(password, user.password)

                if (!isCorrectPassword) throw new CredentialsSignin("Passwords do not match");

                return user;
            },
        })
    ],
    pages: {
        signIn: "/"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,

})