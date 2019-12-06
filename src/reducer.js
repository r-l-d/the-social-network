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

    console.log("state after reducer: ", state);
    return state;
}
