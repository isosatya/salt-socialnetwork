import * as io from "socket.io-client";
import { chatMessages } from "./actions";
import { chatMessage } from "./actions";
import { onlineUsers } from "./actions";
import { userJoinedOrLeft } from "./actions";
import { privateChatMessages } from "./actions";
import { privateChatMessage } from "./actions";

export let socket;

export function initSocket(store) {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("chatMessages", msgs => {
        store.dispatch(chatMessages(msgs));
    });

    socket.on("chatMessage", msg => {
        // console.log("message from backend", msg);

        store.dispatch(chatMessage(msg));
    });

    socket.on("onlineUsers", users => {
        // console.log("users online from backend", users);
        store.dispatch(onlineUsers(users));
    });

    socket.on("userJoinedOrLeft", users => {
        store.dispatch(userJoinedOrLeft(users));
    });

    socket.on("privateChatMsgs", msgs => {
        // console.log("private messages received from backend", msgs);
        store.dispatch(privateChatMessages(msgs));
    });

    socket.on("privateChatMsg", msg => {
        // console.log("private messages received from backend", msg);
        store.dispatch(privateChatMessage(msg));
    });

    // socket.on("welcome", function(data) {
    //     console.log(data);
    //     socket.emit("thanks", {
    //         message: "Thank you. It is great to be here."
    //     });
    // });

    return socket;
}
