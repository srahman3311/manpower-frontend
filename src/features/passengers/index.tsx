import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { RootState } from "../../store";
import { toggleDeleteModal, updateState, filterPassengerList } from "./slices/passengerReducer";
import { createPassengerInvoice, deletePassenger } from "../../services/passengers";
import { handleApiError } from "../../utils/error-handlers/handleApiError";
import styles from "./styles/index.module.css";
import PassengerTable from "./components/PassengerTable";
import SearchInput from "../../components/inputs/SearchInput";
import DeleteModal from "../../components/modal/DeleteModal";
import { DropdownList } from "../../components/dropdown-list/DropdownList";
import { Button } from "../../components/buttons/Button";

const PassengerList: React.FC = () => {

    const dispatch = useDispatch()
    const passengerState = useSelector((state: RootState) => state.passengerState);
    const { 
        passengerList,
        invoicePassengerList,
        limit,
        isDeleting, 
        passengerInAction 
    } = passengerState;

    const [loading, setLoading] = useState<boolean>(false);

    const searchPassengers = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateState({
            name: "searchText",
            value: event.target.value
        }))
    }, [dispatch, updateState])   

    const closeDeleteModal = () => {
        dispatch(toggleDeleteModal(null))
    }

    const handleLimitChange = (item: { id: number, limit: number }) => {
        dispatch(updateState({
            name: "limit",
            value: item.limit
        }))
    }

    const createInvoice = async() => {

        setLoading(true);

        try {

            const response = await createPassengerInvoice({ 
                passengerIds: invoicePassengerList.map(item => item.id)
            });
            dispatch(updateState({
                name: "invoicePassengerList",
                value: []
            }));
            window.open(response.url, '_blank');

        } catch(error) {
            alert("Something went wrong");
            console.log(error);
        } finally {
            setLoading(false)
        }

    }

    const deletePassengerInAction = useCallback(async() => {
        closeDeleteModal();
        try {
            await deletePassenger(passengerInAction?.id);
            const filteredPassengerList = passengerList.filter(user => user.id !== passengerInAction?.id);
            dispatch(filterPassengerList(filteredPassengerList))
        } catch(error) {
            const { message } = handleApiError(error)
            alert(message)
        }
    }, [closeDeleteModal, deletePassenger, dispatch, filterPassengerList, passengerList, passengerInAction?.id])

    return (
        <div className={styles.passenger_list}>
            <div className={styles.search_add}>
                <h2>Passengers</h2>
                <div className={styles.search_add_link}>
                    <SearchInput
                        placeholder="Search"
                        onChange={searchPassengers}
                    />
                    <Link className={styles.add_new_passenger} to="/passengers/add-new">
                        <IoMdAdd 
                            size={"2rem"}
                        />
                    </Link>
                </div>
                <Button
                    onClick={createInvoice}
                    disabled={(invoicePassengerList.length <= 0) || loading}
                >
                    Create Invoice {`( ${invoicePassengerList.length} )`}
                </Button>
                <div className={styles.limit_dropdown}>
                    <DropdownList 
                        data={[
                            { id: 1, limit: 10 },
                            { id: 2, limit: 20 },
                            { id: 3, limit: 50 }
                        ]}
                        nameKey="limit"
                        selectedValue={limit}
                        onClick={handleLimitChange}
                    />
                </div>
            </div>
            <PassengerTable />
            {
                isDeleting
                ?
                <DeleteModal 
                    title={passengerInAction?.name}
                    deleteItem={deletePassengerInAction}
                    onClose={closeDeleteModal}
                />
                :
                null
            }
        </div>
    );
    
}

export default PassengerList;

