import { IconType } from "react-icons";

export interface ISideLinkProps {
    iconSize: number;
    icon: IconType;
    linkName: string;
    linkUrl: string;
    onClick?: () => void
}