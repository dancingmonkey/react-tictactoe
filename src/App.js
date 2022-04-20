import React from 'react';

const ReplayButton = props => {
  return (
    <button onClick={props.onClick} className="mt-4 w-full border-2 border-secondary text-base text-white hover:bg-secondary hover:text-primary">
      Replay
    </button>
  );
};

const BoardRow = ({ children }) => {
  return <div className="clear-both table content-none">{children}</div>;
};

const Square = props => {
  return (
    <button onClick={props.onClick} className="float-left mr-[-1px] mt-[-1px] h-[60px] w-[60px] border border-solid border-secondary bg-primary p-0 text-center text-6xl font-bold text-white">
      {props.value}
    </button>
  );
};

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div>
        <BoardRow>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </BoardRow>
        <BoardRow>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </BoardRow>
        <BoardRow>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </BoardRow>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  }

  handleReplayButton() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
    });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="flex flex-col">
        <div className="mb-[10px] text-2xl text-white">{status}</div>
        <Board squares={this.state.squares} onClick={i => this.handleClick(i)} />
        {winner && <ReplayButton onClick={() => this.handleReplayButton()} />}
      </div>
    );
  }
}

const App = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Game />
    </div>
  );
};

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

export default App;
