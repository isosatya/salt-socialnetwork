import React, { Component } from "react";

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <div className="boxUploader">
                    <h3>Upload the image you would like for your Profile</h3>
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
