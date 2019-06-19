import * as io from "socket.io-client";
import { chatMessages } from "./actions";
import { chatMessage } from "./actions";
import { onlineUsers } from "./actions";

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
        console.log("users online from backend", users);
        store.dispatch(onlineUsers(users));
    });

    // socket.on("welcome", function(data) {
    //     console.log(data);
    //     socket.emit("thanks", {
    //         message: "Thank you. It is great to be here."
    //     });
    // });

    return socket;
}
