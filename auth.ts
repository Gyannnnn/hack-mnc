// auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod/zod";
import axios from "axios";
import { signInResponse } from "./types/type";

const AUTH_GOOGLE_ID = process.env.AUTH_GOOGLE_ID
const AUTH_GOOGLE_SECRET = process.env.AUTH_GOOGLE_SECRET

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt"
  },
  providers: [
    Google({
      clientId: AUTH_GOOGLE_ID!,
      clientSecret: AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          
          
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const validatedCredentials = await signInSchema.parseAsync({
            email: credentials.email,
            password: credentials.password
          });

         
          
          const res = await axios.post<signInResponse>("https://api.hackmnc.com/api/v1/auth/signin", {
            email: validatedCredentials.email,
            password: validatedCredentials.password,
          });

          

          const responseData = res.data;
          
          if (!responseData.success) {
            return null;
          }

          const userData = responseData.data.user;
          const token = responseData.data.token;

   

          if (!userData || !token) {
           
            return null;
          }

          
          return {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            image: userData.image,
            streak: userData.streak,
            emailVerified: userData.emailVerified,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
            accessToken: token,
          };
        } catch (error: any) {
          console.error("Authorization error:", error.response?.data || error.message);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
     

      if (user) {
        
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken; 
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        
    
        if (account?.provider === "google" && account?.access_token) {
          try {
           
            const res = await axios.post("https://api.hackmnc.com/api/v1/auth/signin/google", {
              accessToken: account.access_token,
            });
            
           
            
            const backendData = res.data.data || res.data;
            const backendUser = backendData.user;
            const backendToken = backendData.token;
            
            if (backendUser && backendToken) {
              token.id = backendUser.id;
              token.role = backendUser.role;
              token.accessToken = backendToken;
              token.name = backendUser.name;
              token.email = backendUser.email;
              token.image = backendUser.image;
            }
          } catch (error: any) {
            console.error("Error communicating with backend for Google auth:", error.response?.data || error.message);
          }
        }
      }
      
    
      return token;
    },
    async session({ session, token }) {
     
      
      // Only set properties that exist in the token
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.accessToken = token.accessToken as string;
      }
      
      
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  // debug: process.env.NODE_ENV === 'development',
});