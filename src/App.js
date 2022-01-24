import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      input: '',
      inputIsFloat: false,
      lastInput: '',
      lastInputNeg: false,
      nextOperator: ''
    }
    this.handleReset = this.handleReset.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleReset = () => {
    function defaultState() {
      return {
      value: 0,
      input: '',
      inputIsFloat: false,
      lastInput: '',
      nextOperator: ''
    }}
    this.setState(
      defaultState()
    )
  }

  handleNumber = (event) => {
    if(event.target.value === '.') {
      if(!this.state.inputIsFloat) {
        this.setState({
          input: this.state.input.concat(event.target.value),
          inputIsFloat: true,
          lastInput: 'NUM'
        })
      }
    } else if(this.state.input === '' && event.target.value === '0') {
      this.setState({
        input: ''
      })
    } else {
      this.setState({
        input: this.state.input.concat(event.target.value), 
        lastInput: 'NUM'
      })
    }
  }

  handleOperator = (event) => {
    if(this.state.lastInput === 'NUM') {
      this.calculate();
      this.setState({
        nextOperator: event.target.value,
        lastInput: 'OP',
        lastInputNeg: false
      });
    } else {
      if(event.target.value === '-') {
        this.setState({
          input: event.target.value.concat(this.state.input),
          lastInputNeg: true
        })
      } else if(this.state.nextOperator !== '='){
        if(this.state.lastInputNeg) {
          this.setState({
            input: this.state.input.substring(1),
            nextOperator: event.target.value,
            lastInputNeg: false
          })
        }
      } else {
        this.setState({
          nextOperator: event.target.value,
          lastInputNeg: false
        })
      }
    }}
    
  calculate = () => {
    if(this.state.input !== '') {
      switch (this.state.nextOperator) {
        case '+':
          this.setState({
            value: this.state.value + parseFloat(this.state.input),
            input: '',
            inputIsFloat: false
          });
          break;
        case '-':
          this.setState({
            value: this.state.value - parseFloat(this.state.input),
            input: '',
            inputIsFloat: false
          });
          break;
        case '*':
          this.setState({
            value: this.state.value * parseFloat(this.state.input),
            input: '',
            inputIsFloat: false
          });
          break;
        case '/':
          this.setState({
            value: this.state.value / parseFloat(this.state.input),
            input: '',
            inputIsFloat: false
          });
          break;
        default:
          this.setState({
            value: parseFloat(this.state.input),
            input: '',
            inputIsFloat: false
          })
      }
    }
  }
  
  render() {
    return (
      <div id='main'>
        <div className='center'>
          <div id='calculator' className='container'>
            <div className='display'>
              <Display 
                value={this.state.value}
                input={this.state.input}
                lastInput={this.state.lastInput}
                nextOperator={this.state.nextOperator}
              />
            </div>
            <div className='buttons'>
              <Buttons 
                handleReset={this.handleReset}
                handleOperator={this.handleOperator}
                handleNumber={this.handleNumber}
              />
            </div>
          </div>
          <DesignedBy />  
        </div>   
      </div>
    );
  }
}

class Buttons extends Component {
  render() {
    return(
      <div id='buttons'>
        <button
          id='clear'
          onClick={this.props.handleReset}
        >
          Clear
        </button>
        <button
          id='divide'
          onClick={this.props.handleOperator}
          value='/'
        >
          /
        </button>
        <button
          id='multiply'
          onClick={this.props.handleOperator}
          value='*'
        >
          x
        </button>
        <button
          id='seven'
          onClick={this.props.handleNumber}
          value='7'
        >
          7
        </button>
        <button
          id='eight'
          onClick={this.props.handleNumber}
          value='8'
        >
          8
        </button>
        <button
          id='nine'
          onClick={this.props.handleNumber}
          value='9'
        >
          9
        </button>
        <button
          id='subtract'
          onClick={this.props.handleOperator}
          value='-'
        >
          -
        </button>
        <button
          id='four'
          onClick={this.props.handleNumber}
          value='4'
        >
          4
        </button>
        <button
          id='five'
          onClick={this.props.handleNumber}
          value='5'
        >
          5
        </button>
        <button
          id='six'
          onClick={this.props.handleNumber}
          value='6'
        >
          6
        </button>
        <button
          id='add'
          onClick={this.props.handleOperator}
          value='+'
        >
          +
        </button>
        <button
          id='one'
          onClick={this.props.handleNumber}
          value='1'
        >
          1
        </button>
        <button
          id='two'
          onClick={this.props.handleNumber}
          value='2'
        >
          2
        </button>
        <button
          id='three'
          onClick={this.props.handleNumber}
          value='3'
        >
          3
        </button>
        <button
          id='zero'
          onClick={this.props.handleNumber}
          value='0'
          className='jumbo'
        >
          0
        </button>
        <button
          id='decimal'
          onClick={this.props.handleNumber}
          value='.'
        >
          .
        </button>
        <button
          id='equals'
          onClick={this.props.handleOperator}
          value='='
        >
          =
        </button>
      </div>
    )
  }  
}

class Display extends Component {
  render() {
    let whatToDisplay;
    if(this.props.input === '') {
      whatToDisplay = <p id='display'>{this.props.value}</p>;
    } else {
      whatToDisplay = <p id='display'>{this.props.input}</p>;
    }

    return(
      <div id='displaydiv'>
        {whatToDisplay}
      </div>
    )
  }
}

const DesignedBy = () => {
    return(
      <div id='designedBy'>
        <p>Developed by Garrett Franklin</p>
      </div>
    )
  }


export default App;
