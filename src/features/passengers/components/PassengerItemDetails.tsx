import styles from "../styles/PassengerDetails.module.css";

interface PassengerItemDetailsProps {
    data: {
        title?: string
        content?: string
    }[]
}

const PassengerItemDetails: React.FC<PassengerItemDetailsProps> = ({ data }) => {

    return (
        <div className={styles.passenger_overview}>
            {data.map(item => {
                return (
                    <div   
                        key={item.title}
                        className={styles.passenger_overview_item}
                    >
                        <p>{item.title}</p>
                        <p>{item.content}</p>
                    </div>
                );
            })}
        </div>
    );
    
}

export default PassengerItemDetails;

