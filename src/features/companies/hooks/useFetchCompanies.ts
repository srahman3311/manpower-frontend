import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { CompanyState } from "../types/CompanyState";
import { fetchCompanies } from "../../../services/companies";
import { fetchCompanyData } from "../slices/companyReducer";

type Params = Pick<CompanyState, "searchText" | "skip" | "limit">

type Return = {
    loading: boolean
    errorMsg: string
    fetchCompanyList: (params: Params) => Promise<void>
}

export const useFetchCompanies = (): Return => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const fetchCompanyList = useCallback(async(params: Params) => {

        setLoading(true);

        try {
        
            const { companies, total } = await fetchCompanies(params);
            console.log(companies)
        
            dispatch(fetchCompanyData({
                companies,
                totalCompanyCount: total
            }));

        } catch(error: any) {

            setErrorMsg(error.response?.data || error.message)

        } finally {
            setLoading(false);
        }
        
    }, [])

    return {
        loading,
        errorMsg,
        fetchCompanyList
    }

}