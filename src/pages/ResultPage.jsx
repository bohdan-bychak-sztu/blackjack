import React from "react";

export default function ResultPage({ onRestart }) {
    return (
        <div>
            <h2>Game Over!</h2>
            <p>You won / lost / draw (placeholder)</p>
            <button onClick={onRestart}>Play Again</button>
        </div>
    );
}
