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
        // console.log("scroll top: ", elemRef.current.scrollTop);
        // console.log("clientHeight: ", elemRef.current.clientHeight);
        // console.log("scrollHeight: ", elemRef.current.scrollHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = e => {
        if (e.key == "Enter") {
            // console.log("e.target.value: ", e.target.value);
            // console.log("e.key: ", e.key);
            socket.emit("New Message", e.target.value);
            e.target.value = "";
        }
    };

    // console.log("chatMessages in Chat: ", chatMessages);

    return (
        <div>
            <Typography variant="h3">Chat Room</Typography>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(msg => (
                        <div key={msg.msg_id}>
                            <img
                                className={classes.image}
                                src={msg.image_url}
                            />
                            <div>
                                <Typography variant="body1">
                                    {msg.first} {msg.last}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="h6">
                                    {msg.message}
                                </Typography>
                            </div>
                            <Typography variant="body2">
                                {msg.created_at}
                            </Typography>
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
