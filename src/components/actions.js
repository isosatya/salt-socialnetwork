import axios from "axios";

// all ajax requests will go in this file
// an action should always return an OBJECT

// export function getListOfAnimals() {
//     return axios.get("/get-list-animals").then(({ data }) => {
//         console.log("data in getListOfAnimals:", data);
//         return {
//             type: "ADD_LIST_ANIMALS",
//             listAnimals: data
//         };
//     });
// }

export async function receiveFriends() {
    const { data } = await axios.get("/friendslist");
    console.log("friends list query results", data);

    return {
        type: "RECEIVE_FRIENDS",
        friendsList: data
    };
}

export async function acceptFriendReq(id) {
    const { data } = await axios.post(`/acceptfriendship/${id}`);
    return {
        type: "ACCEPT_FRIEND",
        id
    };
}

export async function cancelFriendship(id) {
    const { data } = await axios.post(`/cancelfriendship/${id}`);
    return {
        type: "CANCEL_FRIENDSHIP",
        id
    };
}

export async function rejectFriendReq(id) {
    const { data } = await axios.post(`/cancelfriendship/${id}`);
    return {
        type: "REJECT_FRIEND",
        id
    };
}

export async function chatMessages(msgs) {
    return {
        type: "RECENT_CHATS",
        chats: msgs
    };
}

export async function chatMessage(msg) {
    return {
        type: "NEW_CHAT",
        chat: msg
    };
}

export async function onlineUsers(users) {
    return {
        type: "ONLINE_USERS",
        onlineusers: users
    };
}

export async function userJoinedOrLeft(users) {
    return {
        type: "ONLINE_USERS",
        onlineusers: users
    };
}
