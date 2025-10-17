import axios from "axios";
import { ACTION_TYPES } from "../constants";

// Redux action creators for managing application state
// All AJAX requests and state updates are handled here


// Fetch and store user's friends list in Redux state
export async function receiveFriends() {
    const { data } = await axios.get("/friendslist");
    console.log("Friends list query results:", data);

    return {
        type: ACTION_TYPES.RECEIVE_FRIENDS,
        friendsList: data
    };
}

// Accept a friend request and update Redux state
export async function acceptFriendReq(id) {
    await axios.post(`/acceptfriendship/${id}`);
    return {
        type: ACTION_TYPES.ACCEPT_FRIEND,
        id
    };
}

// Cancel friendship and update Redux state
export async function cancelFriendship(id) {
    await axios.post(`/cancelfriendship/${id}`);
    return {
        type: ACTION_TYPES.CANCEL_FRIENDSHIP,
        id
    };
}

// Reject a friend request and update Redux state
export async function rejectFriendReq(id) {
    await axios.post(`/cancelfriendship/${id}`);
    return {
        type: ACTION_TYPES.REJECT_FRIEND,
        id
    };
}

// Store recent chat messages in Redux state
export function chatMessages(msgs) {
    return {
        type: ACTION_TYPES.RECENT_CHATS,
        chats: msgs
    };
}

// Add new chat message to Redux state
export function chatMessage(msg) {
    return {
        type: ACTION_TYPES.NEW_CHAT,
        chat: msg
    };
}

// Update online users list in Redux state
export function onlineUsers(users) {
    return {
        type: ACTION_TYPES.ONLINE_USERS,
        onlineusers: users
    };
}

// Update online users when someone joins or leaves (same as onlineUsers)
export function userJoinedOrLeft(users) {
    return {
        type: ACTION_TYPES.ONLINE_USERS,
        onlineusers: users
    };
}

// Store recent private chat messages in Redux state
export function privateChatMessages(privMsgs) {
    return {
        type: ACTION_TYPES.RECENT_PRIV_CHATS,
        priv_chats: privMsgs
    };
}

// Add new private chat message to Redux state
export function privateChatMessage(privMsg) {
    return {
        type: ACTION_TYPES.NEW_PRIV_CHAT,
        priv_chat: privMsg
    };
}
