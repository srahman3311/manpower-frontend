import styles from "./styles/AddEditAgent.module.css"
import AgentForm from "./components/AgentForm";

const EditAgent: React.FC = () => {

    return (
        <div className={styles.add_edit_agent}>
            <h2>Edit Agent</h2>
            <AgentForm />
        </div>
    );
    
}

export default EditAgent;

