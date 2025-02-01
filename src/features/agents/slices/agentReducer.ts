import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Agent as IAgent, AgentCategory } from "../types/Agent";
import { AgentState } from "../types/AgentState";

const initialState: AgentState = {
    searchText: "",
    skip: 0,
    limit: 10,
    totalAgentCount: 0,
    agentList: [],
    newAgentInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        category: AgentCategory.A,
        address: ""
    },
    photo: null,
    agentInAction: null,
    isDeleting: false 
}

const agentsSlice = createSlice({
    name: "agents",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value
            }
        },
        fetchAgentData: (state, action: PayloadAction<{ agents: IAgent[], totalAgentCount: number }>) => {
            const { agents, totalAgentCount } = action.payload;
            return {
                ...state,
                agentList: agents,
                totalAgentCount
            }
        },
        addNewAgentInfo: (state, action: PayloadAction<{ name: string, value: any }>) => {
            const { name, value } = action.payload;
            return {
                ...state,
                newAgentInfo: {
                    ...state.newAgentInfo,
                    [name]: value
                }
            }
        },
        toggleDeleteModal: (state, action: PayloadAction<IAgent | null>) => {
            return {
                ...state,
                isDeleting: !state.isDeleting,
                agentInAction: action.payload
            }
        },
        filterAgentList: (state, action: PayloadAction<IAgent[]>) => {
            return {
                ...state,
                totalAgentCount: state.totalAgentCount - 1,
                agentList: action.payload
            }
        },
    }
})

export const {
    updateState,
    fetchAgentData,
    addNewAgentInfo,
    toggleDeleteModal,
    filterAgentList
} = agentsSlice.actions;

export default agentsSlice.reducer;