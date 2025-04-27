import { useMemo } from "react";
import { 
    MdDashboard, 
    MdWork, 
    MdOutlineMoneyOffCsred,
    MdOutlineAttachMoney 
} from "react-icons/md";
import { TbTransactionDollar } from "react-icons/tb";
import { FaPeopleGroup, FaWallet } from "react-icons/fa6";
import { FaRegUser, FaClipboardList } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { User } from "../../features/users/types/User";
import { getIsAdminOrTenant } from "../../features/users/utils/getIsAdminOrTenant";
import SideLink from "./SideLink";


interface SideBarProps {
    user: User | null
}

const SideBar: React.FC<SideBarProps> = ({ user }) => {

    const isAdminOrTenant = useMemo(() => getIsAdminOrTenant(user), [user]);

    return (
        <div className={`
      text-black
        fixed
        top-0 left-0
        transition
        w-[220px] 
        min-h-[100vh] 
        bg-[rgb(255,255,255)]
        border-r-[.1px] 
        dark:border-[rgba(145,145,145,0.5)] 
         z-1
         shadow-xl
        `
        }>

            <div className="transition mt-8">
                <SideLink
                    icon={MdDashboard}
                    linkName="Dashboard"
                    linkUrl="/dashboard"
                />
                <SideLink
                    icon={FaPeopleGroup}
                    linkName="Passengers"
                    linkUrl="/passengers"
                />
                <SideLink
                    icon={MdWork}
                    linkName="Jobs"
                    linkUrl="/jobs"
                />
                <SideLink
                    icon={BsBuilding}
                    linkName="Companies"
                    linkUrl="/companies"
                />
                <SideLink
                    icon={FaRegUser}
                    linkName="Agents"
                    linkUrl="/agents"
                />
                <SideLink
                    icon={MdOutlineMoneyOffCsred}
                    linkName="Expenses"
                    linkUrl="/expenses"
                />
                <SideLink
                    icon={MdOutlineAttachMoney}
                    linkName="Revenues"
                    linkUrl="/revenues"
                />
                {
                    isAdminOrTenant
                    ?
                    <>
                        <SideLink
                            icon={FaWallet}
                            linkName="Accounts"
                            linkUrl="/accounts"
                        />
                        <SideLink
                            icon={TbTransactionDollar}
                            linkName="Transactions"
                            linkUrl="/transactions"
                        />
                        <SideLink
                            icon={FaRegUser}
                            linkName="Users"
                            linkUrl="/users"
                        />
                    </>
                    :
                    null
                }
                <SideLink
                    icon={FaClipboardList}
                    linkName="Reports"
                    linkUrl="/reports/passenger-reports"
                />
            </div>
        </div >
    );
};

export default SideBar;
