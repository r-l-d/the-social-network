import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import MenuAppBar from "./appbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

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
                    console.log("data posted to server");
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
        console.log(
            "input field changed: ",
            inputElement.name,
            inputElement.value
        );
        this.setState({
            [inputElement.name]: inputElement.value
        });
    }
    render() {
        return (
            <div>
                <MenuAppBar />
                <Container maxWidth="lg">
                    <Typography className="title1" variant="h4">
                        Register
                    </Typography>

                    {this.state.error && (
                        <div className="error">Oops! Something went wrong.</div>
                    )}
                    <div className="flex">
                        <TextField
                            required
                            label="First Name"
                            name="first"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={e => this.handleChange(e.target)}
                        />
                        <TextField
                            required
                            name="last"
                            label="Last name"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={e => this.handleChange(e.target)}
                        />

                        <TextField
                            required
                            name="email"
                            label="Email"
                            type="email"
                            margin="normal"
                            variant="outlined"
                            onChange={e => this.handleChange(e.target)}
                        />
                        <TextField
                            required
                            name="password"
                            label="Password"
                            type="password"
                            margin="normal"
                            variant="outlined"
                            onChange={e => this.handleChange(e.target)}
                        />
                    </div>
                    <Button
                        onClick={e => this.submit(e)}
                        color="primary"
                        variant="contained"
                    >
                        SUBMIT
                    </Button>
                    <div>
                        <Typography variant="subtitle1">
                            Already registered?
                        </Typography>
                        <Link to="/login">
                            <Button variant="contained">Log In</Button>
                        </Link>
                    </div>
                </Container>
            </div>
        );
    }
}
