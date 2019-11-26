import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import Register from "./registration";

let elem = <Welcome />;

if (location.pathname != "/welcome") {
    elem = (
        <div>
            <img src="/assets/logo.png" alt="logo" />
            <h1>You are logged in!</h1>
        </div>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
