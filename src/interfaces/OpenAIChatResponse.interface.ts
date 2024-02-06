export interface OpenAIChatResponse{
    id: string,
    object: string,
    created: number,
    model: string,
    choices: OpenAIChatChoiceResponse[],
    usage: {
        prompt_tokens: number,
        completion_tokens: number,
        total_tokens: number
    },
    system_fingerprint: null
};

export interface OpenAIChatChoiceResponse{
    index: number,
    message: {
        role: string,
        content: string,
    },
    logprobs: string,
    finish_reason: string
};