import React, { useState, useEffect } from 'react';

const CARD_SYMBOLS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const shuffledCards = [...CARD_SYMBOLS, ...CARD_SYMBOLS]
            .sort(() => Math.random() - 0.5)
            .map((symbol, index) => ({ id: index, symbol }));
        setCards(shuffledCards);
        setFlipped([]);
        setSolved([]);
        setMoves(0);
        setGameStarted(false);

        // Reveal all cards for 3 seconds
        setFlipped(shuffledCards.map(card => card.id));
        setTimeout(() => {
            setFlipped([]);
            setGameStarted(true);
        }, 3000);
    };

    const handleCardClick = (id) => {
        if (!gameStarted || flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);
        setMoves(moves + 1);

        if (newFlipped.length === 2) {
            const [firstId, secondId] = newFlipped;
            if (cards[firstId].symbol === cards[secondId].symbol) {
                setSolved([...solved, firstId, secondId]);
            }
            setTimeout(() => setFlipped([]), 1000);
        }
    };

    const isGameOver = solved.length === cards.length;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-4">Memory Game</h1>
            {!gameStarted && !isGameOver && (
                <div className="mb-4 text-xl font-bold">Memorize the cards!</div>
            )}
            <div className="mb-4">Moves: {moves}</div>
            <div className="grid grid-cols-4 gap-4 mb-4">
                {cards.map(({ id, symbol }) => (
                    <button
                        key={id}
                        onClick={() => handleCardClick(id)}
                        className={`w-16 h-16 text-2xl flex items-center justify-center rounded-lg ${
                            flipped.includes(id) || solved.includes(id)
                                ? 'bg-white'
                                : 'bg-blue-500 text-blue-500'
                        } ${!gameStarted && !isGameOver ? 'cursor-not-allowed' : ''}`}
                        disabled={!gameStarted || flipped.includes(id) || solved.includes(id)}
                    >
                        {flipped.includes(id) || solved.includes(id) ? symbol : '?'}
                    </button>
                ))}
            </div>
            {isGameOver && (
                <div className="text-2xl font-bold text-green-500 mb-4">
                    Congratulations! You won in {moves} moves!
                </div>
            )}
            <button
                onClick={initializeGame}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
            >
                New Game
            </button>
        </div>
    );
};

export default MemoryGame;