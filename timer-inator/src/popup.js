import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();

        this.state = {
            hr: 0,
            min: 0,
            sec: 0
        }

        this.hrInput = React.createRef;
        this.minInput = React.createRef;
        this.secInput = React.createRef;

        this.inputHandler = this.inputHandler.bind(this);
        this.convertToSeconds = this.convertToSeconds.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    inputHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    convertToSeconds = (hr, min, sec) => {
        return sec + min * 60 + hr * 60 * 60;
    }

    startTimer = () => {
        this.timer = setInterval(this.countDown, 1000);
    }

    countDown = () => {
        const { hr, min, sec } = this.state;
        let c_seconds = this.convertToSeconds(hr, min, sec);

        if (c_seconds) {

            // seconds change
            sec ? this.setState({ sec: sec - 1 }) : this.setState({ sec: 59 });

            // minutes change
            if (c_seconds % 60 === 0 && min) {
                this.setState({ min: min - 1 });
            }

            // when only hours entered
            if (!min && hr) {
                this.setState({ min: 59 });
            }

            // hours change
            if (c_seconds % 3600 === 0 && hr) {
                this.setState({ hr: hr - 1 });
            }

        } else {
            clearInterval(this.timer);
        }
    }


    stopTimer = () => {
        clearInterval(this.timer);
    }

    resetTimer = () => {
        this.setState({
            hr: 0,
            min: 0,
            sec: 0
        });
        this.hrInput.current.value = 0;
        this.minInput.current.value = 0;
        this.secInput.current.value = 0;
    }

    render() {
        const { hr, min, sec } = this.state;

        return (
            <div className="App">
                <h3 style="text-align: center;"> Set Timer </h3>
                <div style="text-align: center;" >
                    <h3 style="font:medium;">hour:  min:  sec:</h3>
                </div>
                <div className="inputGroup">
                    <h3>Hrs</h3>
                    <input ref={this.hrInput} type="number" name="hours" onChange={this.inputHandler} style="width: 20%;" min="0" max="23" value="0" />
                    <h3>Min</h3>
                    <input ref={this.minInput} type="number" name="minutes" onChange={this.inputHandler} style="width: 20%;" min="0" max="59" value="0" />
                    <h3>Sec</h3>
                    <input ref={this.secInput} type="number" name="seconds" onChange={this.inputHandler} style="width: 20%;" min="0" max="59" value="0" />
                </div>
                <div>
                    <button onClick={this.startTimer} className="start">start</button>
                    <button onClick={this.stopTimer} className="stop">stop</button>
                    <button onClick={this.resetTimer} className="reset">reset</button>
                </div>
                <h1> Timer {hr}: {min} : {sec} </h1>
            </div>
        );
    }
}

export default App;