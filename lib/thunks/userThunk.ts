import { getUser } from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(getUser, async () => {
    const response = await api.get(getUser);
    return response.data;
});

