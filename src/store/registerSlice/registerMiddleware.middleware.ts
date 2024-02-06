import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterUserData } from "../../interfaces/RegisterUserData.interface";
import { setUserRegisterData } from "./registerSlice";
import axios, { AxiosResponse } from "axios";


const registerResponseMiddleware = createAsyncThunk('/register/postRegister', async ( registerData: RegisterUserData, {dispatch}) => {
    dispatch(setUserRegisterData(registerData));

    const response: AxiosResponse<any> = await axios.post('http://localhost:8081/auth/register',registerData );
    return response.data;
});

export default registerResponseMiddleware;
