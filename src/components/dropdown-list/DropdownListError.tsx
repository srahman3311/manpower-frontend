import styles from "./DropdownList.module.css";

export const DropdownListError: React.FC<{ error: string }> = ({ error }) => {

    return (
        <p className={styles.error_msg}>
            {error}
        </p>
    );

}
