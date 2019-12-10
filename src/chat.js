import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    image: {
        height: 40
    }
});

export function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);
    const elemRef = useRef();
    const classes = useStyles();

    useEffect(() => {
        // console.log("Chat mounted");
        // console.log("elemRef.current: ", elemRef.current);
        console.log("scroll top: ", elemRef.current.scrollTop);
        console.log("clientHeight: ", elemRef.current.clientHeight);
        console.log("scrollHeight: ", elemRef.current.scrollHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    const keyCheck = e => {
        if (e.key == "Enter") {
            console.log("e.target.value: ", e.target.value);
            console.log("e.key: ", e.key);
            socket.emit("New Message", e.target.value);
            e.target.value = "";
        }
    };

    console.log("chatMessages in Chat: ", chatMessages);

    return (
        <div>
            <h1>Chat Room</h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages.map(msg => (
                    <div key={msg.msg_id}>
                        <img className={classes.image} src={msg.image_url} />
                        {msg.first} {msg.last}
                        {msg.message}
                        {msg.created_at}
                    </div>
                ))}
            </div>
            <textarea
                placeholder="Write your chat here"
                onKeyUp={keyCheck}
            ></textarea>
        </div>
    );
}
