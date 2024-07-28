import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/auth/librarian/login',
				method: 'POST',
				body: credentials,
			}),
		}),
		register: builder.mutation({
			query: (credentials) => ({
				url: '/users/register',
				method: 'POST',
				body: credentials,
			}),
		}),
		getAuthUser: builder.query({
			query: (id) => ({
				url: `/users/${id}`,
			}),
		}),
	}),
})

export const { useLoginMutation, useRegisterMutation, useGetAuthUserQuery } =
	authApiSlice
