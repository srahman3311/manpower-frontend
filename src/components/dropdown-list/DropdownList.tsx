import { IoIosArrowDown } from "react-icons/io";
import { useClickOutside } from "../../hooks/useClickOutside";
import styles from "./DropdownList.module.css";
import { DropdownListBackground } from "./DropdownListBackground";
import { DropdownListError } from "./DropdownListError";
import { DropdownListData } from "./DropdownListData";

interface DropdownListProps {
    required?: boolean
    label?: string
    error?: string
    data: any [] 
    nameKey: string 
    selectedValue: string | number
    onClick: (args: any) => void
}

export const DropdownList = (props: DropdownListProps) => {

    const { 
        required,
        label,
        error,
        data, 
        nameKey, 
        selectedValue, 
        onClick 
    } = props;

    const { elementRef, isVisible, setIsVisible } = useClickOutside({ exceptions: [] });
    const toggleDropdown = () => setIsVisible(!isVisible);

    return (
        <div className={styles.dropdown_list_container}>
            {
                label
                ?
                <label className={styles.dropdown_label}>
                    {label} {required ? <span>*</span> : null}
                </label>
                : null
            }
            <div className={`${styles.dropdown_list}`} >
                <DropdownListBackground 
                    elementRef={elementRef}
                    onClick={toggleDropdown}
                />
                <p>{selectedValue}</p>
                <IoIosArrowDown />
                {
                    isVisible
                    ?
                    <DropdownListData 
                        data={data}
                        nameKey={nameKey}
                        onClick={onClick}
                    />
                    :
                    null
                }
            </div>
            {
                error 
                ? 
                <DropdownListError 
                    error={error}
                /> 
                : 
                null
            }
        </div>
    );

}
