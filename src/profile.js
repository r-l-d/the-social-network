import React from "react";
import ProfilePic from "./profile-pic";
import BioEditor from "./bio-editor";
import Typography from "@material-ui/core/Typography";

export default function Profile(props) {
    console.log("props in profile: ", props);
    return (
        <div>
            <Typography variant="h4">
                {props.first} {props.last}
            </Typography>
            <ProfilePic
                first={props.first}
                last={props.last}
                imgUrl={props.imgUrl}
                toggleModal={props.toggleModal}
            />
            <BioEditor bio={props.bio} refreshBio={props.refreshBio} />
        </div>
    );
}
