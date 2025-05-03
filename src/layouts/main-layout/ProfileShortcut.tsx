import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { User as IUser } from "../../features/users/types/User";
import Avatar from "../../assets/people_placeholder.jpg";
// import UserInfo from "./UserInfo";
import styles from "./TopNav.module.css";
import { Button } from "../../components/buttons/Button";

interface ProfileShortcutProps {
    user: IUser | null
    isLargeDevice?: boolean
    toggleProfileMenu?: () => void
}

interface UserImageProps {
    src: string
    toggleProfileMenu?: () => void
}


const ProfileShortcut: React.FC<ProfileShortcutProps> = ({ user }) => {

    const navigate = useNavigate()

    const logout = () => {
        const cookies = new Cookies();
        cookies.remove("token");
        navigate("/")
    }

    const imageSrc = user?.imageUrl ?? Avatar;
    
    return (
        <div className={styles.profile_shortcut}>
            <Button
                variant="outline"
                size="small"
                onClick={logout}
            >
                Logout
            </Button>
            <div className={styles.user_info}>
                <Link to={`/profile/${user?.id}`}>
                    <UserImage 
                        src={imageSrc}
                    />
                </Link>
            </div>
        </div>
    );

}


const UserImage: React.FC<UserImageProps> = ({ src, toggleProfileMenu }) => {
    return (
        <div className={styles.user_image} onClick={toggleProfileMenu}>
            <img 
                src={src}
                alt="user name"
            />
        </div>
    );
}


export default ProfileShortcut;