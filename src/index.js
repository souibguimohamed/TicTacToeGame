import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
  ///////////// **** Start Square Simple Component **** /////////////
  const Square = (props)=>{
    return (
      <button className="square" 
              onClick={()=>{props.onClick()}}>
        {props.value}
      </button>
    );
  }
  ///////////// **** End Square Simple Component **** /////////////
  
  ///////////// **** Start Board Class Component **** /////////////
  class Board extends React.Component {

    //----- Broad Constructor -----//
    constructor(props){
      super(props);
      this.state = {
        squares:Array(9).fill(null),
        xIsNext:true
      }
    }
    //----- Broad Constructor -----//

    //~~~~~~ Function to know the winner ~~~~~~~//
    calculateWinner = (squares) => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }
    //~~~~~~ Function to know the winner ~~~~~~~//

    //~~~~~~ Event Function ~~~~~~//
    handleClick =(i)=>{
      const squares = this.state.squares.slice();
      if (this.calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext?"X":"O";
      this.setState({
        squares:squares,
        xIsNext:!this.state.xIsNext
      })
    }
    //~~~~~~ Event Function ~~~~~~//

    //~~~~~~ Function to render the square ~~~~~~//
    renderSquare(i) {
      return <Square
                      value={this.state.squares[i]} 
                      onClick={() => this.handleClick(i)}/>;
    }
    //~~~~~~ Function to render the square ~~~~~~//

    render() {
      const winner = this.calculateWinner(this.state.squares); //winner get { X / O / null }
      let status;
      if (winner) {
        status = 'Winner : ' + winner;
      } else {
        status = 'Next player     ( ' + (this.state.xIsNext ? 'X' : 'O') +' )';
      }
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }

  ///////////// **** End Board Class Component **** /////////////
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  