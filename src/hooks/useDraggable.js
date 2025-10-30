import {useCallback, useRef, useState} from "react";

export default function useDraggable() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const startPos = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);

    const onMouseMove = useCallback((e) => {
        if (isDragging.current) {
            const dx = e.clientX - startPos.current.x;
            const dy = e.clientY - startPos.current.y;
            setPosition(prev => ({x: prev.x + dx, y: prev.y + dy}));
            startPos.current = {x: e.clientX, y: e.clientY};
        }
    }, []);

    const onMouseUp = useCallback(() => {
        isDragging.current = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }, [onMouseMove]);

    const onMouseDown = useCallback((e) => {
        e.stopPropagation();
        isDragging.current = true;
        startPos.current = {x: e.clientX, y: e.clientY};
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }, [position, onMouseMove, onMouseUp]);

    const resetPosition = useCallback(() => {
        setPosition({ x: 0, y: 0 });
    }, []);

    return { position, onMouseDown, resetPosition  };
}