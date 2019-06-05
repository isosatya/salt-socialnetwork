import React, { Component } from "react";

class Counter extends Component {
    constructor(props) {
        super(props);

        ////// We delete this state property, because states cannot be accessed outside of the
        // component, not even from their parent
        // instead we use "controlled Component", which doesnt have it local state
        // it receives all the data via props, and raises events whenever data needs to be changed. It all controlled by its parent

        // this.state = {
        //     value: this.props.counter.value,
        //     imageUrl: "https://picsum.photos/200",
        //     tags: []
        // };

        ////////////////// this is what i have to do if i dont use an () => {} at handleIncrement

        // this.doHandleIncrement = this.doHandleIncrement.bind(this);

        // this.styles = {
        //     fontWeight: "bold",
        //     fontSize: 20
        // };
    }

    renderTags() {
        if (this.state.tags.length === 0) return <p>There are no tags!</p>;

        return (
            <ul>
                {this.state.tags.map(tag => (
                    <li key={tag}>{tag}</li>
                ))}
            </ul>
        );
    }
    //// we dont need this anymore either, because all data will be controlled by parent
    // handleIncrement(product) {
    //     console.log(product);
    //     // console.log("increment clicked", this.state.count);
    //     this.setState({ value: this.state.value + 1 });
    // }

    ////// this is in the case I want to execute a function on an event and pass it an extra argument for consideration (i.e. Id of the element I am clicking on)
    // doHandleIncrement() {
    //     this.handleIncrement({ id: 1 });
    // }

    render() {
        // console.log("props inside the render of Counter", this.props);
        // console.log("props inside the render of Counter", this.props.id);

        return (
            // <React.Fragment>
            <div>
                {this.props.children}
                <span
                    style={{ fontSize: 30 }}
                    className={this.getBadgeClasses()}
                >
                    {this.formatCount()}
                </span>
                {/* We get rid of this method here */}
                {/* <button onClick={() => this.handleIncrement({ id: 1 })}> */}
                <button
                    onClick={() => this.props.onIncrement(this.props.counter)}
                >
                    Increment
                </button>
                <button
                    onClick={() => this.props.onDelete(this.props.counter.id)}
                >
                    Delete
                </button>

                {/* {this.state.tags.length === 0 && "Please Create a new Tag"}
                {this.renderTags()} */}
            </div>
            // </React.Fragment>
        );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.props.counter.value === 0 ? "warning" : "primary";
        return classes;
    }
    ///// wherever I had "this.state" needs to be replaced by "this.props.counter", becuase of the "controlled component"
    formatCount() {
        const { value: count } = this.props.counter;

        return count === 0 ? "Zero" : count;
    }
}

export default Counter;
