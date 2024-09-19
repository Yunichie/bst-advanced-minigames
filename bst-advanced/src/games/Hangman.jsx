import React, { useState, useEffect } from 'react';

const words = ['REACT', 'TAILWIND', 'JAVASCRIPT', 'HANGMAN', 'COMPONENT'];

const Hangman = () => {
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [remainingGuesses, setRemainingGuesses] = useState(6);
    const [gameStatus, setGameStatus] = useState('playing');

    useEffect(() => {
        setWord(words[Math.floor(Math.random() * words.length)]);
    }, []);

    const guessLetter = (letter) => {
        if (gameStatus !== 'playing') return;

        if (!guessedLetters.includes(letter)) {
            const newGuessedLetters = [...guessedLetters, letter];
            setGuessedLetters(newGuessedLetters);

            if (!word.includes(letter)) {
                setRemainingGuesses(remainingGuesses - 1);
            }

            checkGameStatus(newGuessedLetters);
        }
    };

    const checkGameStatus = (guessedLetters) => {
        if (word.split('').every(letter => guessedLetters.includes(letter))) {
            setGameStatus('won');
        } else if (remainingGuesses <= 1) {
            setGameStatus('lost');
        }
    };

    const resetGame = () => {
        setWord(words[Math.floor(Math.random() * words.length)]);
        setGuessedLetters([]);
        setRemainingGuesses(6);
        setGameStatus('playing');
    };

    const renderWord = () => {
        return word.split('').map((letter, index) => (
            <span key={index} className="mx-1 text-2xl font-bold">
        {guessedLetters.includes(letter) ? letter : '_'}
      </span>
        ));
    };

    const renderKeyboard = () => {
        const alphabet = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
        return alphabet.map((letter) => (
            <button
                key={letter}
                onClick={() => guessLetter(letter)}
                disabled={guessedLetters.includes(letter) || gameStatus !== 'playing'}
                className={`m-1 px-3 py-2 rounded ${
                    guessedLetters.includes(letter)
                        ? 'bg-gray-300 text-gray-500'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
                {letter}
            </button>
        ));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Hangman</h1>
            <div className="mb-4">{renderWord()}</div>
            <div className="mb-4">Remaining Guesses: {remainingGuesses}</div>
            {gameStatus === 'playing' && (
                <div className="mb-4 flex flex-wrap justify-center max-w-md">
                    {renderKeyboard()}
                </div>
            )}
            {gameStatus === 'won' && (
                <div className="text-2xl font-bold text-green-500 mb-4">You won!</div>
            )}
            {gameStatus === 'lost' && (
                <div className="text-2xl font-bold text-red-500 mb-4">
                    You lost! The word was: {word}
                </div>
            )}
            {gameStatus !== 'playing' && (
                <button
                    onClick={resetGame}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Play Again
                </button>
            )}
        </div>
    );
};

export default Hangman;