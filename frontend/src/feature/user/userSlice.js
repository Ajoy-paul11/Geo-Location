import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: {},
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
        },
        logout: (state) => {
            state.currentUser = {};

        }
    }
})


export const { login, logout } = userSlice.actions;
export default userSlice.reducer;