import React from "react";
import axios from "./axios";
import Typography from "@material-ui/core/Typography";
import Friendshipbutton from "./friendshipbutton";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import OtherFriends from "./otherfriends";

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
                        bio: data.rows.bio,
                        id: data.loggedInUser
                    });
                    console.log("this.state.id:", this.state.id);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                <Container className="otherProfileContainer" maxWidth="m">
                    <Box className="otherProfileBox">
                        <Typography variant="h4">
                            {this.state.first} {this.state.last}{" "}
                        </Typography>
                        <img
                            className="otherProfilePic"
                            src={this.state.imgUrl}
                        />
                    </Box>
                    <Box className="otherProfileBox">
                        <Typography variant="body1">
                            {this.state.bio}
                        </Typography>
                        <Friendshipbutton
                            otherId={this.props.match.params.id}
                        />
                    </Box>
                </Container>
                <OtherFriends
                    otherId={this.props.match.params.id}
                    id={this.state.id}
                />
            </div>
        );
    }
}
