import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const GamesHomepage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const games = [
        { name: 'Hangman', path: '/hangman', color: 'blue' },
        { name: 'Tic-Tac-Toe', path: '/tictactoe', color: 'green' },
        { name: 'Memory', path: '/memory', color: 'purple' },
    ];

    const renderGameSelection = () => (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Minigames</h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 w-full max-w-md">
                {games.map((game) => (
                    <Link
                        key={game.name}
                        to={game.path}
                        className={`w-full px-4 py-3 bg-${game.color}-500 text-white rounded hover:bg-${game.color}-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 text-center`}
                    >
                        Play {game.name}
                    </Link>
                ))}
            </div>
        </div>
    );

    const renderHeader = () => {
        const currentGame = games.find(game => location.pathname === game.path);

        return (
            <header className={`bg-${currentGame.color}-500 text-white p-4 flex justify-between items-center`}>
                <h2 className="text-2xl font-bold">
                    {currentGame ? currentGame.name : 'Game'}
                </h2>
                <div className="space-x-4">
                    <button
                        onClick={() => navigate('/')}
                        className="px-3 py-1 rounded hover:bg-gray-700 focus:outline-none transition duration-300 ease-in-out"
                        title="Home"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate(0)}
                        className="px-3 py-1 rounded hover:bg-gray-700 focus:outline-none transition duration-300 ease-in-out"
                        title="Restart Game"
                    >
                        Restart
                    </button>
                </div>
            </header>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {location.pathname === '/' ? (
                renderGameSelection()
            ) : (
                <>
                    {renderHeader()}
                    <div className="p-4 flex justify-center">
                        <div className="w-full max-w-4xl">
                            <Outlet />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default GamesHomepage;