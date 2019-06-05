const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./utils/db");
const bc = require("./utils/bc"); // BECRYPT FOR HASHING AND CHECKING PASSWORDS
var cookieSession = require("cookie-session");

app.use(cookieParser());

app.use(express.static(__dirname + "/public"));

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

app.use(compression());

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

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/register", function(req, res) {
    console.log("req.body", req.body);

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    bc.hashPassword(password)
        .then(hash => {
            db.addUsers(firstName, lastName, email, hash)
                .then(results => {
                    console.log("results of inserting", results);
                    req.session.usersId = results.rows[0].id;
                    res.json({ userId: results.rows[0].id });
                    // res.redirect("/profile");
                })
                .catch(err => {
                    res.json({ error: true });
                    console.log("Error at addUsers query -->", err);
                });
        })
        .catch(err => {
            res.json({ error: true });
            console.log("Error at hashPassword function", err);
        });
});

app.post("/login", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    db.login(email)
        .then(match => {
            bc.checkPassword(password, match.rows[0].password)
                .then(doesMatch => {
                    if (doesMatch) {
                        req.session.usersId = match.rows[0].id;
                    } else {
                        res.json({ error: true });
                    }
                })
                .catch(err => {
                    console.log("Error at checkPassword query ->", err);
                    res.json({ error: true });
                });
        })
        .catch(err => {
            console.log("Error at login query ->", err);
            res.json({ error: true });
        });
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
