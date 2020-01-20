import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import List from '@material-ui/core/List';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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

/** Tzirtzi : added internationalization */
class LanguageItem extends React.Component {
    render() {
        // let binder = this.props.IslastItem ? '' : ' | '; 

        return (
            <span>
                <Button onClick={()=> this.props.onClick(this.props.value) }>
                    {this.props.value}
                </Button>
                {/*binder*/} 
            </span>
        ); 
    }
}

class LanguageArray extends React.Component {

    // props of type [{code:... descr:...},{},]
    render() {
        return(
            this.props.value.map(
                (item, index, array) => { return (
                        <LanguageItem key={item.code}
                            value={t(item.descr, this.props.currentLanguage )}
                            onClick={()=>this.props.onClick(item.code)}
                            // IslastItem={index === array.length-1}
                        /> 
                    )
            })
        )
    }
}

function Square(props) {
    return (
        <div className="square" onClick={ props.onClick } >
            {props.value}
        </div>
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
            languageCode: 'el'
        };
    }

    getNextPlayer() {
        return this.state.xIsNext? 'X' : 'O';
    }

    setLanguageCode(lanCode){
        this.setState({
            languageCode: lanCode
        });
    }
    
    handleClick(i){
        const language = this.state.languageCode;
        const move = this.state.stepNumber;
        const history = this.state.history.slice(0, move+1);
        const current = history[history.length -1];
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
            xIsNext: !this.state.xIsNext,
            languageCode: language
        });
    }

    jumpTo(step){

        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const lan = this.state.languageCode;
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        
        const moves = history.map((step,move) => {
            //on first move, move = 0
            const descr = move ? `${t('Go to move', lan)} ${move}` : `${t('Go to start',lan)}`;
            return (
                <li key={move}>
                    <Button
                        variant="contained" color="primary" 
                        onClick={()=> this.jumpTo(move)}>
                        {descr}
                    </Button>
                </li>
            )
        });

        let status;
        if (winner) {
            status = `${t('Winner', lan)}: ${winner}`; 
        } else {
            status = `${t('Next player', lan)}: ${this.getNextPlayer()}`;
        }

        return (
        <div className="game">
                    <div className="game-board">
                        <Card>
                            <CardContent>
                                <Board 
                                    squares={current.squares}
                                    onClick={(i)=> this.handleClick(i)}
                                />
                            </CardContent>
                        </Card>
                    </div>
                    <Card>
                        <CardContent>

                            <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
                                <LanguageArray
                                    value={languageChoices()}
                                    currentLanguage={this.state.languageCode}
                                    onClick={(lanCode)=> this.setLanguageCode(lanCode)}
                                />
                            </ButtonGroup>
                            <hr/>
                            <Typography color="textSecondary" gutterBottom>
                                {status}
                            </Typography>
                            <hr/>
                            <List component="nav" aria-label="contacts">
                                {moves}
                            </List>

                        </CardContent>
                    </Card>
            </div>
        );
    }
}
  
// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

//Tzirti Internationalization 
// simplification after i18next
function languageChoices() {
    return [
        {'code':'en', 'descr': 'English'},
        {'code':'el', 'descr': 'Greek' } 
    ]
}

function t( textName, languageCode) {
    // console.log(textName,languageCode )
    if (!textName) {
        return ''
    }

    const txts = {
        'English': {
            'en': 'English',
            'el': 'Αγγλικα'
        },
        'Greek': {
            'en': 'Greek',
            'el': 'Ελληνικα'
        },
        'Winner': {
            'en': 'Winner',
            'el': 'Νικητης'
        },
        'Next player': {
            'en':'Next player',
            'el':'Επόμενος Παίκτης'
        },
        'Go to move': {
            'en': 'Go to move',
            'el': 'Επιστροφη στην κινηση'
        },
        'Go to start': {
            'en': 'Go to start',
            'el': 'Επιστροφη στην αρχη'
        }
    }

    return txts[textName][languageCode];
}

// Calculate winner
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