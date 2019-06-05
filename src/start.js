import React from "react";
import ReactDOM from "react-dom";
// import { HashRouter, Route } from "react-router-dom";
// import Welcome_logo from "./components/welcome_logo";
import Registration from "./components/registration";
import App from "./App";
import Wrapper from "./components/wrapperWelcome";

// here i have to do let elem, if location.href = /welcome, then elem = <Registration />
// if location.href = /, then elem = <App />
// so the only way to go to login would be via the registration mask

let Elem;

if (location.pathname == "/welcome") {
    Elem = Wrapper;
} else {
    Elem = App;
}

ReactDOM.render(<Elem />, document.querySelector("main"));

// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }
