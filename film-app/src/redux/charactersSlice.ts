import { createSlice } from "@reduxjs/toolkit";
import { fetchCharacters } from "../api/service";

export const charactersSlice = createSlice({
    name: "characters",
    initialState: {
        items: [] as any[],
        isLoading: false,
        error: null,
        page: 0,
        hasNextPage: true,
    },
    reducers: {},
    extraReducers: {
        [fetchCharacters.pending as any]: (state, action) => {
            state.isLoading = true;
        },
        [fetchCharacters.fulfilled as any]: (state, action) => {
            state.isLoading = false;
            state.items = [...state.items, ...action.payload];
            state.page += 1;
            if (action.payload < 12) {
                state.hasNextPage = false;
            }
        },
        [fetchCharacters.rejected as any]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
    }
});

export default charactersSlice.reducer;