const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./utils/db");
const bc = require("./utils/bc");
const cookieSession = require("cookie-session");

// Socket.io server setup for real-time chat functionality
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 127.0.0.1:8080/"
});

// Image upload configuration for S3 and local storage
const urlPrefix = "https://s3.amazonaws.com/andres-spiced/";
const s3 = require("./s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

// Local disk storage configuration for temporary file uploads
const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
// Multer configuration for file uploads
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
// Session and cookie configuration

app.use(cookieParser());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

////////////////////////////////

app.use(express.static(__dirname + "/public"));

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(compression());

// Development vs production bundle handling

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// API Routes

// User registration endpoint - creates new user account with hashed password
app.post("/register", function(req, res) {
    const { first, last, email, password } = req.body;
    bc.hashPassword(password)
        .then(hash => {
            db.addUsers(first, last, email, hash)
                .then(results => {
                    req.session.usersId = results.rows[0].id;
                    res.json({ userId: results.rows[0].id });
                })
                .catch(err => {
                    if (err.code == 23505) {
                        res.json({ error: 23505 });
                    } else {
                        res.json({ error: true });
                    }
                    console.log("Error at addUsers query -->", err);
                });
        })
        .catch(err => {
            res.json({ error: true });
            console.log("Error at hashPassword function", err);
        });
});

// User login endpoint - authenticates user credentials
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.login(email)
        .then(match => {
            bc.checkPassword(password, match.rows[0].password)
                .then(doesMatch => {
                    if (doesMatch) {
                        req.session.usersId = match.rows[0].id;
                        res.json({ userId: match.rows[0].id });
                    } else {
                        res.json({ error: "Password incorrect!" });
                    }
                })
                .catch(err => {
                    console.log("Error at checkPassword query ->", err);
                });
        })
        .catch(err => {
            res.json({ error: "e-Mail not found!" });
            console.log("Error at login query ->", err);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

// User account deletion endpoint - removes user data and associated files
app.get("/delete", (req, res) => {
    const userId = req.session.usersId;
    console.log("Deleting user profile:", userId);

    db.getPicsUserDatabase(userId).then(results => {
        const images = results.rows.map(image => image.imgurl.slice(39));
        s3.delete(images);
        
        db.deletePicsUserDatabase(userId).then(() => {
            db.deleteUserFriendships(userId).then(() => {
                db.deleteUser(userId).then(() => {
                    console.log("User successfully deleted from backend");
                    req.session = null;
                    res.redirect("/");
                });
            });
        });
    });
});

// Get current user information endpoint
app.get("/user", (req, res) => {
    db.getUserInfo(req.session.usersId)
        .then(results => {
            res.json(results.rows);
        })
        .catch(err => {
            console.log("Error retrieving user info:", err);
            res.status(500).json({ error: "Failed to retrieve user information" });
        });
});

// Get other user profile information endpoint
app.get("/otheruser/:id", (req, res) => {
    const userId = req.params.id;
    
    if (userId == req.session.usersId) {
        res.json({ error: 1 }); // Cannot view own profile through this endpoint
    } else {
        db.getUserInfo(userId)
            .then(results => {
                if (results.rows.length === 0) {
                    res.json({ error: 2 }); // User not found
                } else {
                    res.json(results.rows);
                }
            })
            .catch(err => {
                console.log("Error retrieving other user info:", err);
                res.status(500).json({ error: "Failed to retrieve user information" });
            });
    }
});

// Get recently registered users endpoint
app.get("/users/recent", (req, res) => {
    db.recentUsers()
        .then(results => {
            res.json(results.rows);
        })
        .catch(err => {
            console.log("Error retrieving recent users:", err);
            res.status(500).json({ error: "Failed to retrieve recent users" });
        });
});

// Search users by name endpoint
app.get("/users/:val", (req, res) => {
    const searchTerm = req.params.val;

    if (searchTerm) {
        db.userSearch(searchTerm)
            .then(results => {
                if (results.rows.length === 0) {
                    res.json({ error: 2 }); // No users found
                } else {
                    res.json(results.rows);
                }
            })
            .catch(err => {
                console.log("Error searching users:", err);
                res.status(500).json({ error: "Failed to search users" });
            });
    } else {
        res.redirect("/users/recent");
    }
});

// Check friendship status between users endpoint
app.post("/friendship/:id", (req, res) => {
    const loggedUserId = req.session.usersId;
    const targetUserId = req.params.id;
    
    db.searchFriendship(loggedUserId, targetUserId).then(results => {
        if (results.rows.length === 0) {
            res.json({ status: 1 }); // No friendship or request exists
        } else {
            const friendship = results.rows[0];
            if (friendship.accepted === false) {
                if (loggedUserId === friendship.receiver_id) {
                    res.json({ status: 2 }); // Request sent by current user
                } else {
                    res.json({ status: 3 }); // Request received by current user
                }
            } else if (friendship.accepted === true) {
                res.json({ status: 4 }); // Already friends (unfriend option)
            }
        }
    }).catch(err => {
        console.log("Error checking friendship status:", err);
        res.status(500).json({ error: "Failed to check friendship status" });
    });
});

// Send friend request endpoint
app.post("/sendfriendreq/:id", (req, res) => {
    const senderId = req.session.usersId;
    const receiverId = req.params.id;
    
    db.sendFriendReq(senderId, receiverId).then(results => {
        if (results.rows.length !== 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    }).catch(err => {
        console.log("Error sending friend request:", err);
        res.status(500).json({ error: "Failed to send friend request" });
    });
});

// Cancel friendship or friend request endpoint
app.post("/cancelfriendship/:id", (req, res) => {
    const senderId = req.session.usersId;
    const receiverId = req.params.id;
    
    db.cancelFriendship(senderId, receiverId).then(() => {
        res.json({ success: true });
    }).catch(err => {
        console.log("Error canceling friendship:", err);
        res.status(500).json({ error: "Failed to cancel friendship" });
    });
});

// Accept friend request endpoint
app.post("/acceptfriendship/:id", (req, res) => {
    const senderId = req.session.usersId;
    const receiverId = req.params.id;
    
    db.acceptFriendship(senderId, receiverId).then(results => {
        if (results.rows[0].accepted === true) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    }).catch(err => {
        console.log("Error accepting friendship:", err);
        res.status(500).json({ error: "Failed to accept friendship" });
    });
});

// Profile picture upload endpoint
app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    const imageUrl = urlPrefix + req.file.filename;
    const userId = req.session.usersId;
    
    db.updateProfilePic(userId, imageUrl)
        .then(() => {
            return db.addPicDatabase(userId, imageUrl);
        })
        .then(() => {
            res.json(imageUrl);
        })
        .catch(err => {
            console.log("Error updating profile picture:", err);
            res.status(500).json({ error: "Failed to update profile picture" });
        });
});

// Update user bio endpoint
app.post("/updatebio", (req, res) => {
    const userId = req.session.usersId;
    const bio = req.body.bio;
    
    db.updateBio(userId, bio)
        .then(response => res.json(response))
        .catch(err => {
            console.log("Error updating bio:", err);
            res.status(500).json({ error: "Failed to update bio" });
        });
});

// Example endpoint for Redux demonstration
app.get("/get-list-animals", (req, res) => {
    const animals = ["dogs", "cats", "otters", "seagulls"];
    res.json(animals);
});

// Get user's friends list endpoint
app.get("/friendslist", (req, res) => {
    const userId = req.session.usersId;
    
    db.getFriendsList(userId).then(results => {
        console.log("Friends list query results:", results.rows);
        res.json(results.rows);
    }).catch(err => {
        console.log("Error retrieving friends list:", err);
        res.status(500).json({ error: "Failed to retrieve friends list" });
    });
});

app.get("/welcome", function(req, res) {
    if (req.session.usersId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function(req, res) {
    if (!req.session.usersId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// Start server with socket.io support
server.listen(8080, function() {
    console.log("Server listening on port 8080");
});

// Socket.io event handlers for real-time chat functionality
const onlineUsers = {};

// Helper function to format dates for display
function formatDate(date) {
    return new Date(date).toLocaleString();
}

// Handle new socket connections
io.on("connection", function(socket) {
    // Require user authentication for socket connection
    if (!socket.request.session.usersId) {
        return socket.disconnect(true);
    }
    
    const userId = socket.request.session.usersId;
    console.log(`User ${userId} connected with socket ${socket.id}`);

    // Add user to online users list if not already present
    const onlineUsersArray = Object.values(onlineUsers);
    const userAlreadyOnline = onlineUsersArray.find(user => user === userId);

    if (!userAlreadyOnline) {
        onlineUsers[socket.id] = userId;
    }

    // Broadcast updated online users list to all connected clients
    db.onlineUsersInfo(Object.values(onlineUsers)).then(results => {
        io.sockets.emit("userJoinedOrLeft", results.rows);
    });

    // Send recent chat messages to newly connected user
    db.getRecentChats().then(results => {
        results.rows.forEach(item => {
            item.created_at = formatDate(item.created_at);
        });
        socket.emit("chatMessages", results.rows.reverse());
    });

    // Handle new chat messages
    socket.on("chatMessage", msg => {
        db.addChatMsg(userId, msg).then(results => {
            return db.getChatAndUserInfo(userId, results.rows[0].id);
        }).then(results => {
            results.rows.forEach(item => {
                item.created_at = formatDate(item.created_at);
            });
            io.sockets.emit("chatMessage", results.rows[0]);
        }).catch(err => {
            console.log("Error handling chat message:", err);
        });
    });

    // Handle private chat initiation
    socket.on("privateChatUser", targetUserId => {
        // Helper function to find socket ID by user ID
        function getSocketIdByUserId(onlineUsersObj, userId) {
            return Object.keys(onlineUsersObj).find(key => onlineUsersObj[key] === userId);
        }

        const recipientSocketId = getSocketIdByUserId(onlineUsers, targetUserId);

        // Load recent private chat history
        db.getRecentPrivateChats(userId, targetUserId).then(results => {
            if (targetUserId !== userId) {
                results.rows.forEach(item => {
                    item.created_at = formatDate(item.created_at);
                });

                // Send chat history to both users
                if (recipientSocketId && io.sockets.sockets[recipientSocketId]) {
                    io.sockets.sockets[recipientSocketId].emit(
                        "privateChatMsgs",
                        results.rows.reverse()
                    );
                }
                socket.emit("privateChatMsgs", results.rows);
            }
        });

        // Handle private chat messages
        socket.on("privateChatMessage", msg => {
            db.addPrivateChatMsg(userId, targetUserId, msg).then(results => {
                return db.getPrivateChatAndUserInfo(userId, results.rows[0].id);
            }).then(results => {
                results.rows.forEach(item => {
                    item.created_at = formatDate(item.created_at);
                });
                io.sockets.emit("privateChatMsg", results.rows[0]);
            }).catch(err => {
                console.log("Error handling private chat message:", err);
            });
        });
    });

    // Handle user disconnection
    socket.on("disconnect", function() {
        console.log(`User ${userId} disconnected (socket ${socket.id})`);
        
        delete onlineUsers[socket.id];

        // Broadcast updated online users list
        db.onlineUsersInfo(Object.values(onlineUsers)).then(results => {
            io.sockets.emit("userJoinedOrLeft", results.rows);
        });
    });

});
