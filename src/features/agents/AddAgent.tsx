import styles from "./styles/AddEditAgent.module.css"
import AgentForm from "./components/AgentForm";

const AddAgent: React.FC = () => {

    return (
        <div className={styles.add_edit_agent}>
            <h2>Add Agent</h2>
            <AgentForm />
        </div>
    );
    
}

export default AddAgent;

