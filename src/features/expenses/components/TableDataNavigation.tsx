import { GrNext, GrPrevious } from "react-icons/gr";
import styles from "../styles/ExpenseTable.module.css";
import { IconButton } from "../../../components/buttons/IconButton";

interface TableDataNavigationProps {
    skip: number
    limit: number
    total: number
    onPrev: () => void
    onNext: () => void
}

const TableDataNavigation: React.FC<TableDataNavigationProps> = (props) => {

    const { skip, limit, total, onNext, onPrev } = props;

    const fromItemCount = !total ? 0 : skip + 1;
    const toItemCount = limit + skip > total ? total : limit + skip;

    return (
        <div className={styles.table_data_navigation}>
            <p>Showing {fromItemCount} to {toItemCount} of {total} results</p>
            <div className={styles.table_data_navigation_buttons}>
                <IconButton 
                    text="Prev"
                    icon={<GrPrevious size={"1rem"} />}
                    iconPosition="left"
                    onClick={onPrev}
                />
                <IconButton 
                    text="Next"
                    icon={<GrNext size={"1rem"} />}
                    iconPosition="right"
                    onClick={onNext}
                />
            </div>
        </div>
    );

}

export default TableDataNavigation;
