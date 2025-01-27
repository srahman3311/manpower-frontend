import styles from "./Messages.module.css";

const ValidationErrorMessage: React.FC<{ message: string }> = ({ message }) => {

    return (
        <p className={styles.validation_error_msg}>
            {message}
        </p>
    );
   
}

export default ValidationErrorMessage;