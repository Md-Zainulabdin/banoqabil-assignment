import { baseUrl } from '@/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const universityGuideApi = createApi({
	reducerPath: 'University Guide',
	baseQuery: fetchBaseQuery({
		baseUrl: `${baseUrl}`,
	}),
	endpoints: (builder) => ({
		getUniversity: builder.query({
			query: () => `universities`,
		}),
	}),
})

export const { useGetUniversityQuery } = universityGuideApi
