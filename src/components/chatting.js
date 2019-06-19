import React, { Component } from "react";
import { connect } from "react-redux";
///////////////////////// For the Socket events to work
import { socket } from "./socket";

//////////////////////////////////

class Chatting extends Component {
    constructor() {
        super();
        this.state = { chat: "" };
        this.chattext = React.createRef();
        this.chatwindow = React.createRef();
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
                <div className="onlineUsers">
                    <h1>Online people</h1>
                    {this.props.users.map(user => (
                        <div key={user.id} className="onlineUser">
                            <div className="dot" />
                            <img
                                className="chatProfilePic"
                                src={
                                    user.imgurl ? user.imgurl : "./uglydog.jpg"
                                }
                                alt={user.first + " " + user.last}
                            />
                            <div>
                                <p>{user.first + " " + user.last}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="chatWindow" ref={this.chatwindow}>
                    <div>
                        {this.props.chats.map(chat => (
                            <div key={chat.id}>
                                <img
                                    className="chatProfilePic"
                                    src={
                                        chat.imgurl
                                            ? chat.imgurl
                                            : "./uglydog.jpg"
                                    }
                                    alt={chat.first + " " + chat.last}
                                />
                                <div>
                                    <p>{chat.first + " " + chat.last}</p>
                                    <p>{chat.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <textarea
                            rows="3"
                            cols="25"
                            defaultValue={this.props.chat}
                            ref={this.chattext}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                    <div>
                        <button onClick={this.submitChat}>Send</button>
                    </div>
                </div>
                <div className="privateChat">
                    <h1>Private Chat</h1>
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
    console.log("state for chats", state.onlineusers);

    return {
        chats: state.chats && state.chats.filter(chat => chat),
        users: state.onlineusers && state.onlineusers.filter(user => user)
    };
};

export default connect(mapStateToProps)(Chatting);
