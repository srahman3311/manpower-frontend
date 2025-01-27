import styles from "./Modal.module.css";
import { Button } from "../buttons/Button";
import Modal from "./Modal";

interface DeleteModalProps {
    title?: React.ReactNode
    onClose: () => void
    deleteItem: () => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({ title, deleteItem, onClose }) => {

    return (
        <Modal 
            modalContent={
                <div className={styles.delete_modal}>
                    <p>Are you sure want to delete <span>{title}</span>?</p>
                    <div className={styles.delete_modal_buttons}>
                        <Button 
                            size="small"
                            onClick={deleteItem}
                        >
                            Yes
                        </Button>
                        <Button 
                            variant="secondary" 
                            size="small" 
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            }
            onClose={onClose}
        />
    );

}

export default DeleteModal;