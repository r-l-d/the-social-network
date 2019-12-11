export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };
    }

    if (action.type == "ACCEPT_FRIEND") {
        state = {
            ...state,
            friends: state.friends.map(user => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        accepted: true
                    };
                } else {
                    return user;
                }
            })
        };
    }

    if (action.type == "REMOVE_FRIEND") {
        state = {
            ...state,
            friends: state.friends.filter(user => {
                if (user.id == action.id) {
                    return false;
                } else {
                    return true;
                }
            })
        };
    }

    if (action.type == "GET_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.msgs
        };
    }

    if (action.type == "NEW_MESSAGE") {
        console.log("newMsg in reducer: ", action.newMsg);
        state = {
            ...state,
            chatMessages: state.chatMessages.concat(action.newMsg)
        };
    }

    if (action.type == "FRIEND_REQUEST") {
        console.log("Friend Request in reducer: ", action.request);
        state = {
            ...state,
            newRequest: action.request
        };
    }

    // console.log("state after reducer: ", state);
    return state;
}
