import { Link, useLocation } from "react-router-dom";
import { ISideLinkProps } from "../types";

const SideLink: React.FC<ISideLinkProps> = ({
    iconSize,
    icon: Icon,
    linkName,
    linkUrl,
}) => {

    const router = useLocation();
    const activePath = "/" + linkName.toLocaleLowerCase() === router?.pathname;

    return (
        <div className={`${activePath ? "border-l-4 border-blue-600" : "border-l-0"} px-6 py-2 flex gap-8 items-center hover:bg-[rgba(255,255,255,0.2)] hover:border-l-4 hover:border-l-blue-600 transition-[0.2s]`}>
            <div className={` ${activePath ? "bg-blue-600" : "bg-transparent"} rounded-full p-2`}>
                <Icon color={activePath ? "white" : "black"} size={iconSize} />
            </div>
            <Link className={`${activePath ? "text-blue-600 font-bold" : "text-black font-normal"} text-[14px]`} to={linkUrl}>
                {linkName}
            </Link>
        </div>
    );
};

export default SideLink;
