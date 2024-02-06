import { ActionReducerMapBuilder, PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { UserCredentials } from "../../interfaces/UserCredentials.interface";
import { Status } from "../../contants/enums/Status.enum";
import LoginSlice from "./loginSlice.interface";
import loginResponseMiddleware from './loginMiddlware';

const initialState: LoginSlice = {
    userCredetials: {
        email: '',
        password: ''
    },
    userAuth: {
        tokenValue: undefined,
        status: Status.PENDING,
        error: ''
    }
};

export const loginSlice: Slice = createSlice({
    name: "loginSlice",
    initialState,
    reducers: {
        setUserCredetialsInput(state,action: PayloadAction<UserCredentials>) {
            return {
                ...state,
                userCredetials: {
                    email: action.payload.email,
                    password: action.payload.password
                }
            }
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<LoginSlice>)=> {
        builder.addCase( loginResponseMiddleware.pending, (state) => {
            return {
                ...state,
                userAuth: {
                    tokenValue: undefined,
                    status: Status.PENDING as Status,
                    error: ''
                }
            }
        }).addCase( loginResponseMiddleware.rejected, (state, action) => {
            return {
                ...state,
                userAuth: {
                    tokenValue: undefined,
                    status: Status.FAILED as Status,
                    error: action.error.message as string
                }
            }
        }).addCase( loginResponseMiddleware.fulfilled, (state, action) => {
            return {
                ...state,
                userAuth: {
                    tokenValue: action.payload,
                    status: Status.SUCCESS as Status,
                    error: ''
                }
            }
        })
    },

});

export default loginSlice.reducer;  
export const { setUserCredetialsInput } = loginSlice.actions;

export const selectUserAuth = (state: any) => state.loginSlice.userAuth