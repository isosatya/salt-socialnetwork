import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Login extends Component {
    constructor() {
        super();
        this.state = {
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
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(results => {
                if (results.data.error) {
                    this.setState({
                        error: results.data.error
                    });
                } else if (results.data.userId) {
                    location.href = "/";
                }
            })
            .catch(function(err) {
                console.log("Error for post route /login", err);
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
                <p className="errorMsg">{this.state.error}</p>
            </form>
        );
    }
}

export default Login;
