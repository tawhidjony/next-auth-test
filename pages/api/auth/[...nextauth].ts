import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({

  providers: [
    Providers.Discord({
      clientId:process.env.DISCORD_CLIENT_ID,
      clientSecret:process.env.DISCORD_CLIENT_SECRET
    }),
  ],
  callbacks: {
    async redirect(url, baseUrl) {
      console.log('url', url);
      console.log('baseUrl', baseUrl);
      console.log('url.startsWith(baseUrl) ? url : baseUrl', url.startsWith(baseUrl) ? baseUrl : url);
      
      return url.startsWith(baseUrl) ? baseUrl : url
      }
  }
})