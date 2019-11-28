import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // componentDidMount() {
    //     console.log("uploader props: ", this.props);
    // }

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
                <h2>Uploader is here</h2>
                <h6>Upload an image</h6>
                {this.state.error && (
                    <div className="error">Oops! Something went wrong.</div>
                )}
                <a
                    href="javascript://"
                    onClick={e => this.props.toggleModal(false)}
                >
                    X
                </a>
                <form>
                    <input
                        onChange={e => this.handleChange(e)}
                        type="file"
                        name="file"
                        accept="image/*"
                    />
                </form>
                <button onClick={e => this.handleClick(e)}>SUBMIT</button>
            </div>
        );
    }
}

// <button  click.prevent.default='handleClick'>Submit</button>
// <div v-if='error'>Looks like something went wrong. Please try again!</div>
