import { formBaseUrl } from '@/constants'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Interface for Last Institution data
export interface LastInstitution {
	_id: string
	name: string
	urlName: string
	data: {
		name: string
		country: string
	}[]
}

// Define LastInstitutionData interface
interface LastInstitutionData {
	name: string
	country: string
}

// LastInstitution slice initial state
interface LastInstitutionState {
	data: LastInstitutionData[]
	loading: boolean
}

// Initial state for the last institution slice
const initialState: LastInstitutionState = {
	data: [],
	loading: false,
}

// Async thunk for fetching last institution data
export const fetchLastInstitution = createAsyncThunk<
	LastInstitutionData[],
	void,
	{ rejectValue: string }
>('form/fetchLastInstitution', async (_, thunkAPI) => {
	try {
		const response = await axios.get<LastInstitution>(
			`${formBaseUrl}/last-institution`
		)
		const data = response.data
		const lastInstitutions: LastInstitutionData[] =
			data?.data.map((item) => ({
				name: item.name,
				country: item.country || '',
			})) || []
		return lastInstitutions
	} catch (error) {
		return thunkAPI.rejectWithValue('Failed to fetch last institutions.')
	}
})

// LastInstitution slice
export const lastInstitutionSlice = createSlice({
	name: 'lastInstitution',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLastInstitution.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchLastInstitution.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchLastInstitution.rejected, (state) => {
				state.loading = false
			})
	},
})

// Export the reducer
export default lastInstitutionSlice.reducer
