import { configureStore  } from "@reduxjs/toolkit";
import { chatSlice } from "./chatStore/chatSlice";
import { loginSlice } from "./loginSlice/loginSlice";
import { registerSlice } from "./registerSlice/registerSlice";

const store = configureStore({
    reducer:{
        loginSlice: loginSlice.reducer,
        registerSlice: registerSlice.reducer,
        chatSlice: chatSlice.reducer,
    },
});

export default store;