import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../thunks/userThunk';
import { RootState } from '../store';

const initialState = {
    user: null,
    status: 'idle',
    message: '',
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload as any;
                state.status = 'succeeded';
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.message = action.payload ?? action.error as any;
                state.status = 'error';
            })
    }
})

export const user = (state: RootState) => state.user?.user
export default userSlice.reducer;
