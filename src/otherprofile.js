import React from "react";
import axios from "./axios";
import Typography from "@material-ui/core/Typography";

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
    }
    render() {
        return (
            <div>
                <Typography variant="h4">
                    {this.state.first} {this.state.last}{" "}
                </Typography>
                <img src={this.state.imgUrl} />
                <Typography variant="body1">{this.state.bio}</Typography>
            </div>
        );
    }
}
