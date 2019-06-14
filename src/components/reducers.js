// if (action.type === "ADD_LIST_ANIMALS") {
//     // here i tell the reducer how to add the list of animals to global state
//     // ALWAYS consol log the action to check
//     // console.log(("action:", action));
//     return {
//         ...state,
//         // call the property however you want
//         listAnimals: action.listAnimals
//     };
// }

export default function reducer(state = {}, action) {
    if (action.type === "RECEIVE_FRIENDS") {
        return {
            ...state,
            listFriends: action.friendsList
        };
    }

    if (action.type === "ACCEPT_FRIEND") {
        return {
            ...state,
            listFriends: state.listFriends.map(friend => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        // "accepted" here is not a random name, but the name of the property
                        // which we have to update in the table
                        accepted: true
                    };
                } else {
                    return friend;
                }
            })
        };
    }

    if (
        action.type === "REJECT_FRIEND" ||
        action.type === "CANCEL_FRIENDSHIP"
    ) {
        return {
            ...state,
            listFriends: state.listFriends.filter(friend => {
                return friend.id != action.id;
            })
        };
    }

    // console.log("state at reducer", state);

    return state;
}
