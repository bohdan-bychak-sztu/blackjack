import React from "react";

export default function ResultPage({ onRestart, result }) {
    return (
        <div>
            <p>{result}</p>
            <button onClick={onRestart}>Play Again</button>
        </div>
    );
}
