import React, { Component } from "react";
import { connect } from "react-redux";
///////////////////////// For the Socket events to work
import { socket } from "./socket";
import PrivChatting from "./privChatting";

//////////////////////////////////

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
        // console.log(
        //     "this windows scroll",
        //     this.chatwindow.current.scrollHeight
        // );

        if (this.chatwindow.current) {
            this.chatwindow.current.scrollTop =
                this.chatwindow.current.scrollHeight -
                this.chatwindow.current.clientHeight;
        }
    }

    componentDidUpdate() {
        // console.log(
        //     "this windows scroll height",
        //     this.chatwindow.current.scrollHeight
        // );
        // console.log(
        //     "this windows client height",
        //     this.chatwindow.current.clientHeight
        // );
        if (this.chatwindow.current) {
            this.chatwindow.current.scrollTop =
                this.chatwindow.current.scrollHeight -
                this.chatwindow.current.clientHeight;
        }
    }

    handleChange(e) {
        this.setState({ chat: e.target.value });
        // console.log("this.state.chat", this.state.chat);
    }

    submitChat() {
        if (this.chattext.current.value != "") {
            socket.emit("chatMessage", this.state.chat);
            // console.log("this.chattext.current", this.chattext);
            this.chattext.current.value = "";
        }
    }

    render() {
        if (!this.props.chats) {
            return null;
        }

        console.log("this.props at chatting", this.props);

        return (
            <div className="chatsContainer">
                <div
                    className="onlineUsers"
                    // onClick={e => console.log("e.target user", e.target)}
                >
                    <h1 className="onlineTitle">Mobsters Online</h1>
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
                                        src={
                                            user.imgurl
                                                ? user.imgurl
                                                : "./uglydog.jpg"
                                        }
                                        alt={user.first + " " + user.last}
                                    />
                                    <div>
                                        <p className="onlineName">
                                            {user.first + " " + user.last}
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
                                            src={
                                                chat.imgurl
                                                    ? chat.imgurl
                                                    : "./uglydog.jpg"
                                            }
                                            alt={chat.first + " " + chat.last}
                                        />
                                        <p className="chatName">
                                            {chat.first + " " + chat.last}
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

const mapStateToProps = state => {
    // console.log("state in map.StateToProps in friendsList component:", state);
    // console.log("state for chats", state.onlineusers);

    return {
        chats: state.chats,
        users: state.onlineusers
    };
};

export default connect(mapStateToProps)(Chatting);
