import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.token = action.payload;
        },
        setLogout: (state) => {
            state.token = null;
        },
    }
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;