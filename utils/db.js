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

module.exports.deleteUser = function deleteUser(id) {
    return db.query(
        `
        DELETE FROM users
        WHERE id = $1
        `,
        [id]
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
        ["%" + param + "%"]
    );
};

module.exports.sendFriendReq = function sendFriendReq(senderId, receiverId) {
    return db.query(
        `
        INSERT INTO friendships (sender_id, receiver_id)
        VALUES ($1, $2)
        RETURNING *;
        `,
        [senderId, receiverId]
    );
};

module.exports.cancelFriendship = function cancelFriendship(
    senderId,
    receiverId
) {
    return db.query(
        `
        DELETE FROM friendships
        WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1)
        `,
        [senderId, receiverId]
    );
};

module.exports.acceptFriendship = function acceptFriendship(
    senderId,
    receiverId
) {
    return db.query(
        `
        UPDATE friendships 
        SET accepted = TRUE 
        WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1)
        RETURNING *;
        `,
        [senderId, receiverId]
    );
};

module.exports.searchFriendship = function searchFriendship(
    senderId,
    receiverId
) {
    return db.query(
        `
        SELECT * FROM friendships
        WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1)
        `,
        [senderId, receiverId]
    );
};

module.exports.getFriendsList = function getFriendsList(id) {
    return db.query(
        `
    SELECT users.id, first, last, imgUrl, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND receiver_id= $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
    `,
        [id]
    );
};

module.exports.getRecentChats = function getRecentChats() {
    return db.query(
        ` SELECT users.id, first, last, imgUrl, chats.id, text, chats.created_at
        FROM chats
        JOIN users
        ON (sender_id = users.id)
        ORDER BY chats.id DESC
        LIMIT 10;`
    );
};

module.exports.getRecentPrivateChats = function getRecentPrivateChats(
    sender_id,
    receiver_id
) {
    return db.query(
        ` SELECT users.id, first, last, imgUrl, privatechat.id, text, privatechat.created_at
        FROM privatechat
        JOIN users
        ON (sender_id = $1 AND receiver_id = $2 AND sender_id = users.id)
        OR (sender_id = $2 AND receiver_id = $1 AND sender_id = users.id)
        ORDER BY privatechat.id DESC
        LIMIT 10;
        `,
        [sender_id, receiver_id]
    );
};

module.exports.addChatMsg = function addChatMsg(sender_id, text) {
    return db.query(
        `
        INSERT INTO chats (sender_id, text)
        VALUES ($1, $2)
        RETURNING *;
    `,
        [sender_id, text]
    );
};

module.exports.addPrivateChatMsg = function addPrivateChatMsg(
    sender_id,
    receiver_id,
    text
) {
    return db.query(
        `
        INSERT INTO privatechat (sender_id, receiver_id, text)
        VALUES ($1, $2, $3)
        RETURNING *;
    `,
        [sender_id, receiver_id, text]
    );
};

module.exports.getChatAndUserInfo = function getChatAndUserInfo(
    usersid,
    chatsid
) {
    return db.query(
        `
    SELECT users.id, first, last, imgUrl, chats.id, text, chats.created_at
    FROM chats
    JOIN users
    ON (users.id = $1 AND sender_id = users.id AND chats.id = $2)
    `,
        [usersid, chatsid]
    );
};

module.exports.getPrivateChatAndUserInfo = function getPrivateChatAndUserInfo(
    usersid,
    privatechatsid
) {
    return db.query(
        `
    SELECT users.id, first, last, imgUrl, privatechat.id, text, privatechat.created_at
    FROM privatechat
    JOIN users
    ON (users.id = $1 AND sender_id = users.id AND privatechat.id = $2)
    `,
        [usersid, privatechatsid]
    );
};

module.exports.addPicDatabase = function addPicDatabase(user_id, url) {
    return db.query(
        `
        INSERT INTO pictures (user_id, imgUrl)
        VALUES ($1, $2)
        RETURNING *;
    `,
        [user_id, url]
    );
};

module.exports.getPicsUserDatabase = function getPicsUserDatabase(user_id) {
    return db.query(
        `
        SELECT imgUrl FROM pictures
        WHERE (user_id = $1)
        `,
        [user_id]
    );
};

module.exports.deletePicsUserDatabase = function deltePicsUserDatabase(
    user_id
) {
    return db.query(
        `
        DELETE FROM pictures
        WHERE (user_id = $1)
        `,
        [user_id]
    );
};

module.exports.deleteUserFriendships = function deleteUserFriendships(id) {
    return db.query(
        `
        DELETE FROM friendships
        WHERE (sender_id = $1 OR receiver_id = $1)
        `,
        [id]
    );
};

module.exports.onlineUsersInfo = function onlineUsersInfo(arrayOfIds) {
    const query = `SELECT id, first, last, imgUrl FROM users WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds]);
};
