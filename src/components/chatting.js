import React, { Component } from "react";
import { connect } from "react-redux";
import { chatMessages } from "./actions";

class Chatting extends Component {
    componentDidMount() {
        // this.props.dispatch(chatMessages());
    }

    render() {
        console.log(
            "this.props.friends in Chatting component",
            this.props.chats
        );

        if (!this.props.chats) {
            return null;
        }

        return (
            <div>
                <div className="chatWindow">
                    <h1>THIS IS THE CHAT WINDOW</h1>
                    <div>
                        {this.props.chats.map(chat => (
                            <div key={chat.id}>
                                <p>{chat.text}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                    <textarea
                                rows="10"
                                cols="15"
                                onChange={this.props.handleChange}
                            />
                    </div>
                    <div>
                        <button
                            className=""
                            onClick={e => this.props.dispatch(chatMessage())}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

handleChange(e) {
    this.setState({ bio: e.target.value });
}

handleSubmit(e) {
    e.preventDefault();
    axios.post("/updatebio", { bio: this.state.bio });
}

const mapStateToProps = state => {
    // console.log("state in map.StateToProps in friendsList component:", state);
    return {
        chats: state.chats
    };
};

export default connect(mapStateToProps)(Chatting);
