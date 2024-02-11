import { formBaseUrl } from '@/constants'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Interface for English Test data
export interface EnglishTest {
	_id: string
	name: string
	urlName: string
	data: {
		name: string
	}[]
}

// Define EnglishTestData interface
interface EnglishTestData {
	name: string
}

// EnglishTest slice initial state
interface EnglishTestState {
	data: EnglishTestData[]
	loading: boolean
}

// Initial state for the English test slice
const initialState: EnglishTestState = {
	data: [],
	loading: false,
}

// Async thunk for fetching English test data
export const fetchEnglishTest = createAsyncThunk<
	EnglishTestData[],
	void,
	{ rejectValue: string }
>('form/fetchEnglishTest', async (_, thunkAPI) => {
	try {
		const response = await axios.get<EnglishTest>(
			`${formBaseUrl}/english-tests`
		)
		const data = response.data
		const englishTests: EnglishTestData[] =
			data?.data.map((item) => ({
				name: item.name,
			})) || []
		return englishTests
	} catch (error) {
		return thunkAPI.rejectWithValue('Failed to fetch English tests.')
	}
})

// EnglishTest slice
export const englishTestSlice = createSlice({
	name: 'englishTest',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchEnglishTest.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchEnglishTest.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchEnglishTest.rejected, (state) => {
				state.loading = false
			})
	},
})

// Export the reducer
export default englishTestSlice.reducer
