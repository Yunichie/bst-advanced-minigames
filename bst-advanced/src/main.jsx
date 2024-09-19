import React, { StrictMode } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Hangman from './games/Hangman.jsx'
import Tictactoe from "./games/Tictactoe.jsx"
import Memory from './games/Memory.jsx'

const router = createBrowserRouter([{
    path: '/',
    element: <App />,
    children: [
        {
            path: "hangman",
            element: <Hangman />
        },
        {
            path: "tictactoe",
            element: <Tictactoe />
        },
        {
            path: "memory",
            element: <Memory />
        },
    ]
}]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)