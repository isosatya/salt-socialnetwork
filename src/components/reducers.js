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

    // console.log("state", state);

    return state;
}
