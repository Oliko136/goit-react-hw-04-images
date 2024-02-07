import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ close, children }) => {
    const closeModal = useCallback(({ target, currentTarget, code }) => {
        if (target === currentTarget || code === 'Escape') {
            close();
        }
    }, [close])
    
    useEffect(() => {
        document.addEventListener('keydown', closeModal);

        return () => document.removeEventListener('keydown', closeModal);
    }, [closeModal])

    return createPortal((
            <div onClick={closeModal} className={styles.Overlay}>
                <div className={styles.Modal}>
                    {children}
                </div>
            </div> 
        ), modalRoot)
}

Modal.propTypes = {
    close: PropTypes.func.isRequired,
    children: PropTypes.node
}

