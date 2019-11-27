import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(() => {
                this.setState({
                    error: true
                });
            });
    }

    handleChange(inputElement) {
        this.setState({
            [inputElement.name]: inputElement.value
        });
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                {this.state.error && (
                    <div className="error">Oops! Something went wrong.</div>
                )}
                <label>
                    Email:
                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        onChange={e => this.handleChange(e.target)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={e => this.handleChange(e.target)}
                    />
                </label>
                <button onClick={e => this.submit(e)}>SUBMIT</button>
                <Link to="/">To Register</Link>
            </div>
        );
    }
}
