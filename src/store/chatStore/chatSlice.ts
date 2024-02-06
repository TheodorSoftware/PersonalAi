import { ActionReducerMapBuilder, Slice, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import { Status } from "../../contants/enums/Status.enum";
import { OpenAIChatResponse } from "../../interfaces/OpenAIChatResponse.interface";

export interface ChatDataType{
    inputFromClient: string,
    responseFromAi: {
        responseValue: OpenAIChatResponse | null,
        status: Status,
        error: string
    },
}

interface ChatSlice{
    chatStore: ChatDataType[];
}

const initialState: ChatSlice = {
    chatStore: []
}

export const chatSlice: Slice = createSlice({
    name: "chatSlice",
    initialState,
    reducers:{
        getInputFromClient(state, action) {
            return {
                ...state,
                chatStore: [...state.chatStore, {
                    inputFromClient: action.payload,
                    responseFromAi: {
                        responseValue: '',
                        status: Status.PENDING as Status,
                        error: ''
                    }
                }]
            }
        }
    },
    extraReducers(builder: ActionReducerMapBuilder<ChatSlice>){
        builder.addCase(fetchAIResponse.pending, (state) => {
            state.chatStore[state.chatStore.length - 1] = {
                ...state.chatStore[state.chatStore.length - 1],
                responseFromAi: {
                    responseValue: null,
                    status: Status.PENDING,
                    error: ''
                }
            }
        }).addCase(fetchAIResponse.rejected, (state, action) => {
            state.chatStore[state.chatStore.length - 1] = {
                ...state.chatStore[state.chatStore.length - 1],
                responseFromAi: {
                    responseValue: null,
                    status: Status.FAILED,
                    error: action.error.message as string
                }
            }
        }).addCase(fetchAIResponse.fulfilled, (state, action) => {
            state.chatStore[state.chatStore.length - 1] = {
                ...state.chatStore[state.chatStore.length - 1],
                responseFromAi: {
                    responseValue: action.payload,
                    status: Status.SUCCESS,
                    error: ''
                }
            }
        })
    },
});

export const fetchAIResponse =  createAsyncThunk('chat/postChatResponse', async (clientInput: string) => {
    const response: AxiosResponse<OpenAIChatResponse> = await axios.post('/chat/talk', {
        clientInput
    });
    return response.data;
});

export const { getInputFromClient } = chatSlice.actions;

export const selectChat = (state: { chatSlice: ChatSlice}) => state.chatSlice.chatStore;