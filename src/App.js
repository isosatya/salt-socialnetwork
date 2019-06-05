import React, { Component } from "react";
import { directive } from "@babel/types";
import Counters from "./components/counters";

class App extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleIncrement = this.handleIncrement.bind(this);
    }

    handleIncrement(counter) {
        console.log("clicked on handleIncrement");
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index] = { ...counter };
        counters[index].value++;
        this.setState({ counters: counters });
        console.log(this.state.counters);
    }

    handleReset() {
        this.state.counters.map(c => {
            c.value = 0;
            return c;
        });
        this.setState({ counters: counters });
    }

    handleDelete(counterId) {
        console.log("Event Handler Called", counterId);

        const counters = this.state.counters.filter(c => c.id !== counterId);
        this.setState({ counters: counters });
    }

    render() {
        return (
            <div>
                <Counters
                    //    Here i just receive the counters data from other components
                    counters={this.state.counters}
                    onDelete={this.handleDelete}
                    onIncrement={this.handleIncrement}
                    onReset={this.handleReset}
                />
            </div>
        );
    }
}

export default App;
