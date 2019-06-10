import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProfilePic from "./profilePic";

function FindPeople() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            let results = await axios.get(`/users/recent`);
            // console.log("results from recent", typeof results.data);
            // console.log("length of results from recent", results.data);
            setUsers(results.data);
        })();

        return () => {
            (async () => {
                let matches = await axios.get(`/users/${search}`);
                if (error) {
                    setUsers([]);
                    setError("User not found!");
                }
                console.log("results from search", matches.data);
                console.log(
                    "Array.isArry for results from search",
                    Array.isArray(matches.data)
                );
                // setUsers(matches.data);
            })();
        };
    }, [search, setUsers]);

    return (
        <div>
            <input
                onChange={e => setSearch(e.target.value)}
                defaultValue={search}
            />
            <div>
                <p>{error}</p>
                {users.map(user => (
                    <React.Fragment key={user.id}>
                        <div>
                            <div>
                                <ProfilePic
                                    first={user.first}
                                    last={user.last}
                                    imgurl={user.imgurl}
                                />
                            </div>
                            <p>
                                {user.first} {user.last}
                            </p>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default FindPeople;
