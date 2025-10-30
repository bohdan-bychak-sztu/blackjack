import React from "react";

export default function ResultPage({ onRestart, result }) {
    return (
        <div>
            <h2>Game Over!</h2>
            <p>{result}</p>
            <button onClick={onRestart}>Play Again</button>
        </div>
    );
}
