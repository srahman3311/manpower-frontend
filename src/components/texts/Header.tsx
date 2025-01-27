import styles from "./Texts.module.css"

interface HeaderProps extends React.ComponentProps<"h2"> {}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <h2 className={styles.header}>
            {children}
        </h2>
    );
}

export default Header;