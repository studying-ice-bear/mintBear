import { SERVER_URL } from "@/api/imageParse";
import { authPages } from "@/config/pages";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  pages: authPages,
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Sigin in with",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "please enter your username",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const bodyData = JSON.stringify({
          username: credentials?.username,
          password: credentials?.password,
        });
        const res = await fetch(`${SERVER_URL}/v1/members/sign-in`, {
          method: "POST",
          body: bodyData,
          headers: { "Content-Type": "application/json" },
        });
        // If no error and we have user data, return it
        if (res.ok) {
          const user = await res.json();
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  debug: process.env.NODE_ENV !== "production",
});

export { handler as GET, handler as POST };
