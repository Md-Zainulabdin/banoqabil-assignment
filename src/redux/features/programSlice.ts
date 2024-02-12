import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Interface for Program data
export interface Program {
	_id: string
	name: string
	university: {
		_id: string
		universityName: string
	}
	programType: {
		_id: string
		name: string
		graduate: string
	}
	campus: {
		_id: string
		name: string
	}
	startDate: {
		startMonth: string
		startYear: string
		_id: string
	}[]
}

// Program slice initial state
interface ProgramState {
	data: Program[]
	loading: boolean
}

// Initial state for the program slice
const initialState: ProgramState = {
	data: [],
	loading: false,
}

// Async thunk for fetching program data
export const fetchPrograms = createAsyncThunk<
	Program[],
	void,
	{ rejectValue: string }
>('form/fetchPrograms', async (_, thunkAPI) => {
	try {
		const response = await axios.get<Program[]>(
			`https://crm.internationaleducationoffice.co.uk/programs/limited`
		)
		return response.data
	} catch (error) {
		return thunkAPI.rejectWithValue('Failed to fetch programs.')
	}
})

// Program slice
export const programSlice = createSlice({
	name: 'program',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPrograms.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchPrograms.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchPrograms.rejected, (state) => {
				state.loading = false
			})
	},
})

// Export the reducer
export default programSlice.reducer
