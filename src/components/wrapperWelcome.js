import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import Welcome_logo from "./welcome_logo";
import Registration from "./registration";
import Login from "./login";

function Wrapper() {
    return (
        <div>
            <Welcome_logo />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}

export default Wrapper;
