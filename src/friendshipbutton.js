import React, { useState, useEffect } from "react";
import axios from "./axios";
import Button from "@material-ui/core/Button";
import { socket } from "./socket";

export default function Friendshipbutton(props) {
    const [buttonText, setButtonText] = useState();

    useEffect(() => {
        console.log("props in friendshipbutton: ", props);
        axios.get(`/friendshipstatus/${props.otherId}`).then(resp => {
            setButtonText(resp.data.buttonText);
        });
    }, []);

    if (props.id == props.otherId) {
        return null;
    }
    function submit() {
        console.log("clicked on the button: ", buttonText);
        axios
            .post(`/update-friendship/${props.otherId}`, {
                buttonText: buttonText
            })
            .then(resp => {
                setButtonText(resp.data.buttonText);
                if (resp.data.buttonText == "Cancel Friend Request") {
                    console.log(
                        "new friend request received for: ",
                        props.otherId
                    );
                    socket.emit("New Friend Request", props.otherId);
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
