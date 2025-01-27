import styles from "./Buttons.module.css";

interface IConButtonProps extends React.ComponentProps<"button"> {
    customClassName?: string
    text?: string
    icon?: React.ReactNode
    iconPosition?: string
}

export const IconButton: React.FC<IConButtonProps> = ({ 
    customClassName = "",
    text,
    icon,
    iconPosition,
    ...props
}) => {

    let classes = `${iconPosition}`

    return (
        <button 
            className={`${styles.icon_btn} ${styles[classes]} ${styles[customClassName]}`}
            {...props}
        >
            {icon}
            {
                text
                ?
                <span className={styles.btn_text}>{text}</span>
                :
                null
            }
        </button>
    );

}

