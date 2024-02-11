import { formBaseUrl } from '@/constants'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Interface for Region data
export interface Region {
	_id: string
	name: string
	urlName: string
	data: {
		name: string
		_id: string
		country?: string
		region?: string
	}[]
}

// Region slice initial state
interface RegionState {
	data: RegionData[] // Update data type to match RegionData[]
	loading: boolean
}

// Define RegionData interface
interface RegionData {
	name: string
	country: string
}

// Initial state for Region slice
const initialState: RegionState = {
	data: [],
	loading: false,
}

// Async thunk for fetching Region data
export const fetchRegion = createAsyncThunk<
	RegionData[],
	void,
	{ rejectValue: string }
>('form/Region', async (_, thunkAPI) => {
	try {
		const response = await axios.get<Region>(`${formBaseUrl}/region`)
		const data = response.data
		const RegionNamesWithCountry: RegionData[] =
			data?.data.map((item) => ({
				name: item.name,
				country: item.country || '',
			})) || []
		return RegionNamesWithCountry
	} catch (error) {
		return thunkAPI.rejectWithValue('Failed to fetch Regions.')
	}
})

// Region slice
export const regionSlice = createSlice({
	name: 'region',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRegion.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchRegion.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchRegion.rejected, (state) => {
				state.loading = false
			})
	},
})

export default regionSlice.reducer
