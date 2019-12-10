import axios from "./axios";

export async function receiveFriendsWannabes() {
    const { data } = await axios.get("/friends-wannabes");
    console.log("data from receiveFriendsWannabes action: ", data);
    return {
        type: "RECEIVE_FRIENDS",
        friends: data
    };
}

export async function acceptFriendRequest(id) {
    await axios.post("/update-friendship/" + id, {
        buttonText: "Accept Friend Request"
    });
    console.log("accept friend request successful in actions");
    return {
        type: "ACCEPT_FRIEND",
        id
    };
}

export async function unfriend(id) {
    await axios.post("/update-friendship/" + id, {
        buttonText: ""
    });
    return {
        type: "REMOVE_FRIEND",
        id
    };
}

export async function chatMessages(msgs) {
    return {
        type: "GET_MESSAGES",
        msgs
    };
}

export async function chatMessage(msg) {
    return {
        type: "NEW_MESSAGE",
        msg
    };
}
