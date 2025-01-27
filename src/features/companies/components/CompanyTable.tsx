import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { updateState, toggleDeleteModal } from "../slices/companyReducer";
import { useFetchCompanies } from "../hooks/useFetchCompanies";
import styles from "../styles/CompanyTable.module.css";
import TableDataNavigation from "./TableDataNavigation";
import ActionButtons from "../../../components/buttons/ActionButtons";
import { NoDataTR } from "../../../components/tables/NoDataTR";

const CompanyTable = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, errorMsg, fetchCompanyList } = useFetchCompanies();
    const companyState = useSelector((state: RootState) => state.companyState);
    const { searchText, skip, limit, totalCompanyCount, companyList, newCompanyInfo } = companyState;

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchCompanyList({ 
                searchText, 
                skip, 
                limit 
            });
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchText, skip, limit])

    const handleAction = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {

        const { type, id } = event.currentTarget.dataset;
        const companyInAction = companyList.find(user => user.id.toString() === id);

        if(!companyInAction) return;

        if(type === "delete") {
            dispatch(updateState({
                name: "companyInAction",
                value: companyInAction
            }));
            dispatch(toggleDeleteModal(companyInAction))
            return;
        }

        dispatch(updateState({
            name: "newCompanyInfo",
            value: {
                ...newCompanyInfo,
                name: companyInAction.name,
                email: companyInAction.email,
                phone: companyInAction.phone ?? "",
                address: companyInAction.address
            }
        }))
      
        navigate(`/companies/edit/${id}`);

    }, [companyList, dispatch, updateState])

    const navigateToNextPage = useCallback(() => {
        if(totalCompanyCount <= (skip + limit)) return;
        dispatch(updateState({
            name: "skip",
            value: skip + limit
        }));
    }, [dispatch, updateState, skip, limit, totalCompanyCount])

    const navigateToPrevPage = useCallback(() => {
        if(!skip) return;
        dispatch(updateState({
            name: "skip",
            value: skip - limit
        }));
    }, [dispatch, updateState, skip, limit])

    const colSpan = 6;

    return (
        <div className={styles.company_table_container}>
            <div className={styles.company_table}> 
                <table>
                    <thead>
                        <tr className={styles.header_tr}>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
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
                            companyList.length <= 0
                            ?
                            <NoDataTR 
                                colSpan={colSpan}
                                content={"No company data to show"}
                            />
                            :
                            companyList.map(user => {
                                const { id, name, email, phone, address } = user;
                                return (
                                    <tr key={id}>

                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{phone}</td>
                                        <td>{address}</td>
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
                total={totalCompanyCount}
                onNext={navigateToNextPage}
                onPrev={navigateToPrevPage}
            />
        </div>
    );

}

export default CompanyTable;