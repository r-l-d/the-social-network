import React from "react";

export default function ProfilePic({
    firstname,
    lastname,
    imgUrl,
    toggleModal,
    bigAvatar
}) {
    //destructuring props into components
    imgUrl = imgUrl || "/assets/default-user-icon-11.jpg";
    return (
        <div onClick={toggleModal}>
            <img
                className={bigAvatar}
                src={imgUrl}
                alt={firstname + " " + lastname}
            />
        </div>
    );
}
