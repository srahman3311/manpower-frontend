import { IoMdClose } from "react-icons/io";
import styles from "./Modal.module.css";

interface ModalProps {
    modalContent: React.ReactNode
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({
    modalContent,
    onClose
}) => {

    return (
        <div className={styles.modal}>
            <div className={styles.modal_background}></div>
            <div className={styles.modal_content}>
                <button
                    className={styles.modal_cls_btn}
                    onClick={onClose}
                >
                    <IoMdClose 
                        size={"1.4rem"}
                    />
                </button>
                {modalContent}
            </div>
        </div>
    );
}

export default Modal;