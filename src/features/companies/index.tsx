import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetchCompanies } from "./hooks/useFetchCompanies";
import { RootState } from "../../store";

const CompanyPage = () => {

    const { loading, errorMsg, fetchCompanyList } = useFetchCompanies();
    const companyState = useSelector((state: RootState) => state.companyState);
    const { companyList, searchText, skip, limit } = companyState;

    useEffect(() => {
        fetchCompanyList({ 
            searchText, 
            skip, 
            limit 
        });
    }, [searchText, skip, limit])


    return (
        <div className="">
            <h2>Companies</h2>
        </div>
    );


}

export default CompanyPage;