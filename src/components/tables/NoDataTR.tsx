import styles from "./Tables.module.css";

interface NoDataTRProps extends React.ComponentProps<"td"> {}

export const NoDataTR: React.FC<NoDataTRProps> = ({ content, ...rest }) => {
    return (
        <tr>
            <td className={styles.no_data_td} {...rest}>
                {content}
            </td>
        </tr>
    )
}
