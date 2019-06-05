import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import Welcome_logo from "./components/welcome_logo";
import Registration from "./components/registration";
import Login from "./components/login";

// import Wrapper from "./components/wrapperWelcome";

function Wrapper() {
    return (
        <div>
            <Welcome_logo />
            <HashRouter>
                <div>
                    <Route exact path="/welcome" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}

ReactDOM.render(<Wrapper />, document.querySelector("main"));

// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }
