import React from "react";
import Registration from "./registration";
import Logo from "./logo";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";

//this has some text, the logo, and the registration component in it
export default function Welcome() {
    return (
        <div>
            <Logo />
            <h1>THE SOCIAL NETWORK</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
