import { formBaseUrl } from '@/constants'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Interface for University data
export interface University {
	_id: string
	universityName: string
}

// University slice initial state
interface UniversityState {
	data: University[]
	loading: boolean
}

// Initial state for the university slice
const initialState: UniversityState = {
	data: [],
	loading: false,
}

// Async thunk for fetching university data
export const fetchUniversity = createAsyncThunk<
	University[],
	void,
	{ rejectValue: string }
>('form/fetchUniversity', async (_, thunkAPI) => {
	try {
		const response = await axios.get<University[]>(
			`https://crm.internationaleducationoffice.co.uk/universities/all/university`
		)
		return response.data
	} catch (error) {
		return thunkAPI.rejectWithValue('Failed to fetch universities.')
	}
})

// University slice
export const universitySlice = createSlice({
	name: 'university',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUniversity.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchUniversity.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchUniversity.rejected, (state) => {
				state.loading = false
			})
	},
})

// Export the reducer
export default universitySlice.reducer
