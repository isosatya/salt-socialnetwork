import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        // e.preventDefault();
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(results => {
                if (results.data.error) {
                    this.setState({
                        error: "Something went wrong! Please try again!"
                    });
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
            </form>
        );
    }
}

export default Login;
