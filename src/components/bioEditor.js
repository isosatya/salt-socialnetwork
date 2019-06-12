import React, { Component } from "react";

class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false
        };
        this.editViewMode = this.editViewMode.bind(this);
        this.wrapper = this.wrapper.bind(this);
    }

    editViewMode() {
        this.state.editable == true
            ? this.setState({ editable: false })
            : this.setState({ editable: true });
    }

    wrapper(e) {
        this.props.handleSubmit(e);
        this.editViewMode();
    }

    render() {
        return (
            <div className="bioInsideContainer">
                {(() => {
                    if (this.props.bio == "" || this.props.bio == null) {
                        return (
                            <button
                                onClick={this.editViewMode}
                                className="submitButton"
                            >
                                Add Bio
                            </button>
                        );
                    } else {
                        return null;
                    }
                })()}
                {this.props.bio != null &&
                    (this.props.bio != "" && (
                        <button
                            onClick={this.editViewMode}
                            className="editAddBioButton"
                        >
                            Edit bio
                        </button>
                    ))}
                {this.state.editable == true && (
                    <div className="bioTextContainer">
                        <div>
                            <textarea
                                rows="10"
                                cols="50"
                                onChange={this.props.handleChange}
                                defaultValue={this.props.bio}
                                id="bioTextArea"
                            />
                        </div>
                        <button id="saveBio" onClick={this.wrapper}>
                            Save
                        </button>
                    </div>
                )}
                {this.state.editable != true && (
                    <div className="bioText">
                        <p>{this.props.bio}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default BioEditor;
