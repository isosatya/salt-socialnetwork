const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./utils/db");
const bc = require("./utils/bc"); // BECRYPT FOR HASHING AND CHECKING PASSWORDS
var cookieSession = require("cookie-session");

////////////////////// SETTINGS FOR SOCKET (CHAT)
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 127.0.0.1:8080/"
});
///////////////////////////

//////////////////////////////////////////// Image upload settings
// const for constructing the url address
const urlPrefx = "https://s3.amazonaws.com/andres-spiced/";
// This is the module that uploads the image to Amazon
const s3 = require("./s3");
var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");
// This uploads the image to the local storate
var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
// These are the parameters for the upload
var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
//////////////////////////////////////////// Cookie and Socket settings

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

//////////////////////////////  Bundle Server

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

//////////////////////////////////////////////   Routes

app.post("/register", function(req, res) {
    var first = req.body.first;
    var last = req.body.last;
    var email = req.body.email;
    var password = req.body.password;
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

app.post("/login", (req, res) => {
    console.log("req. body for login", req.body);

    var email = req.body.email;
    var password = req.body.password;
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

app.get("/delete", (req, res) => {
    const user = req.session.usersId;
    db.getPicsUserDatabase(user).then(results => {
        console.log(results.rows);
        let images = results.rows.map(image => image.imgurl);
        console.log("images", images);
        s3.delete(images);
    });

    // db.deleteUserFriendships(user).then(() => {
    //     db.deleteUser(user).then(() => {
    //         req.session = null;
    //         res.redirect("/");
    //     });
    // });
});

app.get("/user", (req, res) => {
    db.getUserInfo(req.session.usersId)
        .then(results => {
            res.json(results.rows);
        })
        .catch(err => {
            console.log("Error at the getUserInfo Query", err);
        });
});

app.get("/otheruser/:id", (req, res) => {
    const id = req.params.id;
    if (id == req.session.usersId) {
        res.json({ error: 1 });
    } else {
        db.getUserInfo(id)
            .then(results => {
                if (results.rows.length == 0) {
                    res.json({ error: 2 });
                } else {
                    res.json(results.rows);
                }
            })
            .catch(err => {
                console.log("Error at the getUserInfo Query", err);
            });
    }
});

app.get("/users/recent", (req, res) => {
    db.recentUsers()
        .then(results => {
            res.json(results.rows);
        })
        .catch(err => {
            console.log("Error at the recentUsers query", err);
        });
});

app.get("/users/:val", (req, res) => {
    const val = req.params.val;
    if (val) {
        db.userSearch(val)
            .then(results => {
                if (results.rows.length == 0) {
                    res.json({ error: 2 });
                } else {
                    // console.log("results of search", results.rows);
                    res.json(results.rows);
                }
            })
            .catch(err => {
                console.log("Error at the userSearch query", err);
            });
    } else {
        res.redirect("/users/recent");
    }
});

app.post("/friendship/:id", (req, res) => {
    const loggedUserId = req.session.usersId;
    const receiverId = req.params.id;
    db.searchFriendship(loggedUserId, receiverId).then(results => {
        if (results.rows.length == 0) {
            // No frienship or friendship request
            res.json({ status: 1 });
        } else {
            if (results.rows[0].accepted == false) {
                // No friendship, but there is friendship request
                if (loggedUserId == results.rows[0].receiver_id) {
                    // Request sent by the profile owner
                    res.json({ status: 2 });
                } else {
                    // request received by profile owner
                    res.json({ status: 3 });
                }
            } else if (results.rows[0].accepted == true) {
                // Unfriend
                res.json({ status: 4 });
            }
        }
    });
});

app.post("/sendfriendreq/:id", (req, res) => {
    const senderId = req.session.usersId;
    const receiverId = req.params.id;
    db.sendFriendReq(senderId, receiverId).then(results => {
        if (results.rows.length != 0) {
            res.json({ success: true });
        } else {
            res.json({ success: "" });
        }
    });
});

app.post("/cancelfriendship/:id", (req, res) => {
    const senderId = req.session.usersId;
    const receiverId = req.params.id;
    db.cancelFriendship(senderId, receiverId).then(() => {
        res.json({ success: true });
    });
});

app.post("/acceptfriendship/:id", (req, res) => {
    const senderId = req.session.usersId;
    const receiverId = req.params.id;
    db.acceptFriendship(senderId, receiverId).then(results => {
        if (results.rows[0].accepted == true) {
            res.json({ success: true });
        } else {
            res.json({ success: "" });
        }
    });
});

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    var url = urlPrefx + req.file.filename;
    var id = req.session.usersId;
    db.updateProfilePic(id, url)
        .then(() => {
            db.addPicDatabase(id, url);
            res.json(url);
        })
        .catch(err => console.log("Error at UpdateProfilePic", err));
});

app.post("/updatebio", (req, res) => {
    var id = req.session.usersId;
    var bio = req.body.bio;
    db.updateBio(id, bio)
        .then(response => res.json(response))
        .catch(err => console.log("Error at the updateBio query", err));
});

//////////// REDUX example

app.get("/get-list-animals", (req, res) => {
    let animals = ["dogs", "cats", "otters", "seagulls"];
    res.json(animals);
});

app.get("/friendslist", (req, res) => {
    const id = req.session.usersId;
    db.getFriendsList(id).then(results => {
        console.log("results for getFriendsList query", results.rows);
        res.json(results.rows);
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

// We change "app.listen" with "server.listen" so we can use the Socket functionality
// it's server, not app, that does the listening
server.listen(8080, function() {
    console.log("I'm listening.");
});

//////////////////////////////////////// Socket Events

io.on("connection", function(socket) {
    // console.log(`socket with the id ${socket.id} is now connected`);

    if (!socket.request.session.usersId) {
        return socket.disconnect(true);
    }
    const usersId = socket.request.session.usersId;

    db.getRecentChats().then(results => {
        // console.log("results for the getRecentChats query", results.rows);
        socket.emit("chatMessages", results.rows.reverse());
    });

    socket.on("chatMessage", msg => {
        // console.log("listened to chatMessage event ", msg);

        db.addChatMsg(usersId, msg).then(results => {
            // console.log("results for addChatMsg", results.rows);

            db.getChatAndUserInfo(usersId, results.rows[0].id).then(results => {
                io.sockets.emit("chatMessage", results.rows[0]);
            });
        });
    });

    // socket.on("disconnect", function() {
    //     console.log(`socket with the id ${socket.id} is now disconnected`);
    // });

    // socket.on("thanks", function(data) {
    //     console.log(data);
    // });
    // socket.emit("welcome", {
    //     message: "Welome. It is nice to see you"
    // });
});
