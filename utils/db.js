const spicedPg = require("spiced-pg");
///////////////// this communicates with the local or the web sql database and has to be
///////////////// specified for each project
const dbUrl =
    process.env.DATABASE_URL ||
    `postgres:postgres:postgres@localhost:5432/salt-socialnetwork`;
var db = spicedPg(dbUrl);

/////////////////////////////////////////////////////////////////////////

module.exports.addUsers = function addUsers(
    firstName,
    lastName,
    email,
    password
) {
    return db.query(
        `
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
    `,
        [firstName, lastName, email, password]
    );
};

module.exports.login = function login(logEmail) {
    return db.query(
        `SELECT id, email, password 
    FROM users 
    WHERE email = $1;`,
        [logEmail]
    );
};

module.exports.getUserInfo = function getUserInfo(id) {
    return db.query(
        `
        SELECT first, last, email, bio, imgUrl, created_at 
        FROM users 
        WHERE id = $1;
        `,
        [id]
    );
};

module.exports.updateProfilePic = function updateProfilePic(id, url) {
    return db.query(
        `
        UPDATE users 
        SET imgUrl = $2 
        WHERE id = $1;
        `,
        [id, url]
    );
};

module.exports.updateBio = function updateBio(id, text) {
    return db.query(
        `
        UPDATE users 
        SET bio = $2 
        WHERE id = $1;
        `,
        [id, text]
    );
};

module.exports.recentUsers = function recentUsers() {
    return db.query(
        `
        SELECT * FROM users
        ORDER by created_at DESC
        LIMIT 3;
        `
    );
};

module.exports.userSearch = function userSearch(param) {
    return db.query(
        `SELECT * FROM users 
    WHERE first ILIKE $1;`,
        [param + "%"]
    );
};
