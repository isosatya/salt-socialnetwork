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
                setError("");
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
        <div className="findPeopleContainer">
            <div className="searchArea">
                <label className="searchLabel">Search Users by Name</label>
                <input
                    onChange={e => setSearch(e.target.value)}
                    defaultValue={search}
                    className="searchFormField"
                />
                {error && <p className="errorMsg">{error}</p>}
            </div>
            <div className="searchResults">
                {Array.isArray(users) &&
                    users.map(user => (
                        <React.Fragment key={user.id}>
                            <div>
                                <Link to={`/user/${user.id}`}>
                                    <div>
                                        <div className="searchProfilePicContainer">
                                            <ProfilePic
                                                first={user.first}
                                                last={user.last}
                                                imgurl={user.imgurl}
                                            />
                                            <p className="searchNameProfPic">
                                                {user.first} {user.last}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </React.Fragment>
                    ))}
            </div>
        </div>
    );
}

export default FindPeople;
