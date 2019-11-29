import React from "react";
import axios from "./axios";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            buttonText: "Edit Bio"
        };
        this.toggleEditing = this.toggleEditing.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        console.log("props in BioEditor: ", this.props);
        if (!this.props.bio) {
            console.log("no bio");
            this.setState(
                {
                    buttonText: "Add your bio"
                },
                () => console.log("this.state: ", this.state)
            );
        }

        //run componentDidMount and look at Bio prop to see if bio already exists. If bio is undefined or null, there is no profile. If it is a string, they already have a bio. Based on that, set the state of buttonText
    }

    handleClick() {
        console.log("this.state: ", this.state);
        axios
            .post("/bio", {
                bio: this.state.bio
            })
            .then(({ data }) => {
                this.props.refreshBio(data.bio);
                this.toggleEditing();
                this.state.bio &&
                    this.setState({
                        buttonText: "Edit bio"
                    });
                !this.state.bio &&
                    this.setState({
                        buttonText: "Add a bio"
                    });
            })
            .catch(() => {
                this.setState({
                    error: true
                });
            });
    }

    handleChange(inputElement) {
        this.setState({
            bio: inputElement.value
        });
    }

    toggleEditing() {
        if (this.state.editingMode) {
            console.log("editing mode turned off");
            this.setState({
                editingMode: false
            });
        } else {
            console.log("editing mode turned on");
            this.setState({
                editingMode: true
            });
        }
    }

    render() {
        if (this.state.editingMode) {
            return (
                <div>
                    <h1>Bio editing mode</h1>
                    <textarea
                        onChange={e => this.handleChange(e.target)}
                        defaultValue={this.props.bio}
                    />
                    {this.state.error && (
                        <div className="error">Oops! Something went wrong.</div>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleClick}
                    >
                        Save
                    </Button>
                    <Button variant="contained" onClick={this.toggleEditing}>
                        Cancel
                    </Button>
                </div>
            );
        } else {
            return (
                <div>
                    <Typography variant="h4">Bio editor</Typography>
                    <Typography variant="body1">{this.props.bio}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.toggleEditing}
                    >
                        {this.state.buttonText}
                    </Button>
                </div>
            );
        }
    }
}
//add onclick to edit bio button that changes state of
//editingMode to true
