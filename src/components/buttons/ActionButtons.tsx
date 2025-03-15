import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { MdViewCompact } from "react-icons/md";
import { MdOutlineLegendToggle } from "react-icons/md";
import { PiInvoice } from "react-icons/pi";
import styles from "./Buttons.module.css";
import { IconButton } from "./IconButton";

interface ActionButtonsProps {
    actionTypeList: string[]
    itemId: number
    isAddedToInvoice?: boolean
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ActionButtons: React.FC<ActionButtonsProps> = (props) => {

    const { 
        actionTypeList,
        itemId,
        isAddedToInvoice,
        handleClick 
    } = props;

    return (
        <div className={styles.action_buttons}> 
            {
                actionTypeList.includes("toggle")
                ?
                <IconButton 
                    icon={
                        <MdOutlineLegendToggle 
                            size={"1.6rem"}
                            color="#2E5077"
                        />
                    }
                    data-id={itemId}
                    data-type={"toggle"}
                    style={{ padding: "0px" }}
                    onClick={handleClick}
                />
                :
                null
            }
            {
                actionTypeList.includes("view")
                ?
                <IconButton 
                    icon={
                        <MdViewCompact 
                            size={"1.6rem"}
                            color="#2E5077"
                        />
                    }
                    data-id={itemId}
                    data-type={"view"}
                    style={{ padding: "0px" }}
                    onClick={handleClick}
                />
                :
                null
            }
            {
                actionTypeList.includes("edit")
                ?
                <IconButton 
                    icon={
                        <FaRegEdit 
                            size={"1.6rem"}
                            color="#2E5077"
                        />
                    }
                    data-id={itemId}
                    data-type={"edit"}
                    style={{ padding: "0px" }}
                    onClick={handleClick}
                />
                :
                null
            }
            {
                actionTypeList.includes("invoice")
                ?
                <IconButton 
                    icon={
                        <PiInvoice
                            size={"1.6rem"}
                            color={isAddedToInvoice ? "orangered" : "#2E5077"}
                        />
                    }
                    title={isAddedToInvoice ? "Remove From Invoice" : "Add To Invoice"}
                    data-id={itemId}
                    data-type={"invoice"}
                    style={{ padding: "0px" }}
                    onClick={handleClick}
                />
                :
                null
            }
            {
                actionTypeList.includes("delete")
                ?
                <IconButton 
                    icon={
                        <RiDeleteBin6Line 
                            size={"1.6rem"}
                            color="#2E5077"
                        />
                    }
                    data-id={itemId}
                    data-type={"delete"}
                    style={{ padding: "0px" }}
                    onClick={handleClick}
                />
                :
                null
            }
        </div>            
    );

}

export default ActionButtons;