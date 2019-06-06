import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Registration extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
            error: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password
            })
            .then(results => {
                if (results.data.error == 23505) {
                    this.setState({
                        error: "e-Mail already registered!"
                    });
                } else if (results.data.error) {
                    this.setState({
                        error: "Something went wrong, please try again!"
                    });
                } else if (results.data.userId) {
                    location.href = "/";
                }
            })
            .catch(function(err) {
                console.log("Error for post route /register", err);
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            name="first"
                            className="formField"
                            value={this.state.first}
                            onChange={this.handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Surname
                        <input
                            name="last"
                            className="formField"
                            value={this.state.last}
                            onChange={this.handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        e-Mail
                        <input
                            name="email"
                            className="formField"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password
                        <input
                            name="password"
                            className="formField"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Submit</button>
                <p className="errorMsg">{this.state.error}</p>
                <Link to="/login">Login!</Link>
            </form>
        );
    }
}

export default Registration;
