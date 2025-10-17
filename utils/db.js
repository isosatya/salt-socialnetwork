const spicedPg = require("spiced-pg");

// Database connection configuration
// Uses environment variable in production, local PostgreSQL in development
const dbUrl =
    process.env.DATABASE_URL ||
    `postgres:postgres:postgres@localhost:5432/salt-socialnetwork`;
const db = spicedPg(dbUrl);

// Database functions for user management and social network features

// Create a new user account with hashed password
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

// Permanently delete a user account
module.exports.deleteUser = function deleteUser(id) {
    return db.query(
        `
        DELETE FROM users
        WHERE id = $1
        `,
        [id]
    );
};

// Retrieve user credentials for login authentication
module.exports.login = function login(logEmail) {
    return db.query(
        `SELECT id, email, password 
    FROM users 
    WHERE email = $1;`,
        [logEmail]
    );
};

// Get user profile information by ID
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

// Update user profile picture URL
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

// Update user bio text
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

// Get recently registered users (last 3)
module.exports.recentUsers = function recentUsers() {
    return db.query(
        `
        SELECT * FROM users
        ORDER by created_at DESC
        LIMIT 3;
        `
    );
};

// Search users by first name (case-insensitive)
module.exports.userSearch = function userSearch(param) {
    return db.query(
        `SELECT * FROM users 
        WHERE first ILIKE $1;`,
        ["%" + param + "%"]
    );
};

// Send a friend request from one user to another
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

// Cancel friendship or friend request between two users
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

// Accept a pending friend request
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

// Check friendship status between two users
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

// Get user's friends list (both pending and accepted friendships)
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

// Get recent public chat messages (last 10)
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

// Get recent private chat messages between two users (last 10)
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

// Add a new public chat message
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

// Add a new private chat message between two users
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

// Get chat message with user information for display
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

// Get private chat message with user information for display
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

// Add uploaded image to user pictures database
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

// Get all pictures uploaded by a user
module.exports.getPicsUserDatabase = function getPicsUserDatabase(user_id) {
    return db.query(
        `
        SELECT imgUrl FROM pictures
        WHERE (user_id = $1)
        `,
        [user_id]
    );
};

// Delete all pictures associated with a user
module.exports.deletePicsUserDatabase = function deletePicsUserDatabase(
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

// Delete all friendships associated with a user
module.exports.deleteUserFriendships = function deleteUserFriendships(id) {
    return db.query(
        `
        DELETE FROM friendships
        WHERE (sender_id = $1 OR receiver_id = $1)
        `,
        [id]
    );
};

// Get user information for online users by their IDs
module.exports.onlineUsersInfo = function onlineUsersInfo(arrayOfIds) {
    const query = `SELECT id, first, last, imgUrl FROM users WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds]);
};
