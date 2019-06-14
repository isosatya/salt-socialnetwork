import React, { Component } from "react";
import { connect } from "react-redux";
import { receiveFriends } from "./actions";

class FriendsList extends Component {
    componentDidMount() {
        // in function components: props.dispatch()
        this.props.dispatch(receiveFriends());
    }

    render() {
        console.log(
            "this.props.friends in friendsList component",
            this.props.friends
        );

        if (!this.props.friends) {
            return null;
        }

        return (
            <div>
                <h1>Pending Invitations</h1>
                {this.props.wannabes.map(wannabe => (
                    <div key={wannabe.id}>
                        <div className="profilePicContainer">
                            <img
                                className="profilePic"
                                src={
                                    wannabe.imgurl
                                        ? wannabe.imgurl
                                        : "./uglydog.jpg"
                                }
                                alt={wannabe.first + " " + wannabe.last}
                            />
                            <div className="nameProfPic">
                                {wannabe.first} {wannabe.last}
                            </div>
                        </div>
                    </div>
                ))}
                <h1>Already Friends</h1>
                {this.props.friends.map(friend => (
                    <div key={friend.id}>
                        <div className="profilePicContainer">
                            <img
                                className="profilePic"
                                src={
                                    friend.imgurl
                                        ? friend.imgurl
                                        : "./uglydog.jpg"
                                }
                                alt={friend.first + " " + friend.last}
                            />
                            <div className="nameProfPic">
                                {friend.first} {friend.last}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("state in map.StateToProps in friendsList component:", state);

    return {
        // call this property however you want --> thats the name the props will receive for this component
        // listAnimals is coming from the REDUCER file
        friends:
            state.listFriends &&
            state.listFriends.filter(friend => friend.accepted === true),

        wannabes:
            state.listFriends &&
            state.listFriends.filter(wannabe => wannabe.accepted === false)
    };
};

// .filter(friend => friend.accepted === true)

// const result = words.filter(word => word.length > 6);

export default connect(mapStateToProps)(FriendsList);
