import React, { Component } from "react";

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="overlay">
                <div className="boxUploader">
                    <p id="closeUploader" onClick={this.props.toggle}>
                        X
                    </p>
                    <h3>Fancy changing your profile picture?</h3>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={this.props.file}
                    />
                    <button onClick={this.props.upload}>Upload</button>
                </div>
            </div>
        );
    }
}

export default Uploader;
