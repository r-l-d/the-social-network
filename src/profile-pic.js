import React from "react";

export default function ProfilePic({
    firstname,
    lastname,
    imgUrl,
    toggleModal
}) {
    //destructuring props into components
    imgUrl = imgUrl || "/assets/logo.png";
    return (
        <div onClick={toggleModal}>
            <img src={imgUrl} alt={firstname + " " + lastname} />
        </div>
    );
}
