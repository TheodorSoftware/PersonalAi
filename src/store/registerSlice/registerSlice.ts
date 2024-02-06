import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { RegisterUserData } from "../../interfaces/RegisterUserData.interface";
import RegisterSlice from "./registerSlice.interface";

const initialState: RegisterSlice = {
    registerData: {
        name: '',
        email: '',
        password: ''
    }
};

export const registerSlice: Slice = createSlice({
    name: "registerSlice",
    initialState,
    reducers: {
        setUserRegisterData(state, action: PayloadAction<RegisterUserData>){
            return {
                ...state,
                registerData: {
                    name: action.payload.name,
                    email: action.payload.email,
                    password: action.payload.password
                }
            }
        }
    }
});

export default registerSlice.reducer;

export const { setUserRegisterData } = registerSlice.actions