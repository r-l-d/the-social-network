import React from "react";
import Register from "./registration";
import Logo from "./logo";

//this has some text, the logo, and the registration component in it
export default function Welcome() {
    return (
        <div>
            <Logo />
            <h1>THE SOCIAL NETWORK</h1>
            <Register />
        </div>
    );
}
