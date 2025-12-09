import './App.css'
import GamePage from "./pages/GamePage/GamePage.jsx";
import {HashRouter, Route, Routes} from "react-router";
import Layout from "./pages/Layout/Layout.jsx";
import StartPage from "./pages/StartPage/StartPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import AppContextProvider from "./contexts/AppContextProvider.jsx";

function App() {


    return (
        <AppContextProvider>
            <HashRouter>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route index element={<StartPage/>}/>
                        <Route path="/start" element={<StartPage/>}/>
                        <Route path="/game" element={<GamePage/>}/>
                        <Route path="/result" element={<ResultPage/>}/>
                        <Route path="*" element={<h1>404 Not Found</h1>}/>
                    </Route>
                </Routes>
            </HashRouter>
        </AppContextProvider>
    )
}

document.body.classList.add('animated-background');

export default App
