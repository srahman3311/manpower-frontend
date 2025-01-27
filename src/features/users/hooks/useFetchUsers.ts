import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { UserState } from "../types/UserState";
import { fetchUsers } from "../../../services/users";
import { fetchUserData } from "../slices/userReducer";

type Params = Pick<UserState, "searchText" | "skip" | "limit">

type Return = {
    loading: boolean
    errorMsg: string
    fetchUserList: (params: Params) => Promise<void>
}

export const useFetchUsers = (): Return => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const fetchUserList = useCallback(async(params: Params) => {

        setLoading(true);

        try {

            const { users, total } = await fetchUsers(params);

            dispatch(fetchUserData({
                users,
                totalUserCount: total
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
        fetchUserList
    }

}