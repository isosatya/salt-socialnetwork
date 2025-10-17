import React, { Component } from "react";
import { connect } from "react-redux";
import { socket } from "./socket";
import PrivChatting from "./privChatting";
import { UI_TEXT, DEFAULT_PROFILE_IMAGE } from "../constants";

//////////////////////////////////

// Main chat component handling public chat messages and online users
class Chatting extends Component {
    constructor() {
        super();
        this.state = { chat: "" };
        this.chattext = React.createRef();
        this.chatwindow = React.createRef();
        this.chatwindow2 = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.submitChat = this.submitChat.bind(this);
    }
    componentDidMount() {
        // Auto-scroll to bottom of chat window
        this.scrollToBottom();
    }

    componentDidUpdate() {
        // Auto-scroll to bottom when new messages arrive
        this.scrollToBottom();
    }

    // Helper method to scroll chat window to bottom
    scrollToBottom() {
        if (this.chatwindow.current) {
            this.chatwindow.current.scrollTop =
                this.chatwindow.current.scrollHeight -
                this.chatwindow.current.clientHeight;
        }
    }

    handleChange(e) {
        this.setState({ chat: e.target.value });
    }

    submitChat() {
        if (this.chattext.current.value !== "") {
            socket.emit("chatMessage", this.state.chat);
            this.chattext.current.value = "";
        }
    }

    render() {
        if (!this.props.chats) {
            return null;
        }

        console.log("this.props.chats at chatting", this.props.chats);

        return (
            <div className="chatsContainer">
                <div className="onlineUsers">
                    <h1 className="onlineTitle">{UI_TEXT.MOBSTERS_ONLINE}</h1>
                    {this.props.users && (
                        <div>
                            {this.props.users.map(user => (
                                <div
                                    key={user.id}
                                    className="onlineUser"
                                    onClick={() =>
                                        socket.emit("privateChatUser", user.id)
                                    }
                                >
                                    <div className="dot" />
                                    <img
                                        className="onlineProfilePic"
                                        src={user.imgurl || DEFAULT_PROFILE_IMAGE}
                                        alt={`${user.first} ${user.last}`}
                                    />
                                    <div>
                                        <p className="onlineName">
                                            {`${user.first} ${user.last}`}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="chatWindow" ref={this.chatwindow}>
                    {this.props.chats && (
                        <div className="chatWindow2">
                            {this.props.chats.map(chat => (
                                <div key={chat.id}>
                                    <div className="chatPicName">
                                        <img
                                            className="chatProfilePic"
                                            src={chat.imgurl || DEFAULT_PROFILE_IMAGE}
                                            alt={`${chat.first} ${chat.last}`}
                                            onClick={() =>
                                                socket.emit(
                                                    "privateChatUser",
                                                    chat.id
                                                )
                                            }
                                        />
                                        <p className="chatName">
                                            {`${chat.first} ${chat.last}`}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="chatText">{chat.text}</p>
                                        <p className="chatDate">
                                            {chat.created_at}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="chatInput">
                        <textarea
                            rows="3"
                            cols="25"
                            defaultValue={this.props.chat}
                            ref={this.chattext}
                            onChange={e => this.handleChange(e)}
                            className="chatTextArea"
                        />
                        <div>
                            <button
                                onClick={this.submitChat}
                                className="chatSendButton"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
                <div className="privChats" ref={this.chatwindow2}>
                    <PrivChatting />
                </div>
            </div>
        );
    }
}

// handleSubmit(e) {
//     e.preventDefault();
//     axios.post("/updatebio", { bio: this.state.bio });
// }

// Map Redux state to component props
const mapStateToProps = state => {
    return {
        chats: state.chats,
        users: state.onlineusers
    };
};

export default connect(mapStateToProps)(Chatting);
