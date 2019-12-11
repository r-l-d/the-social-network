import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import { borders } from "@material-ui/system";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { display } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

// const useStyles = makeStyles({
//     image: {
//         height: 40
//     }
// });

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 2),
        margin: 10
    },
    image: {
        height: 70,
        width: 70
    },
    chatContainer: {
        background: "lightgrey",
        height: 600,
        overflow: "scroll",
        width: "70%",
        border: 1,
        borderColor: "black"
    },
    paperComponent: {
        marginLeft: 10
    },
    chatField: {
        width: "70%",
        marginTop: 10
    }
}));

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
            <Container maxWidth="m">
                <Typography variant="h3">Chat Room</Typography>

                <div ref={elemRef} className={classes.chatContainer}>
                    {chatMessages &&
                        chatMessages.map(msg => (
                            <Paper
                                component="div"
                                display="flex"
                                className={classes.root}
                                key={msg.msg_id}
                            >
                                <Box display="flex" alignItems="center">
                                    <div>
                                        <Link to={`/user/${msg.id}`}>
                                            <img
                                                className={classes.image}
                                                src={msg.image_url}
                                            />
                                        </Link>
                                    </div>
                                    <div className={classes.paperComponent}>
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
                                            {moment(msg.created_at).calendar()}
                                        </Typography>
                                    </div>
                                </Box>
                            </Paper>
                        ))}
                </div>
                <TextField
                    className={classes.chatField}
                    id="outlined-multiline-static"
                    label="Chat"
                    multiline
                    rows="4"
                    variant="outlined"
                    onKeyUp={keyCheck}
                    placeholder="Press Enter to Send"
                />
            </Container>
        </div>
    );
}
