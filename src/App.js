import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import axios from "axios";
import Welcome_logo from "./components/welcome_logo";
import Profile from "./components/profile";
import Uploader from "./components/uploader";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { uploader: false };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.uploadPic = this.uploadPic.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    componentDidMount() {
        axios.get("/user").then(results => {
            this.setState(results.data[0]);
        });
    }

    toggleUploader() {
        this.state.uploader
            ? this.setState({ uploader: false })
            : this.setState({ uploader: true });
    }

    handleFileChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    uploadPic() {
        var formData = new FormData();
        formData.append("file", this.state.file);

        axios
            .post("/upload", formData)
            .then(resp => {
                console.log("picture uploaded", resp.data);
                this.setState({
                    imgurl: resp.data,
                    file: null,
                    uploader: false
                });
            })
            .catch(function(err) {
                console.log("Error when uploading picture", err);
            });
    }

    render() {
        return (
            <div>
                <Welcome_logo />
                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    email={this.state.email}
                    bio={this.state.bio}
                    imgurl={this.state.imgurl}
                    created_at={this.state.created_at}
                    toggle={this.toggleUploader}
                />
                {this.state.uploader && (
                    <Uploader
                        upload={this.uploadPic}
                        file={this.handleFileChange}
                    />
                )}
            </div>
        );
    }
}

export default App;
