import React, { Component } from "react";
// import { HashRouter, Route } from "react-router-dom";

class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <img
                    className="profilePic"
                    src={
                        this.props.imgurl ? this.props.imgurl : "./uglydog.jpg"
                    }
                    alt={this.props.first + " " + this.props.last}
                    onClick={this.props.toggle}
                />
            </div>
        );
    }
}

export default ProfilePic;
