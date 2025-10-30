import {createPortal} from "react-dom";
import styles from './Modal.module.css';
import {useCallback, useEffect, useRef, useState} from "react";

export default function Modal({isOpen, onClose, title, children}) {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const startPos = useRef({ x: 0, y: 0 });
    const modalRef = useRef(null);

    const onMouseMove = useCallback((e) => {
        if (isDragging) {
            const dx = e.clientX - startPos.current.x;
            const dy = e.clientY - startPos.current.y;
            setPosition(prev => ({x: prev.x + dx, y: prev.y + dy}));
            startPos.current = {x: e.clientX, y: e.clientY};
        }
    }, [isDragging]);

    const onMouseUp = () => {
        setIsDragging(false);
    }

    const onMouseDown = (e) => {
        e.stopPropagation();
        setIsDragging(true);
        startPos.current = {x: e.clientX - position.x, y: e.clientY - position.y};
    }

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        } else {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isDragging]);

    useEffect(() => {
        if (!isOpen) {
            setPosition({ x: 0, y: 0 });
        }
    }, [isOpen]);

    if (!isOpen)
        return null;

    return createPortal(
        <div className={styles.outer} onClick={onClose}>
            <div className={styles.modal} ref={modalRef} onClick={e => e.stopPropagation()} style={{cursor: isDragging ? 'grabbing' : 'grab', transform: `translate(${position.x}px, ${position.y}px)`}}>
                <div className={styles.header} onMouseDown={onMouseDown} >
                    <h2>{title}</h2>
                    <button onClick={onClose} className={styles.closeButton}>Close</button>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}