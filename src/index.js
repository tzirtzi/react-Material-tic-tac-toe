import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// class Square extends React.Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         position: props,
//     //         value: null,
//     //     };
//     // }

//     render() {
//         return (
//         <button 
//             className="square" 
//         onClick={() => { this.props.onClick() /*this.setState({value:'X'})*/ }}
//         >
//             {this.props.value}
//         </button>
//         );
//     }
// }
 function Square(props) {
    return (
        <button className="square" onClick={ props.onClick } >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     }
    // }

    // handleClick(i){
    //     // make a copy of the array
    //     const squares = this.state.squares.slice();
    //     if (calculateWinner(squares) || squares[i]) {
    //         return;
    //     }
    //     squares[i] = this.getNextPlayer();
    //     this.setState({
    //         squares: squares,
    //         xIsNext: !this.state.xIsNext
            
    //     });
    // }

    // getNextPlayer() {
    //     return this.state.xIsNext? 'X' : 'O';
    // }

    
    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={()=> this.props.onClick(i)}
                // value={this.state.squares[i]}
                // onClick={()=> this.handleClick(i)}
            />
        );
    }

    render() {
        // const winner = calculateWinner(this.state.squares);
        // let status = "";
        
        // if (winner) {
        //     status = `Winner ${winner}`;
        // } else {
        //     status = `Next player: ${this.getNextPlayer()}`;
        // }

        return (
        <div>

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
  
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }
    
    getNextPlayer() {
        return this.state.xIsNext? 'X' : 'O';
    }

    handleClick(i){

        const move = this.state.stepNumber;
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        // make a copy of the array
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.getNextPlayer();
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: move+1,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step){

        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move) => {
            //on first move, move = 0
            const descr = move ? `Go to move ${move}` : `Go to Start`;
            return (
                <li key={move}>
                    <button onClick={()=> this.jumpTo(move)}>
                        {descr}
                    </button>
                </li>
            )
        });

        let status;
        if (winner) {
            status = `Winner: ${winner}`; 
        } else {
            status = `Next player: ${this.getNextPlayer()}`;
        }

        return (
        <div className="game">
            <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i)=> this.handleClick(i)}
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
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


function calculateWinner(squares) {
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