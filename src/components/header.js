import React, { Component } from "react";

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
