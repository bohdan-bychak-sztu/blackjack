import {createPortal} from "react-dom";
import styles from './Modal.module.css';
import useDraggable from "../../hooks/useDraggable.js";
import {useEffect} from "react";

export default function Modal({isOpen, onClose, title, children}) {
    const {position, onMouseDown, resetPosition} = useDraggable(isOpen);

    useEffect(() => {
        if (!isOpen) {
            resetPosition();
        }
    }, [isOpen, resetPosition]);

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div className={styles.outer} onClick={onClose}>
            <div className={styles.modal}
                 id="modal"
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
    );
}