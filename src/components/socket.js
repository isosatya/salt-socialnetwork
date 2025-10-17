import * as io from "socket.io-client";
import { 
    chatMessages, 
    chatMessage, 
    onlineUsers, 
    userJoinedOrLeft, 
    privateChatMessages, 
    privateChatMessage 
} from "./actions";
import { SOCKET_EVENTS } from "../constants";

// Socket.io client instance for real-time communication
export let socket;

// Initialize socket connection and set up event listeners
export function initSocket(store) {
    if (!socket) {
        socket = io.connect();
    }

    // Listen for recent chat messages
    socket.on(SOCKET_EVENTS.CHAT_MESSAGES, msgs => {
        store.dispatch(chatMessages(msgs));
    });

    // Listen for new chat messages
    socket.on(SOCKET_EVENTS.CHAT_MESSAGE, msg => {
        store.dispatch(chatMessage(msg));
    });

    // Listen for online users updates
    socket.on(SOCKET_EVENTS.ONLINE_USERS, users => {
        store.dispatch(onlineUsers(users));
    });

    // Listen for user join/leave events
    socket.on(SOCKET_EVENTS.USER_JOINED_OR_LEFT, users => {
        store.dispatch(userJoinedOrLeft(users));
    });

    // Listen for private chat messages
    socket.on(SOCKET_EVENTS.PRIVATE_CHAT_MESSAGES, msgs => {
        store.dispatch(privateChatMessages(msgs));
    });

    // Listen for new private chat messages
    socket.on(SOCKET_EVENTS.PRIVATE_CHAT_MESSAGE, msg => {
        store.dispatch(privateChatMessage(msg));
    });

    return socket;
}
