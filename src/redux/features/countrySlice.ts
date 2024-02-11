import { formBaseUrl } from '@/constants'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Interface for Country data
export interface Country {
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

// Country slice initial state
interface CountryState {
	data: string[]
	loading: boolean
}

// Initial state for both slices
const initialState: CountryState = {
	data: [],
	loading: false,
}

// Async thunk for fetching country data
export const fetchCountry = createAsyncThunk<
	string[],
	void,
	{ rejectValue: string }
>('form/fetchCountry', async (_, thunkAPI) => {
	try {
		const response = await axios.get<Country>(`${formBaseUrl}/country`)
		const data = response.data
		const countryNames = data?.data.map((item) => item.name) || []
		return countryNames
	} catch (error) {
		return thunkAPI.rejectWithValue('Failed to fetch countries.')
	}
})

// Country slice
export const countrySlice = createSlice({
	name: 'country',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCountry.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchCountry.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchCountry.rejected, (state) => {
				state.loading = false
			})
	},
})

// Redux actions
export default countrySlice.reducer
