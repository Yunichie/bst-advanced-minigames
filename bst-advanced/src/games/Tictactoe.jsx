import React, { useState } from 'react';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const calculateWinner = (squares) => {
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
    };

    const handleClick = (i) => {
        if (calculateWinner(board) || board[i]) {
            return;
        }
        const newBoard = board.slice();
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const renderSquare = (i) => {
        return (
            <button
                className="w-20 h-20 border border-gray-400 text-4xl font-bold bg-white hover:bg-gray-100 focus:outline-none"
                onClick={() => handleClick(i)}
            >
                {board[i]}
            </button>
        );
    };

    const winner = calculateWinner(board);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (board.every(square => square !== null)) {
        status = "It's a draw!";
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe</h1>
            <div className="mb-4 text-xl font-semibold">{status}</div>
            <div className="mb-4">
                <div className="flex">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="flex">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="flex">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                onClick={resetGame}
            >
                Reset Game
            </button>
        </div>
    );
};

export default TicTacToe;