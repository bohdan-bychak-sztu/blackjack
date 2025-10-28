import React from "react";

export default function GameControls({ onHit, onStand, disabled }) {
    return (
        <div className="controls">
            <button onClick={onHit} disabled={disabled}>
                Hit
            </button>
            <button onClick={onStand} disabled={disabled}>
                Stand
            </button>
        </div>
    );
}
