import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            buttonText: "Edit Bio"
        };
        this.toggleEditing = this.toggleEditing.bind(this);
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
        axios
            .post("/bio", {
                bio: this.state.bio
            })
            .then(({ data }) => {
                this.props.refreshBio(data.bio);
                this.setState({
                    editingMode: false
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
        this.setState({
            editingMode: true
        });
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
                    <button onClick={e => this.handleClick(e)}>Save</button>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Bio editor</h1>
                    <div>{this.props.bio}</div>
                    <button onClick={this.toggleEditing}>
                        {this.state.buttonText}
                    </button>
                </div>
            );
        }
    }
}
//add onclick to edit bio button that changes state of
//editingMode to true
