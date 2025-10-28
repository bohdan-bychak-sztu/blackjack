import './App.css'
import PlayerHand from "./components/PlayerHand/PlayerHand.jsx";

function App() {

  return (
    <>
        <PlayerHand name="Bohdan" cards={[
            {value: "10", suit: "♥"},
            {value: "K", suit: "♦"},
            {value: "3", suit: "♣"},
        ]}></PlayerHand>
    </>
  )
}

export default App
