import * as io from "socket.io-client";
import { chatMessages } from "./actions";
import { chatMessage } from "./actions";

let socket;

export function initSocket(store) {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("chatMessages", msgs => {
        console.log("Recent chats from backend", msgs);

        store.dispatch(chatMessages(msgs));
    });

    // socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));

    // socket.on("welcome", function(data) {
    //     console.log(data);
    //     socket.emit("thanks", {
    //         message: "Thank you. It is great to be here."
    //     });
    // });

    return socket;
}
