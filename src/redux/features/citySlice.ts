import { formBaseUrl } from '@/constants'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Interface for City data
export interface City {
	_id: string
	name: string
	urlName: string
	data: {
		name: string
		_id: string
		country?: string
		province?: string
	}[]
}

// Define CityData interface
interface CityData {
	name: string
	country: string
	province: string
}

// City slice initial state
interface CityState {
	data: CityData[]
	loading: boolean
}

// Initial state for the city slice
const initialState: CityState = {
	data: [],
	loading: false,
}

// Async thunk for fetching city data
export const fetchCity = createAsyncThunk<
	CityData[],
	void,
	{ rejectValue: string }
>('form/fetchCity', async (_, thunkAPI) => {
	try {
		const response = await axios.get<City>(`${formBaseUrl}/city`)
		const data = response.data
		const CityNameWithCountry: CityData[] =
			data?.data.map((item) => ({
				name: item.name,
				country: item.country || '',
				province: item.province || '',
			})) || []
		return CityNameWithCountry
	} catch (error) {
		return thunkAPI.rejectWithValue('Failed to fetch cities.')
	}
})

// City slice
export const citySlice = createSlice({
	name: 'city',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCity.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchCity.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchCity.rejected, (state) => {
				state.loading = false
			})
	},
})

// Export the reducer
export default citySlice.reducer
