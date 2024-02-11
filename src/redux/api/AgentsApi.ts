import { baseUrl } from '@/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const agentsApi = createApi({
	reducerPath: 'Agents List',
	baseQuery: fetchBaseQuery({
		baseUrl: `${baseUrl}`,
	}),
	endpoints: (builder) => ({
		getAgents: builder.query({
			query: ({ token, userId }) => ({
				url: `/applications/case/${userId}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),

		getAgentById: builder.query({
			query: ({ token, userId }) => ({
				url: `/applications/applicationById/${userId}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
	}),
})

export const { useGetAgentsQuery, useGetAgentByIdQuery } = agentsApi
