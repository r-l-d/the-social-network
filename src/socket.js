import * as io from "socket.io-client";

import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("muffin", msg => {
            console.log("message from the front end: ", msg);
        });

        socket.on("chatMessages", msgs => {
            console.log("chatMessages: ", msgs);
            store.dispatch(chatMessages(msgs));
        });

        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
    }
};
