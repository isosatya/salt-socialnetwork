import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Wrapper from "./components/wrapperWelcome";
////////////////////////// part needed for REDUX:
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./components/reducers";
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
///////////////////////// end REDUX

//////////////////////// Setting for using SOCKET (Chat)
import { initSocket } from "./components/socket";

// here i have to do let elem, if location.href = /welcome, then elem = <Registration />
// if location.href = /, then elem = <App />
// so the only way to go to login would be via the registration mask

let Elem;

console.log("i am at start.js");

if (location.pathname == "/welcome") {
    Elem = <Wrapper />;
} else {
    initSocket(store);
    Elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(Elem, document.querySelector("main"));

// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }
