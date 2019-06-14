import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import useUpdateFriendship from "./updateFriendship";

function FriendButton(match) {
    const [button, setButton] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            axios.post("/friendship/" + match.match).then(results => {
                if (results.data.status == 1) {
                    setButton("Send Friend Request");
                }
                if (results.data.status == 2) {
                    setButton("Accept Friend Request");
                }
                if (results.data.status == 3) {
                    setButton("Cancel Friend Request");
                }
                if (results.data.status == 4) {
                    setButton("Unfriend");
                }
            });
        })();
    }, [button]);

    function UpdateFriendship() {
        if (button === "Send Friend Request") {
            axios.post("/sendfriendreq/" + match.match).then(results => {
                if (results.data.success) {
                    setButton("");
                } else {
                    setError(true);
                }
            });
        }
        if (button === "Cancel Friend Request" || button === "Unfriend") {
            axios.post("/cancelfriendship/" + match.match).then(results => {
                if (results.data.success) {
                    setButton("");
                }
            });
        }
        if (button === "Accept Friend Request") {
            axios.post("/acceptfriendship/" + match.match).then(results => {
                if (results.data.success) {
                    setButton("");
                } else {
                    setError(true);
                }
            });
        }
    }

    return (
        <div>
            {error && <p>Something went wrong!</p>}
            <div>
                <button className="addFriendButton" onClick={UpdateFriendship}>
                    {button}
                </button>
            </div>
        </div>
    );
}

export default FriendButton;
