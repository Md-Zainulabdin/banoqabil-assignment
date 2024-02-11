import { formBaseUrl } from '@/constants'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Interface for Qualification data
export interface Qualification {
	_id: string
	name: string
	urlName: string
	data: {
		name: string
	}[]
}

// Define QualificationData interface
interface QualificationData {
	name: string
}

// Qualification slice initial state
interface QualificationState {
	data: QualificationData[]
	loading: boolean
}

// Initial state for the qualification slice
const initialState: QualificationState = {
	data: [],
	loading: false,
}

// Async thunk for fetching qualification data
export const fetchQualification = createAsyncThunk<
	QualificationData[],
	void,
	{ rejectValue: string }
>('form/fetchQualification', async (_, thunkAPI) => {
	try {
		const response = await axios.get<Qualification>(
			`${formBaseUrl}/qualifications`
		)
		const data = response.data
		const qualifications: QualificationData[] =
			data?.data.map((item) => ({
				name: item.name,
			})) || []
		return qualifications
	} catch (error) {
		return thunkAPI.rejectWithValue('Failed to fetch qualifications.')
	}
})

// Qualification slice
export const qualificationSlice = createSlice({
	name: 'qualification',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchQualification.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchQualification.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchQualification.rejected, (state) => {
				state.loading = false
			})
	},
})

// Export the reducer
export default qualificationSlice.reducer
