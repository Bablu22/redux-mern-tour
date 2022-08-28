import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        open: false,
        id: '',
    },
    reducers: {
        setOpen: (state, action) => {
            state.open = true,
                state.id = action.payload
        },
        setClose: (state) => {
            state.open = false
        }
    }
})

export const { setOpen, setClose } = modalSlice.actions

export default modalSlice.reducer