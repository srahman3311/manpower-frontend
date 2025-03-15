import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { updateState, editPassengerInfo, toggleDeleteModal } from "../slices/passengerReducer";
import { useFetchPassengers } from "../hooks/useFetchPassengers";
import peoplePlaceholderImg from "../../../assets/people_placeholder.jpg";
import styles from "../styles/PassengerTable.module.css";
import TableDataNavigation from "./TableDataNavigation";
import ActionButtons from "../../../components/buttons/ActionButtons";
import { NoDataTR } from "../../../components/tables/NoDataTR";

const PassengerTable = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, errorMsg, fetchPassengerList } = useFetchPassengers();
    const passengerState = useSelector((state: RootState) => state.passengerState);
    const { 
        searchText, 
        skip, 
        limit, 
        totalPassengerCount, 
        passengerList, 
        invoicePassengerList
    } = passengerState;

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchPassengerList({ 
                searchText, 
                skip, 
                limit 
            });
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchText, skip, limit])

    const handleAction = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {

        const { type, id } = event.currentTarget.dataset;
        const passengerInAction = passengerList.find(user => user.id.toString() === id);

        if(!passengerInAction) return;

        if(type === "delete") {
            dispatch(updateState({
                name: "passengerInAction",
                value: passengerInAction
            }));
            dispatch(toggleDeleteModal(passengerInAction))
            return;
        }

        if(type === "invoice") {

            const foundPassenger = invoicePassengerList.find(item => item.id.toString() === id);
            
            if(foundPassenger) {
                const filteredPassengerList = invoicePassengerList.filter(item => item.id.toString() !== id)
                dispatch(updateState({
                    name: "invoicePassengerList",
                    value: filteredPassengerList
                }));
                return;
            }

            const passenger = passengerList.find(item => item.id.toString() === id);
            if(!passenger) return;

            dispatch(updateState({
                name: "invoicePassengerList",
                value: [
                    ...invoicePassengerList,
                    passenger
                ]
            }));

            return;

        }

        dispatch(editPassengerInfo(passengerInAction));
      
        navigate(`/passengers/edit/${id}`);

    }, [passengerList, invoicePassengerList, dispatch, updateState])

    const navigateToNextPage = useCallback(() => {
        if(totalPassengerCount <= (skip + limit)) return;
        dispatch(updateState({
            name: "skip",
            value: skip + limit
        }));
    }, [dispatch, updateState, skip, limit, totalPassengerCount])

    const navigateToPrevPage = useCallback(() => {
        if(!skip) return;
        dispatch(updateState({
            name: "skip",
            value: skip - limit
        }));
    }, [dispatch, updateState, skip, limit])

    const colSpan = 6;

    return (
        <div className={styles.passenger_table_container}>
            <div className={styles.passenger_table}> 
                <table>
                    <thead>
                        <tr className={styles.header_tr}>
                            <th></th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Job</th>
                            <th>Agent</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={"Loading..."}
                            />
                            :
                            errorMsg 
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={errorMsg}
                            />
                            :
                            passengerList.length <= 0
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={"No passenger data to show"}
                            />
                            :
                            passengerList.map(user => {
                                const { id, name, email, phone, job, agent, imageUrl } = user;
                                return (
                                    <tr key={id}>
                                        <td className={styles.people_placeholder_img}>
                                            <img 
                                                src={imageUrl ?? peoplePlaceholderImg}
                                                alt={`${name}`}
                                            />
                                        </td>
                                        <td>{name}</td>
                                        <td>{phone}</td>
                                        <td>{email}</td>
                                        <td>{job?.name}</td>
                                        <td>{`${agent.firstName} ${agent.lastName}`}</td>
                                        <td>
                                            <ActionButtons 
                                                actionTypeList={["invoice"]}
                                                itemId={id}
                                                isAddedToInvoice={invoicePassengerList.some(item => item.id === id)}
                                                handleClick={handleAction}
                                            />
                                        </td>
                                        <td>
                                            <ActionButtons 
                                                actionTypeList={["view", "edit", "delete"]}
                                                itemId={id}
                                                handleClick={handleAction}
                                            />
                                        </td>
                                    </tr>
                                );

                            })}
                    </tbody>
                </table>
            </div>
            <TableDataNavigation 
                skip={skip}
                limit={limit}
                total={totalPassengerCount}
                onNext={navigateToNextPage}
                onPrev={navigateToPrevPage}
            />
        </div>
    );

}

export default PassengerTable;