import React, { Component } from "react";
import { connect } from "react-redux";
///////////////////////// For the Socket events to work
import { socket } from "./socket";

//////////////////////////////////

class PrivChatting extends Component {
    constructor() {
        super();
        this.state = { chat: "" };
        this.chattext = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.submitChat = this.submitChat.bind(this);
    }

    handleChange(e) {
        this.setState({ chat: e.target.value });
        // console.log("this.state.chat", this.state.chat);
    }

    submitChat() {
        if (this.chattext.current.value != "") {
            console.log("this.state.chat", this.state.chat);
            socket.emit("privateChatMessage", this.state.chat);

            // console.log("this.chattext.current", this.chattext);
            this.chattext.current.value = "";
        }
    }

    render() {
        if (!this.props.chats) {
            // console.log("private this.props.chats is null");

            return (
                <div>
                    <p className="noChatMsg">Private Barks</p>
                </div>
            );
        }

        // console.log("this.props at private chatting", this.props);

        return (
            <div className="privChatWindow">
                {this.props.chats && (
                    <div>
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
                {this.props.chats.length == 0 && (
                    <div>
                        <p className="noChatMsg">No Barks Yet!!</p>
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
        chats: state.priv_chats
    };
};

export default connect(mapStateToProps)(PrivChatting);
