import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { CompanyState } from "../types/CompanyState";
import { fetchCompanies } from "../../../services/companies";
import { updateState } from "../slices/companyReducer";

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

            const companyList = await fetchCompanies(params);
            dispatch(updateState({
                name: "companyList",
                value: companyList
            }))

        } catch(error: any) {

            console.log(error);
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