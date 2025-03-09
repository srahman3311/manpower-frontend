import { useState } from "react";
import {
    BsGithub,
    BsPencilSquare,
    // BsPeople,
    BsPersonLinesFill,
    BsChatDotsFill,
    BsSave,
    // BsColumnsGap,
    BsRSquareFill
} from "react-icons/bs";
import SideLink from "./SideLink";

const SideBar = () => {

    const [showSubMenu, setSubMenu] = useState<boolean>(false)

    const handleClick = () => {
        alert("hi")
    }

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

            {/* <div className="flex lg:px-0 items-center px-6">
                <div className="w-full flex items-center justify-center border h-[70px] cursor-pointer">
                    <img className="w-24 h-24" src="/logo.avif" alt="Logo" />
                </div>
            </div> */}
            <div className="transition mt-8">

                {/* <SideLink
                    icon={BsColumnsGap}
                    iconSize={18}
                    linkName="Dashboard"
                    linkUrl="https://notes-chatbot.vercel.app"
                /> */}
                <SideLink
                    icon={BsChatDotsFill}
                    iconSize={18}
                    linkName="Dashboard"
                    linkUrl="/dashboard"
                />
                <SideLink
                    icon={BsChatDotsFill}
                    iconSize={18}
                    linkName="Passengers"
                    linkUrl="/passengers"
                />
                <div className="relative ">
                    <div className="flex items-center justify-start pr-2">

                        <SideLink
                            icon={BsPencilSquare}
                            iconSize={18}
                            linkName="Jobs"
                            linkUrl="/jobs"
                            onClick={handleClick}
                        />
                        <button onClick={() => setSubMenu((prev) => !prev)} className="text-neutral-400 font-semibold text-lg cursor-pointer">{" > "}</button>
                    </div>

                    <div className={`${showSubMenu ? "h-[150px]" : "h-0"} ml-3 transition-all duration-700 relative overflow-hidden w-full`}>

                        <SideLink
                            icon={BsSave}
                            iconSize={18}
                            linkName="Companies"
                            linkUrl="/companies"
                        />

                        <SideLink
                            icon={BsRSquareFill}
                            iconSize={18}
                            linkName="Agents"
                            linkUrl="/agents"
                        />

                    </div>


                </div>

                <SideLink
                    icon={BsRSquareFill}
                    iconSize={18}
                    linkName="Users"
                    linkUrl="/users"
                />
                <SideLink
                    icon={BsGithub}
                    iconSize={18}
                    linkName="Companies"
                    linkUrl="/companies"
                />
                <SideLink
                    icon={BsPersonLinesFill}
                    iconSize={18}
                    linkName="Agents"
                    linkUrl="/agents"
                />
                <SideLink
                    icon={BsChatDotsFill}
                    iconSize={18}
                    linkName="Expenses"
                    linkUrl="/expenses"
                />
                <SideLink
                    icon={BsChatDotsFill}
                    iconSize={18}
                    linkName="Revenues"
                    linkUrl="/revenues"
                />
            </div>
        </div >
    );
};

export default SideBar;
