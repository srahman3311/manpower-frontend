import styles from "./DropdownList.module.css";

interface DropdownListDataProps {
    nameKey: string
    data: any[]
    onClick: (item: any) => void
}

export const DropdownListData: React.FC<DropdownListDataProps> = ({ 
    data, 
    nameKey, 
    onClick 
}) => {

    return (
        <div className={styles.dropdown_item_list}>
            <ul>
                {data.map(item => {
                    return (
                        <li key={item.id} onClick={() => onClick(item)}>
                            {item[nameKey]}
                        </li>
                    );
                })}
            </ul>
        </div>
    );

}
