import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router';
import StartPage from './pages/StartPage/StartPage.jsx';
import Layout from './pages/Layout/Layout.jsx';
import GamePage from './pages/GamePage.jsx';
import ResultPage from './pages/ResultPage.jsx';
import RulesPage from "./pages/Rules/RulesPage.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/start" element={<StartPage/>}/>
                    <Route path="/game" element={<GamePage/>}/>
                    <Route path="/result" element={<ResultPage/>}/>
                    <Route path="/rules" element={<RulesPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);