import {createPortal} from "react-dom";
import styles from './Modal.module.css';
import {useEffect, useRef} from "react";
import useDraggable from "../../hooks/useDraggable.js";

export default function Modal({isOpen, onClose, title, children}) {
    const modalRef = useRef(null);
    const {position, onMouseDown, resetPosition} = useDraggable(isOpen);

    useEffect(() => {
        if (!isOpen) {
            resetPosition();
        }
    }, [isOpen, resetPosition]);

    if (!isOpen)
        return null;

    return createPortal(
        <div className={styles.outer} onClick={onClose}>
            <div className={styles.modal}
                 ref={modalRef}
                 onClick={e => e.stopPropagation()}
                 style={{transform: `translate(${position.x}px, ${position.y}px)`}}>
                <div className={styles.header} onMouseDown={onMouseDown}>
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