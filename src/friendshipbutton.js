import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Friendshipbutton({ otherId }) {
    const [buttonText, setButtonText] = useState("here is the button text");

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
            });
    }

    return (
        <div>
            <button className="btn" onClick={submit}>
                {buttonText}
            </button>
        </div>
    );
}
