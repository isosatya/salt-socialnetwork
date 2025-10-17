import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { receiveFriends, acceptFriendReq, rejectFriendReq, cancelFriendship } from "./actions";
import { UI_TEXT, DEFAULT_PROFILE_IMAGE } from "../constants";

// Component displaying user's friends list with pending and accepted friendships
class FriendsList extends Component {
    componentDidMount() {
        // Fetch user's friends list from server
        this.props.dispatch(receiveFriends());
    }

    render() {
        if (!this.props.friends) {
            console.log("Friends list is empty");
            return null;
        }

        return (
            <div>
                <p className="titleFriendsList">{UI_TEXT.PENDING_BUDDIES}</p>
                <div className="friendsPageContainer">
                    {this.props.wannabes.map(wannabe => (
                        <div key={wannabe.id}>
                            <div className="friendsListProfContainer">
                                <Link to={`/user/${wannabe.id}`}>
                                    <div className="profilePicContainer">
                                        <img
                                            className="profilePic"
                                            src={wannabe.imgurl || DEFAULT_PROFILE_IMAGE}
                                            alt={`${wannabe.first} ${wannabe.last}`}
                                        />
                                        <div className="nameProfPic">
                                            {`${wannabe.first} ${wannabe.last}`}
                                        </div>
                                    </div>
                                </Link>
                                <div className="friendsButtonContainer">
                                    <button
                                        className="addFriendButton friendsPageButton"
                                        onClick={e =>
                                            this.props.dispatch(
                                                rejectFriendReq(wannabe.id)
                                            )
                                        }
                                    >
                                        Reject Friend Request
                                    </button>
                                    <button
                                        className="addFriendButton friendsPageButton"
                                        onClick={e =>
                                            this.props.dispatch(
                                                acceptFriendReq(wannabe.id)
                                            )
                                        }
                                    >
                                        Accept Friend Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="titleFriendsList">{UI_TEXT.ALREADY_BUDDIES}</p>
                <div className="friendsPageContainer">
                    {this.props.friends.map(friend => (
                        <div key={friend.id}>
                            <Link to={`/user/${friend.id}`}>
                                <div className="profilePicContainer acceptedFriendProfile">
                                    <img
                                        className="profilePic"
                                        src={friend.imgurl || DEFAULT_PROFILE_IMAGE}
                                        alt={`${friend.first} ${friend.last}`}
                                    />
                                    <div className="nameProfPic">
                                        {`${friend.first} ${friend.last}`}
                                    </div>
                                </div>
                            </Link>
                            <div className="friendsButtonContainer">
                                <button
                                    className="addFriendButton friendsPageButton acceptedFriendButton"
                                    onClick={e =>
                                        this.props.dispatch(
                                            cancelFriendship(friend.id)
                                        )
                                    }
                                >
                                    Unfriend
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

// Map Redux state to component props
const mapStateToProps = state => {
    return {
        friends:
            state.listFriends &&
            state.listFriends.filter(friend => friend.accepted === true),
        wannabes:
            state.listFriends &&
            state.listFriends.filter(wannabe => wannabe.accepted === false)
    };
};

export default connect(mapStateToProps)(FriendsList);
