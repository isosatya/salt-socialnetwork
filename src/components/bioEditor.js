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
            <div>
                {this.props.bio == null && (
                    <button onClick={this.editViewMode}>Add Bio</button>
                )}
                {this.props.bio != null && (
                    <button onClick={this.editViewMode}>Edit bio</button>
                )}
                {this.state.editable == true && (
                    <div>
                        <textarea
                            rows="10"
                            cols="50"
                            onChange={this.props.handleChange}
                            defaultValue={this.props.bio}
                        />
                        <button onClick={this.wrapper}>Save</button>
                    </div>
                )}
                {this.state.editable != true && (
                    <div>
                        <p>{this.props.bio}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default BioEditor;
