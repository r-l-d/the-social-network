import React from "react";
import axios from "./axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import Input from "@material-ui/core/Input";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        var fd = new FormData();
        fd.append("file", this.file);
        axios
            .post("/upload", fd)
            .then(({ data }) => {
                this.props.uploadImage(data.imgUrl);
            })
            .catch(() => {
                this.setState({
                    error: true
                });
            });
    }

    handleChange(e) {
        this.file = e.target.files[0];
    }

    render() {
        return (
            <div>
                <Typography variant="h6">Upload a profile picture</Typography>
                {this.state.error && (
                    <Typography className="error">
                        Oops! Something went wrong.
                    </Typography>
                )}

                <Input
                    onChange={e => this.handleChange(e)}
                    type="file"
                    name="file"
                    accept="image/*"
                />

                <DialogActions>
                    <Button
                        color="primary"
                        onClick={e => this.props.toggleModal(e)}
                    >
                        Cancel
                    </Button>
                    <Button color="primary" onClick={e => this.handleClick(e)}>
                        SUBMIT
                    </Button>
                </DialogActions>
            </div>
        );
    }
}

// <button  click.prevent.default='handleClick'>Submit</button>
// <div v-if='error'>Looks like something went wrong. Please try again!</div>
