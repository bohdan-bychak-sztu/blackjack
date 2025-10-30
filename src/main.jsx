import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes, Navigate, HashRouter} from 'react-router';
import StartPage from './pages/StartPage/StartPage.jsx';
import Layout from './pages/Layout/Layout.jsx';
import GamePage from './pages/GamePage.jsx';
import ResultPage from './pages/ResultPage.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HashRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route index element={<StartPage/>}/>
                    <Route path="/start" element={<StartPage/>}/>
                    <Route path="/game" element={<GamePage/>}/>
                    <Route path="/result" element={<ResultPage/>}/>
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Route>
            </Routes>
        </HashRouter>
    </StrictMode>
);