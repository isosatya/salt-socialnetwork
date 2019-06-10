import React, { Component } from "react";

function Welcome_logo() {
    return (
        <div>
            <div className="mainLogo">
                <p className="textLogo" id="paw">
                    Paw
                </p>
                <img src="/paw.png" id="pawLogo" />
                <p className="textLogo" id="gang">
                    Gang
                </p>
                <p id="paragLogo">The evil version of Paw Patrol...</p>
            </div>
        </div>
    );
}

export default Welcome_logo;
