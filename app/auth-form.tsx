'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeMinimal, ThemeSupa } from '@supabase/auth-ui-shared'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from './database.types'
import { SocialAuth } from '@supabase/auth-ui-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function AuthForm() {
  const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	)
	const router = useRouter()

	supabase.auth.onAuthStateChange((event, session) => {
		if (event === 'SIGNED_IN') {
			router.push('/')
		}
	})

	return (
		<SocialAuth
			supabaseClient={supabase}
			appearance={{ theme: ThemeSupa }}
			providers={['google']}
			redirectTo='/'
			queryParams={
				{
					access_type: 'offline',
					prompt: 'consent',	
				}
			}
		/>
	)
}