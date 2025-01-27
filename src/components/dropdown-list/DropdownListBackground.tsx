import styles from "./DropdownList.module.css";

interface IProps {
    elementRef: React.RefObject<HTMLDivElement>
    onClick: () => void
}

export const DropdownListBackground: React.FC<IProps> = ({ elementRef, onClick }) => {

    return (
        <div 
            className={styles.dropdown_background}
            ref={elementRef}
            onClick={onClick}
        >
        </div>    
    );

}
