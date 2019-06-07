import React, { Component } from "react";
// import { HashRouter, Route } from "react-router-dom";
import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";

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
                <div>
                    {this.props.first} {this.props.last}
                </div>
                <BioEditor
                    bio={this.props.bio}
                    handleChange={this.props.handleChange}
                    handleSubmit={this.props.handleSubmit}
                />
            </div>
        );
    }
}

export default Profile;
