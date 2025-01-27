import styles from "./Buttons.module.css";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ComponentProps<"button"> {
    variant?: ButtonVariant
    size?: ButtonSize
    children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ 
   variant = "primary",
   size = "medium",
   children,
   className = "",
   ...props
}) => {

    return (
        <button 
            className={`${styles.btn} ${styles[variant]} ${styles[size]} ${styles[className]}`}
            {...props}
        >
            {children}
        </button>
    );

}

