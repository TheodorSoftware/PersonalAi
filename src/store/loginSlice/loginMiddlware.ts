import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { UserCredentials } from "../../interfaces/UserCredentials.interface";
import { setUserCredetialsInput } from "./loginSlice";

const loginResponseMiddleware = createAsyncThunk('/login/postLogin', async ( userCredentials: UserCredentials, { dispatch }) => {

    dispatch(setUserCredetialsInput(userCredentials));

    const response: AxiosResponse<any> = await axios.post('http://localhost:8081/auth/login', userCredentials);
    return response.data;
})

export default loginResponseMiddleware;