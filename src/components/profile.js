import React, { Component } from "react";
// import { HashRouter, Route } from "react-router-dom";
import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";
import axios from "axios";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.logout = this.logout.bind(this);
        this.delete = this.delete.bind(this);
    }

    logout() {
        axios.get("/logout").then(() => {
            location.reload();
        });
    }

    delete() {
        axios.get("/delete").then(() => {
            console.log("user deleted");
            location.reload();
        });
    }

    render() {
        return (
            <div className="profileContainer">
                <div className="profilePicContainer">
                    <ProfilePic
                        first={this.props.first}
                        last={this.props.last}
                        imgurl={this.props.imgurl}
                        toggle={this.props.toggle}
                    />
                    <div className="nameProfPic">
                        {this.props.first} {this.props.last}
                    </div>
                </div>
                <div className="bioContainer">
                    <BioEditor
                        bio={this.props.bio}
                        handleChange={this.props.handleChange}
                        handleSubmit={this.props.handleSubmit}
                    />
                    <button onClick={this.delete} id="deleteProfButton">
                        Delete Profile
                    </button>
                    <button onClick={this.logout} id="logoutProfButton">
                        Logout
                    </button>
                </div>
            </div>
        );
    }
}

export default Profile;
