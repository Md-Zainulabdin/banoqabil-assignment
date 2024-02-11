import { formBaseUrl } from '@/constants'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Interface for Province data
export interface Province {
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

// Province slice initial state
interface ProvinceState {
	data: ProvinceData[] // Update data type to match ProvinceData[]
	loading: boolean
}

// Define ProvinceData interface
interface ProvinceData {
	name: string
	country: string
}

// Initial state for province slice
const initialState: ProvinceState = {
	data: [],
	loading: false,
}

// Async thunk for fetching province data
export const fetchProvince = createAsyncThunk<
	ProvinceData[],
	void,
	{ rejectValue: string }
>('form/fetchProvince', async (_, thunkAPI) => {
	try {
		const response = await axios.get<Province>(`${formBaseUrl}/province`)
		const data = response.data
		const provinceNamesWithCountry: ProvinceData[] =
			data?.data.map((item) => ({
				name: item.name,
				country: item.country || '',
			})) || []
		return provinceNamesWithCountry
	} catch (error) {
		return thunkAPI.rejectWithValue('Failed to fetch provinces.')
	}
})

// Province slice
export const provinceSlice = createSlice({
	name: 'province',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProvince.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchProvince.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchProvince.rejected, (state) => {
				state.loading = false
			})
	},
})

export default provinceSlice.reducer
