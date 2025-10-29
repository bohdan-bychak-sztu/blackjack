import {createPortal} from "react-dom";
import styles from './Modal.module.css';

export default function Modal({isOpen, onClose, title, children}) {
    if (!isOpen)
        return null;

    return createPortal(
        <div className={styles.outer} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
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