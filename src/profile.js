import React from "react";
import ProfilePic from "./profile-pic";
import BioEditor from "./bio-editor";

export default function Profile(props) {
    console.log("props in profile: ", props);
    return (
        <div>
            <h1>Profile component First: {props.first}</h1>
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
