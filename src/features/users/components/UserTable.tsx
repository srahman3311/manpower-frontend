import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { updateState, toggleDeleteModal } from "../slices/userReducer";
import { useFetchUsers } from "../hooks/useFetchUsers";
import peoplePlaceholderImg from "../../../assets/people_placeholder.jpg";
import styles from "../styles/UserTable.module.css";
import TableDataNavigation from "./TableDataNavigation";
import ActionButtons from "../../../components/buttons/ActionButtons";
import { NoDataTR } from "../../../components/tables/NoDataTR";

const UserTable = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, errorMsg, fetchUserList } = useFetchUsers();
    const userState = useSelector((state: RootState) => state.userState);
    const { searchText, skip, limit, totalUserCount, userList, newUserInfo } = userState;

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchUserList({ 
                searchText, 
                skip, 
                limit 
            });
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchText, skip, limit])

    const handleAction = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {

        const { type, id } = event.currentTarget.dataset;
        const userInAction = userList.find(user => user.id.toString() === id);

        if(!userInAction) return;

        if(type === "delete") {
            dispatch(updateState({
                name: "userInAction",
                value: userInAction
            }));
            dispatch(toggleDeleteModal(userInAction))
            return;
        }

        dispatch(updateState({
            name: "newUserInfo",
            value: {
                ...newUserInfo,
                firstName: userInAction.firstName,
                lastName: userInAction.lastName,
                email: userInAction.email,
                phone: userInAction.phone ?? "",
                role: userInAction.role
            }
        }))
      
        navigate(`/users/edit/${id}`);

    }, [userList, dispatch, updateState])

    const navigateToNextPage = useCallback(() => {
        if(totalUserCount <= (skip + limit)) return;
        dispatch(updateState({
            name: "skip",
            value: skip + limit
        }));
    }, [dispatch, updateState, skip, limit, totalUserCount])

    const navigateToPrevPage = useCallback(() => {
        if(!skip) return;
        dispatch(updateState({
            name: "skip",
            value: skip - limit
        }));
    }, [dispatch, updateState, skip, limit])

    const colSpan = 6;

    return (
        <div className={styles.user_table_container}>
            <div className={styles.user_table}> 
                <table>
                    <thead>
                        <tr className={styles.header_tr}>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
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
                            userList.length <= 0
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={"No user data to show"}
                            />
                            :
                            userList.map(user => {
                                const { id, firstName, lastName, email, phone, role, imageUrl } = user;
                                return (
                                    <tr key={id}>
                                        <td className={styles.people_placeholder_img}>
                                            <img 
                                                src={imageUrl ?? peoplePlaceholderImg}
                                                alt={`${firstName}`}
                                            />
                                        </td>
                                        <td>{`${firstName} ${lastName}`}</td>
                                        <td>{email}</td>
                                        <td>{phone}</td>
                                        <td>{role}</td>
                                        <td>
                                            <ActionButtons 
                                                actionTypeList={["edit", "delete"]}
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
                total={totalUserCount}
                onNext={navigateToNextPage}
                onPrev={navigateToPrevPage}
            />
        </div>
    );

}

export default UserTable;