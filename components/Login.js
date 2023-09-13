import { signIn } from 'next-auth/client'

export default function Login() {
  return (
    <div>
      <button onClick={() => signIn('discord')}>Sign in with Discord</button>
    </div>
  )
}