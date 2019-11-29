import React from "react";
import axios from "./axios";
import ProfilePic from "./profile-pic";
import Uploader from "./uploader";
import Logo from "./logo";
import Profile from "./profile";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.refreshBio = this.refreshBio.bind(this);
    }

    componentDidMount() {
        console.log("app has mounted");
        axios.get("/user").then(({ data }) => {
            console.log("data: ", data);
            this.setState({
                first: data.first,
                last: data.last,
                imgUrl: data.image_url,
                bio: data.bio
            });
            console.log("this.state: ", this.state);
        });
    }

    toggleModal() {
        console.log("toggle modal is running");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }

    uploadImage(imgUrl) {
        console.log("i am a method in app");
        console.log("muffin: ", imgUrl);
        //this is how you get the modal away. Change uploaderIsVisible to the opposite
        //then set this.state.imgurl to the url that you get back
        this.setState({
            imgUrl: imgUrl,
            uploaderIsVisible: false
        });
    }

    refreshBio(bio) {
        this.setState({
            bio: bio
        });
    }

    render() {
        if (!this.state.first) {
            return null;
        }
        return (
            <div>
                <Logo />
                <h1>hello from app</h1>
                <ProfilePic
                    toggleModal={this.toggleModal}
                    firstname={this.state.first}
                    lastname={this.state.last}
                    imgUrl={this.state.imgUrl}
                />

                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    imgUrl={this.state.imgUrl}
                    uploader={this.state.uploaderIsVisible}
                    bio={this.state.bio}
                    toggleModal={this.toggleModal}
                    refreshBio={this.refreshBio}
                />

                {this.state.uploaderIsVisible && (
                    <Uploader
                        uploadImage={this.uploadImage}
                        toggleModal={this.toggleModal}
                    />
                )}
            </div>
        );
    }
}
