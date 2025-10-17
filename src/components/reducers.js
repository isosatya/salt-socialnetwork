
import { ACTION_TYPES } from "../constants";

// Redux reducer for managing application state
// Handles all state updates based on dispatched actions
export default function reducer(state = {}, action) {
    if (action.type === ACTION_TYPES.RECEIVE_FRIENDS) {
        return {
            ...state,
            listFriends: action.friendsList
        };
    }

    if (action.type === ACTION_TYPES.ACCEPT_FRIEND) {
        return {
            ...state,
            listFriends: state.listFriends.map(friend => {
                if (friend.id === action.id) {
                    return {
                        ...friend,
                        accepted: true
                    };
                }
                return friend;
            })
        };
    }

    if (
        action.type === ACTION_TYPES.REJECT_FRIEND ||
        action.type === ACTION_TYPES.CANCEL_FRIENDSHIP
    ) {
        return {
            ...state,
            listFriends: state.listFriends.filter(friend => {
                return friend.id !== action.id;
            })
        };
    }

    if (action.type === ACTION_TYPES.RECENT_CHATS) {
        return {
            ...state,
            chats: action.chats
        };
    }

    if (action.type === ACTION_TYPES.NEW_CHAT) {
        return {
            ...state,
            chats: [...state.chats, action.chat]
        };
    }

    if (action.type === ACTION_TYPES.ONLINE_USERS) {
        return {
            ...state,
            onlineusers: action.onlineusers
        };
    }

    if (action.type === ACTION_TYPES.RECENT_PRIV_CHATS) {
        return {
            ...state,
            priv_chats: action.priv_chats
        };
    }

    if (action.type === ACTION_TYPES.NEW_PRIV_CHAT) {
        return {
            ...state,
            priv_chats: [...state.priv_chats, action.priv_chat]
        };
    }

    return state;
}
