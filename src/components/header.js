import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Header({ imgurl, first, last }) {
    return (
        <div className="headerContainer">
            <div className="headerLogo">
                <p className="textHeaderLogo" id="paw">
                    Paw
                </p>
                <img src="/paw.png" id="pawHeaderLogo" />
                <p className="textHeaderLogo" id="gang">
                    Gang
                </p>
            </div>
            <div className="menuContainer">
                <Link to={`/`}>
                    <p className="menuHeader">Profile</p>
                </Link>
                <Link to={`/friends`}>
                    <p className="menuHeader">Gang Buddies</p>
                </Link>
                <Link to={`/users/`}>
                    <p className="menuHeader">Search Mobsters</p>
                </Link>
                <Link to={`/chat`}>
                    <p className="menuHeader">Bark Chat</p>
                </Link>
            </div>
            <div className="headerPicContainer">
                <p className="headerMessage">Welcome,</p>
                <p className="headerMessage">{first + " " + last}</p>
                <img
                    className="headerPic"
                    src={imgurl ? imgurl : "./uglydog.jpg"}
                    alt={first + " " + last}
                />
            </div>
        </div>
    );
}

export default Header;
