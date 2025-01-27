import { User as IUser } from "../../features/users/types/User";
import Avatar from "../../assets/people_placeholder.jpg";
// import UserInfo from "./UserInfo";
import styles from "./TopNav.module.css";

interface ProfileShortcutProps {
    user: IUser | null
    isLargeDevice?: boolean
    toggleProfileMenu?: () => void
}

interface UserImageProps {
    src: string
    toggleProfileMenu?: () => void
}


const ProfileShortcut: React.FC<ProfileShortcutProps> = ({ user, isLargeDevice, toggleProfileMenu }) => {

    const imageSrc = user?.imageUrl ?? Avatar;
    
    return (
        <>
            {
                isLargeDevice
                ?
                <div className = {styles.profile_shortcut}>
                    <div className = {styles.user_info}>
                        <UserImage 
                            src = {imageSrc}
                        />
                    </div>
                </div>
                :
                <UserImage 
                    src = {imageSrc}
                    toggleProfileMenu={toggleProfileMenu}
                />
            }
        </>
    );

}


const UserImage: React.FC<UserImageProps> = ({ src, toggleProfileMenu }) => {
    return (
        <div className = {styles.user_image} onClick={toggleProfileMenu}>
            <img 
                src = {src}
                alt = "user name"
            />
        </div>
    );
}


export default ProfileShortcut;