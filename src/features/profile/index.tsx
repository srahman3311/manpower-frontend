import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./styles/index.module.css";
import mountainImage from "../../assets/pexels-photo-417173.jpeg";
import Avatar from "../../assets/people_placeholder.jpg";
import { Button } from "../../components/buttons/Button";

const Profile: React.FC = () => {

    const authState = useSelector((state: RootState) => state.authState);
    const { user } = authState;

    return (
        <div className={styles.profile}>
           <div className={styles.profile_content}>
                <div className={styles.placeholder_cover_photo}>
                    <img 
                        src={mountainImage}
                        alt="Cover"
                    />
                </div>
                <div className={styles.user_info}>
                    <p>Company: {user?.tenant.name}</p>
                    <p>Name: {user?.firstName} {user?.lastName}</p>
                    <p>Email: {user?.email}</p>
                    <p>Phone: {user?.phone}</p>
                    <div className={styles.action_buttons}>
                        <Button variant="action">
                            Change Photo
                        </Button>
                        <Button variant="action">
                            Change Password
                        </Button>
                        <Button variant="action">
                            Update Info
                        </Button>
                    </div>
                </div>
                <div className={styles.photo_container}>
                    <div className={styles.photo}>
                        <img 
                            src={user?.imageUrl ?? Avatar}
                            alt={user?.firstName}
                        />
                    </div>
                    <div className={styles.user_name}>
                        <p>{user?.firstName} {user?.lastName}</p>
                    </div>
                </div>
           </div>
        </div>
    );
    
}

export default Profile;

