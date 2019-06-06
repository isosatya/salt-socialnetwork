import React, { Component } from "react";
// import { HashRouter, Route } from "react-router-dom";
import ProfilePic from "./profilePic";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <ProfilePic
                    first={this.props.first}
                    last={this.props.last}
                    imgurl={this.props.imgurl}
                    toggle={this.props.toggle}
                />
            </div>
        );
    }
}

export default Profile;
