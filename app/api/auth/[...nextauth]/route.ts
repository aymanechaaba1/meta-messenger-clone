import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // CredentailsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     username: {
    //       label: 'Username',
    //       type: 'text',
    //     },
    //     email: {
    //       label: 'Email',
    //       type: 'email',
    //     },
    //     password: {
    //       label: 'Password',
    //       type: 'password',
    //     },
    //     profile_pic: {
    //       label: 'Profile Pic',
    //       type: 'text',
    //     },
    //   },
    //   // @ts-ignore
    //   async authorize(credentials) {
    //     const user = {
    //       username: 'Sonny Sangha',
    //       email: 'contact@sonnysangha.com',
    //       password: 'Sonny**123',
    //       profile_pic:
    //         'https://yt3.googleusercontent.com/FjeN785fVWx0Pr6xCbwPhhq8hHj_gocc3FygDXYDEQgp2gE_FQzRNsFHFAjQ3oE-VJaeGR1a=s176-c-k-c0x00ffffff-no-rj',
    //     };

    //     if (
    //       credentials?.email === user.email &&
    //       credentials?.password === user.password
    //     )
    //       return user;
    //     else return null;
    //   },
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
