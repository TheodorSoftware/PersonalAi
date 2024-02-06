import React from "react";
import './ChatText.scss';
import { ChatPageProps } from "../../ChatPageProps.interface";

const ChatText = (props: ChatPageProps) => {
    return (
        <React.Fragment>
            <div className="chatText">
                <p className='chatText__inputClient'>
                    { props.userInput }
                </p>
                <p className='chatText__gptResponse'>
                    { props.aiResponse }
                </p>
            </div>
        </React.Fragment>
    )
};

export default ChatText