import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    submit() {
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    //data posted to server
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
                {this.state.error && (
                    <div className="error">Oops! Something went wrong.</div>
                )}
                <label>
                    First name:
                    <input
                        name="first"
                        placeholder="First name"
                        type="text"
                        onChange={e => this.handleChange(e.target)}
                    />
                </label>
                <label>
                    Last name:
                    <input
                        name="last"
                        placeholder="Last name"
                        type="text"
                        onChange={e => this.handleChange(e.target)}
                    />
                </label>
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
                <div>
                    <h5>
                        Already a member? <Link to="/login">Log In</Link>
                    </h5>
                </div>
            </div>
        );
    }
}