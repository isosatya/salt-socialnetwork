import React, { Component } from "react";
import axios from "axios";
import ProfilePic from "./profilePic";
import FriendButton from "./friendButton";

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get("/otheruser/" + this.props.match.params.id).then(resp => {
            if (resp.data.error == 1) {
                alert("Please enter another Profile number for the search");
                this.props.history.push("/");
            } else if (resp.data.error == 2) {
                alert("User not found!");
                this.props.history.push("/");
            } else {
                this.setState(resp.data[0]);
            }
        });
    }

    render() {
        return (
            <div className="profileContainer">
                <div className="profilePicContainer">
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        imgurl={this.state.imgurl}
                    />
                    <div className="nameProfPic">
                        {this.state.first} {this.state.last}
                    </div>
                </div>
                <div className="bioContainer">
                    <div className="bioText otherProfBio">
                        <p>{this.state.bio}</p>
                    </div>
                    <div>
                        <FriendButton match={this.props.match.params.id} />
                    </div>
                </div>
            </div>
        );
    }
}

export default OtherProfile;
