import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { UserCredentials } from "../../interfaces/UserCredentials.interface";
import { setEmailForRecoverPassword, setUserCredetialsInput } from "./loginSlice";

export const loginResponseMiddleware = createAsyncThunk('/login/postLogin', async ( userCredentials: UserCredentials, { dispatch }) => {

    dispatch(setUserCredetialsInput(userCredentials));

    const response: AxiosResponse<any> = await axios.post('http://localhost:8081/auth/login', userCredentials);
    return response.data;
})

export const recoverPasswordMiddleware = createAsyncThunk('/login/recoverPassword' , async (email: string, {dispatch}) => {
    dispatch(setEmailForRecoverPassword(email));
    
    const response: AxiosResponse<any> = await axios.post('http://localhost:8081/auth/login/forgotPassword', {email});
    return response.data;
})

