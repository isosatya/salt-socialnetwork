const onlineUsers = {};
let userId;

io.on("connection", socket => {
    onlineUsers[socket.id] = userId;

    Object.values(onlineUsers); // --> get the list of online users

    // if they open a new tab, have to check so it doesnt show as it got connected
    // same when they close a tab
    // Loop through the values in the list and see if they are really gone or not (no entry in table)

    socket.on("disconnect", () => {
        delete onlineUsers[socket.id];
    });
});
