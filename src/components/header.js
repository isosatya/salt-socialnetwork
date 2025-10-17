import React from "react";
import { Link } from "react-router-dom";
import { UI_TEXT, DEFAULT_PROFILE_IMAGE } from "../constants";

// Header component displaying app logo, navigation menu, and user info
function Header({ imgurl, first, last }) {
    return (
        <div className="headerContainer">
            <div className="headerLogo">
                <p className="textHeaderLogo" id="paw">
                    {UI_TEXT.APP_NAME.split(' ')[0]}
                </p>
                <img src="/paw.png" id="pawHeaderLogo" alt="Paw logo" />
                <p className="textHeaderLogo" id="gang">
                    {UI_TEXT.APP_NAME.split(' ')[1]}
                </p>
            </div>
            <div className="menuContainer">
                <Link to={`/`}>
                    <p className="menuHeader">{UI_TEXT.PROFILE}</p>
                </Link>
                <Link to={`/friends`}>
                    <p className="menuHeader">{UI_TEXT.GANG_BUDDIES}</p>
                </Link>
                <Link to={`/users/`}>
                    <p className="menuHeader">{UI_TEXT.SEARCH_MOBSTERS}</p>
                </Link>
                <Link to={`/chat`}>
                    <p className="menuHeader">{UI_TEXT.BARK_CHAT}</p>
                </Link>
            </div>
            <div className="headerPicContainer">
                <p className="headerMessage">{UI_TEXT.WELCOME_MESSAGE}</p>
                <p className="headerMessage">{`${first} ${last}`}</p>
                <img
                    className="headerPic"
                    src={imgurl || DEFAULT_PROFILE_IMAGE}
                    alt={`${first} ${last}`}
                />
            </div>
        </div>
    );
}

export default Header;
