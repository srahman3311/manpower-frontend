import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User as IUser, UserRole } from "../types/User";
import { UserState } from "../types/UserState";

const initialState: UserState = {
    searchText: "",
    skip: 0,
    limit: 10,
    totalUserCount: 0,
    userList: [],
    newUserInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: UserRole.Admin,
        password: "",
        password2: ""
    },
    profilePhoto: null,
    userInAction: null,
    isDeleting: false 
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value
            }
        },
        fetchUserData: (state, action: PayloadAction<{ users: IUser[], totalUserCount: number }>) => {
            const { users, totalUserCount } = action.payload;
            return {
                ...state,
                userList: users,
                totalUserCount
            }
        },
        addNewUserInfo: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                newUserInfo: {
                    ...state.newUserInfo,
                    [name]: value
                }
            }
        },
        toggleDeleteModal: (state, action: PayloadAction<IUser | null>) => {
            return {
                ...state,
                isDeleting: !state.isDeleting,
                userInAction: action.payload
            }
        },
        filterUserList: (state, action: PayloadAction<IUser[]>) => {
            return {
                ...state,
                totalUserCount: state.totalUserCount - 1,
                userList: action.payload
            }
        },
    }
})

export const {
    updateState,
    fetchUserData,
    addNewUserInfo,
    toggleDeleteModal,
    filterUserList
} = usersSlice.actions;

export default usersSlice.reducer;