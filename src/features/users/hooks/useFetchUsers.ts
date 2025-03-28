import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { UserState } from "../types/UserState";
import { fetchUsers } from "../../../services/users";
import { fetchUserData } from "../slices/userReducer";
import { handleApiError } from "../../../utils/error-handlers/handleApiError";

type Params = Pick<UserState, "searchText" | "skip" | "limit">

type Return = {
    loading: boolean
    errorMsg: string
    fetchUserList: (params: Params) => Promise<void>
}

export const useFetchUsers = (): Return => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);
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
            const { message } = handleApiError(error);
            setErrorMsg(message)
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