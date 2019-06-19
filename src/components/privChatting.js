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
        this.chatwindow = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.submitChat = this.submitChat.bind(this);
    }
    componentDidMount() {
        if (this.chatwindow.current) {
            this.chatwindow.current.offsetParent.scrollTop =
                this.chatwindow.current.scrollHeight -
                this.chatwindow.current.offsetParent.clientHeight;
        }
    }

    componentDidUpdate() {
        if (this.chatwindow.current) {
            // console.log(this.chatwindow);

            // console.log(
            //     "scroll height PARENT",
            //     this.chatwindow.current.offsetParent.scrollHeight
            // );
            // console.log(
            //     "client height PARENT",
            //     this.chatwindow.current.offsetParent.clientHeight
            // );

            // console.log(
            //     "this windows scroll height",
            //     this.chatwindow.current.scrollHeight
            // );
            // console.log(
            //     "this windows client height",
            //     this.chatwindow.current.clientHeight
            // );

            // console.log(
            //     "offsetHeight",
            //     this.chatwindow.current.offsetParent.offsetHeight
            // );
            // console.log(
            //     "offsetTop",
            //     this.chatwindow.current.offsetParent.offsetTop
            // );

            this.chatwindow.current.offsetParent.scrollTop =
                this.chatwindow.current.scrollHeight -
                this.chatwindow.current.offsetParent.clientHeight;
        }
    }

    handleChange(e) {
        this.setState({ chat: e.target.value });
        // console.log("this.state.chat", this.state.chat);
    }

    submitChat() {
        if (this.chattext.current.value != "") {
            socket.emit("privateChatMessage", this.state.chat);
            // console.log("this.chattext.current", this.chattext);
            this.chattext.current.value = "";
        }
    }

    render() {
        if (!this.props.chats) {
            console.log("this.props.chats is null");

            return null;
        }

        // console.log("this.props at private chatting", this.props);

        return (
            <div className="privChatsContainer">
                <h1>Private Chats</h1>

                <div className="chatWindow" ref={this.chatwindow}>
                    {this.props.chats && (
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
                    )}
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
