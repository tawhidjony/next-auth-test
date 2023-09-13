import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId:"1151127421882478662",
      clientSecret:"FzZgpjG6JyZUTZ6A4A2lhBaOk55a0oYi"
    })
  ],

})