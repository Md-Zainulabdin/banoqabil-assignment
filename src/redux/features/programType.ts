import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Interface for Program Type
export interface ProgramType {
	_id: string
	name: string
	graduate: string
	urlName: string
}

// ProgramType slice initial state
interface ProgramTypeState {
	data: ProgramType[]
	loading: boolean
}

// Initial state for the program type slice
const initialState: ProgramTypeState = {
	data: [],
	loading: false,
}

// Async thunk for fetching program type data
export const fetchProgramTypes = createAsyncThunk<
	ProgramType[],
	void,
	{ rejectValue: string }
>('form/fetchProgramTypes', async (_, thunkAPI) => {
	try {
		const response = await axios.get<ProgramType[]>(
			`https://crm.internationaleducationoffice.co.uk/programTypes`
		)
		return response.data
	} catch (error) {
		return thunkAPI.rejectWithValue('Failed to fetch program types.')
	}
})

// ProgramType slice
export const programTypeSlice = createSlice({
	name: 'programType',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProgramTypes.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchProgramTypes.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchProgramTypes.rejected, (state) => {
				state.loading = false
			})
	},
})

// Export the reducer
export default programTypeSlice.reducer
