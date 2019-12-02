import React from "react";
import axios from "./axios";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("this.props.match.params.id: ", this.props.match.params.id);

        axios
            .get("/api/user/" + this.props.match.params.id)
            .then(({ data }) => {
                console.log("data from otherprofile: ", data);
                if (data.id == data.loggedInUser || !data.rows) {
                    this.props.history.push("/"); //this will redirect to slash route
                } else {
                    this.setState({
                        first: data.rows.first,
                        last: data.rows.last,
                        imgUrl: data.rows.image_url,
                        bio: data.rows.bio
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
        //we need to figure out if the other users's ID is he same as the logged in users id.
        // if it is true, we redirect to slash route
        //return req.session.userid from server to see what user is logged in
        //do the if comparison inside componenet did mount of otherprofile and send to slash route if users are the same.
        //also redirect to slash route if the user id doesn't exist
    }
    render() {
        return (
            <div>
                <h1>Here is the other Profile</h1>
                <h2>First: {this.state.first}</h2>
                <h2>Last: {this.state.last}</h2>
                <h2>Bio: {this.state.bio}</h2>
            </div>
        );
    }
}
