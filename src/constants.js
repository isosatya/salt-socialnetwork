/**
 * Application Constants
 * Centralized configuration and hardcoded values for the social network application
 */

// Default fallback images
export const DEFAULT_PROFILE_IMAGE = "./uglydog.jpg";

// File upload settings
export const MAX_FILE_SIZE = 2097152; // 2MB in bytes
export const S3_URL_PREFIX = "https://s3.amazonaws.com/andres-spiced/";

// Database error codes
export const DB_ERROR_CODES = {
    UNIQUE_VIOLATION: 23505
};

// API response status codes
export const API_STATUS = {
    SUCCESS: 1,
    PENDING_REQUEST: 2,
    RECEIVED_REQUEST: 3,
    UNFRIEND: 4
};

// Socket event names
export const SOCKET_EVENTS = {
    CHAT_MESSAGES: "chatMessages",
    CHAT_MESSAGE: "chatMessage",
    ONLINE_USERS: "onlineUsers",
    USER_JOINED_OR_LEFT: "userJoinedOrLeft",
    PRIVATE_CHAT_MESSAGES: "privateChatMsgs",
    PRIVATE_CHAT_MESSAGE: "privateChatMsg",
    PRIVATE_CHAT_USER: "privateChatUser"
};

// Redux action types
export const ACTION_TYPES = {
    RECEIVE_FRIENDS: "RECEIVE_FRIENDS",
    ACCEPT_FRIEND: "ACCEPT_FRIEND",
    REJECT_FRIEND: "REJECT_FRIEND",
    CANCEL_FRIENDSHIP: "CANCEL_FRIENDSHIP",
    RECENT_CHATS: "RECENT_CHATS",
    NEW_CHAT: "NEW_CHAT",
    ONLINE_USERS: "ONLINE_USERS",
    RECENT_PRIV_CHATS: "RECENT_PRIV_CHATS",
    NEW_PRIV_CHAT: "NEW_PRIV_CHAT"
};

// UI text constants
export const UI_TEXT = {
    APP_NAME: "Paw Gang",
    WELCOME_MESSAGE: "Welcome,",
    PROFILE: "Profile",
    GANG_BUDDIES: "Gang Buddies",
    SEARCH_MOBSTERS: "Search Mobsters",
    BARK_CHAT: "Bark Chat",
    MOBSTERS_ONLINE: "Mobsters Online",
    PENDING_BUDDIES: "Pending Buddies",
    ALREADY_BUDDIES: "Already Buddies"
};
