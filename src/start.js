import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Logo from "./logo";

let elem = <Welcome />;

if (location.pathname != "/welcome") {
    elem = (
        <div>
            <Logo />
            <h1>You are logged in!</h1>
        </div>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
