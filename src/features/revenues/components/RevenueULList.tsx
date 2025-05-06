import { useMemo } from "react";
import { Revenue } from "../types/Revenue";
import styles from "../styles/RevenueULList.module.css"

interface RevenueULListProps {
    loading: boolean
    errorMsg: string | null
    revenueList: Revenue[]
}

const RevenueULList: React.FC<RevenueULListProps> = ({ loading, errorMsg, revenueList }) => {

    const totalRevenue = useMemo(() => {
        return revenueList.reduce((total, item) => item.amount + total, 0)
    }, [revenueList]);

    return(
        <>
        {
            loading
            ?
            <div>Loading...</div>
            :
            errorMsg
            ?
            <div>{errorMsg}</div>
            :
            revenueList.length <= 0
            ?
            <div>No revenues to show</div>
            :
            <div className={styles.revenue_list}>
                <ul>
                    {revenueList.map(revenue => {
                        return(
                            <li key={revenue.id} className={styles.revenue_item}>
                                <span>{revenue.name}</span>
                                <span>{revenue.amount}</span>
                            </li>
                        );
                    })}
                    {
                        revenueList.length > 0
                        ?
                        <li className={styles.revenue_item}>
                            <span>Total</span>
                            <span>{totalRevenue}</span>
                        </li>
                        :
                        null
                    }
                </ul>
            </div>
        }
        </>
    )

}

export default RevenueULList;