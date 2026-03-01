import {createPortal} from "react-dom";
import styles from './Modal.module.css';
import useDraggable from "../../hooks/useDraggable.js";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";

/**
 * A draggable modal component.
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {Function} props.onClose - A function to call when the modal is closed.
 * @param {string} props.title - The title of the modal.
 * @param {React.ReactNode} props.children - The content of the modal.
 * @returns {JSX.Element | null} The rendered modal, or null if it is not open.
 */
function Modal({isOpen, onClose, title, children}) {
    const {position, onMouseDown, resetPosition} = useDraggable(isOpen);
    const {t} = useTranslation();

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
                    <button onClick={onClose} className={styles.closeButton}>{t("close")}</button>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal