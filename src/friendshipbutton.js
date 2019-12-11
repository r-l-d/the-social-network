import React, { useState, useEffect } from "react";
import axios from "./axios";
import Button from "@material-ui/core/Button";
import { socket } from "./socket";

export default function Friendshipbutton({ otherId }) {
    const [buttonText, setButtonText] = useState();

    useEffect(() => {
        axios.get(`/friendshipstatus/${otherId}`).then(resp => {
            setButtonText(resp.data.buttonText);
        });
    }, []);

    function submit() {
        console.log("clicked on the button: ", buttonText);
        axios
            .post(`/update-friendship/${otherId}`, {
                buttonText: buttonText
            })
            .then(resp => {
                setButtonText(resp.data.buttonText);
                if (resp.data.buttonText == "Cancel Friend Request") {
                    console.log("new friend request received for: ", otherId);
                    socket.emit("New Friend Request", otherId);
                }
            });
    }

    return (
        <div>
            <Button
                className="btn"
                onClick={submit}
                variant="contained"
                color="primary"
                size="small"
            >
                {buttonText}
            </Button>
        </div>
    );
}
