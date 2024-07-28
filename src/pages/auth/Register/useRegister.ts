import { authApi } from '@/common/api'
import { useAuthContext } from '@/common/context'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useRegister() {
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const { isAuthenticated } = useAuthContext()

	const register = async ({
		name,
		email,
		password1,
	}: {
		name: string
		email: string
		password1: string
	}) => {
		setLoading(true)
		try {
			const { data } = await authApi.register({
				name,
				email,
				password: password1,
			})
			if (data?.id) {
				navigate('/')
			}
		} catch (error) {
			console.error('Registration failed:', error)
			// Check if error is an instance of Error and has a 'data' property
			if (typeof error === 'object' && error !== null && 'data' in error) {
				// Handle the error knowing it has a 'data' property
			} else {
				console.error(
					'Error does not contain data property or is not an object'
				)
			}
		} finally {
			setLoading(false)
		}
	}

	return { loading, register, isAuthenticated }
}
