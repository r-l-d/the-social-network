import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend
} from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(state => {
        return (
            state.friends &&
            state.friends.filter(friends => friends.accepted == true)
        );
    });
    const wannabes = useSelector(state => {
        return (
            state.friends &&
            state.friends.filter(friend => friend.accepted == false)
        );
    });

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    if (!friends) {
        return null;
    }

    return (
        <div>
            <h1>Wannabes:</h1>
            {wannabes.map(wannabe => (
                <div key={wannabe.id}>
                    <img src={wannabe.image_url} />
                    <div>
                        {wannabe.first} {wannabe.last}
                    </div>
                    <button
                        onClick={e => dispatch(acceptFriendRequest(wannabe.id))}
                    >
                        Accept Friend Request
                    </button>
                    <button onClick={e => dispatch(unfriend(wannabe.id))}>
                        Deny Friend Request
                    </button>
                </div>
            ))}
            <h1>Friends:</h1>
            {friends.map(friend => (
                <div key={friend.id}>
                    <img src={friend.image_url} />
                    <div>
                        {friend.first} {friend.last}
                    </div>
                    <button onClick={e => dispatch(unfriend(friend.id))}>
                        Unfriend
                    </button>
                </div>
            ))}
        </div>
    );
}
