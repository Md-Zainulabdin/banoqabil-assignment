import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { agentsApi } from './api/AgentsApi'
import countrySlice from './features/countrySlice'
import provinceSlice from './features/provinceSlice'
import citySlice from './features/citySlice'
import regionSlice from './features/regionSlice'
import qualificationSlice from './features/qualificationSlice'
import lastInstitutionSlice from './features/lastInstitutionSlice'
import englishTestSlice from './features/englishTestSlice'
import universitySlice from './features/universtieSlice'
import programSlice from './features/programSlice'
import { universityGuideApi } from './api/UniversityGuideApi'
import  programTypeSlice  from './features/programType'

export const store = configureStore({
	reducer: {
		country: countrySlice,
		province: provinceSlice,
		city: citySlice,
		region: regionSlice,
		qualification: qualificationSlice,
		lastInstitution: lastInstitutionSlice,
		englishTests: englishTestSlice,
		university: universitySlice,
		program: programSlice,
		programType: programTypeSlice,
		[agentsApi.reducerPath]: agentsApi.reducer,
		[universityGuideApi.reducerPath]: universityGuideApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			agentsApi.middleware,
			universityGuideApi.middleware
		),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
