import { useAuthContext } from '@/common'
import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { User } from '@/types'
import axios from 'axios'
import { baseUrl } from '@/constants'

export default function useLogin() {
	const [loading, setLoading] = useState(false)
	const location = useLocation()

	const { isAuthenticated, saveSession } = useAuthContext()

	const redirectUrl = useMemo(
		() =>
			location.state && location.state.from
				? location.state.from.pathname
				: '/',
		[location.state]
	)

	const login = async ({ email, password }: User) => {
		setLoading(true)
		try {
			const data = {
				email,
				password,
			}
			const response = await axios.post(`${baseUrl}/members/login`, data)
			if (response) {
				console.log(response)

				saveSession({
					...(response.data.user ?? {}),
					token: response.data.token,
				})
			}
		} finally {
			setLoading(false)
		}
	}

	return { loading, login, redirectUrl, isAuthenticated }
}
