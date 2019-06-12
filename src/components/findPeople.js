import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProfilePic from "./profilePic";
import { Link } from "react-router-dom";

function FindPeople() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            if (search == "") {
                let results = await axios.get(`/users/recent`);
                setUsers(results.data);
            } else {
                setError("");
                let matches = await axios.get(`/users/${search}`);
                if (matches.data.error) {
                    setError("User not found!");
                }
                setUsers(matches.data);
            }
        })();
    }, [search]);

    return (
        <div>
            <input
                onChange={e => setSearch(e.target.value)}
                defaultValue={search}
            />
            <div>
                {error && <p className="errorMsg">{error}</p>}
                {Array.isArray(users) &&
                    users.map(user => (
                        <React.Fragment key={user.id}>
                            <Link to={`/user/${user.id}`}>
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
                            </Link>
                        </React.Fragment>
                    ))}
            </div>
        </div>
    );
}

export default FindPeople;
