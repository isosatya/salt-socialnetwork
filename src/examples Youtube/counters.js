// ircr or imrc (algo asi) shortcut for this
import React, { Component } from "react";
import Counter from "./counter";

// cc shortcut for class counters extends...
class Counters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counters: [
                { id: 1, value: 4 },
                { id: 2, value: 0 },
                { id: 3, value: 0 },
                { id: 4, value: 0 }
            ]
        };
    }

    // handleIncrement(counter) {
    //     console.log("clicked on handleIncrement");
    //     const counters = [...this.state.counters];
    //     const index = counters.indexOf(counter);
    //     counters[index] = { ...counter };
    //     counters[index].value++;
    //     this.setState({ counters });
    //     console.log(this.state.counters);
    // }

    // handleReset() {
    //     this.state.counters.map(c => {
    //         c.value = 0;
    //         return c;
    //     });
    //     this.setState({ counters });
    // }

    // handleDelete(counterId) {
    //     console.log("Event Handler Called", counterId);

    //     const counters = this.state.counters.filter(c => c.id !== counterId);
    //     this.setState({ counters: counters });
    // }

    render() {
        // console.log("props inside the Counters", this.props);

        return (
            <div>
                {/* I change {this.handleReset} with {this.props.onReset}
            because i want to emit the property to the App component
            When i want to emit to other levels I use this.props */}
                <button onClick={this.props.onReset}>Reset</button>
                {/* changed from this.state.counters to this.props.counters, si I can bubble 
                the values to App.js */}
                {this.props.counters.map(counter => (
                    <Counter
                        key={counter.id} // this is internally used in the component
                        onDelete={this.props.onDelete}
                        onIncrement={this.props.onIncrement}
                        counter={counter}
                        //// we dont need this anymore becuase we replace it with the counter object itself
                        // value={counter.value}
                        // selected={true}
                        // id={counter.id} // we pass this as a prop so it can be accessed from outside
                    >
                        <h4>Counter #{counter.id}</h4>
                    </Counter>
                ))}
            </div>
        );
    }
}

export default Counters;
