import React, { Component } from "react";
import { connect } from "react-redux";

import { getListOfAnimals } from "./actions";

class CuteAnimals extends Component {
    componentDidMount() {
        // in function components: props.dispatch()
        this.props.dispatch(getListOfAnimals());
    }

    render() {
        // if its a function component its just (props)
        console.log("this.props at cuteAnimals", this.props);

        if (!this.props.myAnimals) {
            return null;
        }

        return (
            <div>
                <h1>REDUXXXXXXX</h1>
                {this.props.myAnimals.length &&
                    this.props.myAnimals.map(anim => (
                        <div key={anim}> {anim} </div>
                    ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("state in map.StateToProps:", state);

    return {
        // call this property however you want --> thats the name the props will receive for this component
        // listAnimals is coming from the REDUCER file
        myAnimals: state.listAnimals
    };
};

export default connect(mapStateToProps)(CuteAnimals);
