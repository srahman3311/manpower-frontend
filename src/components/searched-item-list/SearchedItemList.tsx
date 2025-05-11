import styles from "./SearchedItemList.module.css";

interface SearchedItem {
    id: number
    title: string
}

interface SearchedItemListProps {   
    elementRef?: React.RefObject<HTMLDivElement> 
    forItem?: string
    loading: boolean
    errorMsg: string | null
    itemList: SearchedItem[]
    handleClick: (item: SearchedItem, forItem?: string) => void 
}

const SearchedItemList: React.FC<SearchedItemListProps> = ({
    elementRef,
    forItem,
    loading,
    errorMsg,
    itemList,
    handleClick
}) => {

    return (
        <div 
            className={styles.search_item_list}
            ref={elementRef}
        >
            {
                loading
                ?
                <div>loading...</div>
                :
                errorMsg
                ?
                <div>{errorMsg}</div>
                :
                itemList.length < 1
                ?
                <div>{`No ${forItem}s Found`}</div>
                :
                <ul>
                    {itemList.map(item => {
                        
                        return (
                            <li 
                                key={item.id} 
                                onClick={() => handleClick(item)}
                            >
                                {item.title}
                            </li>
                        );
                    })}
                </ul>
            }
        </div>
    );

}

export default SearchedItemList;