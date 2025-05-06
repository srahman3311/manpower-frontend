import httpClient from "./httpClient";
import { Expense } from "../features/expenses/types/Expense";
import { ExpenseRequestBody, ExpenseState } from "../features/expenses/types/ExpenseState";

type Params = Pick<ExpenseState, "searchText" | "skip" | "limit">

export const fetchExpenses = async(params: Params): Promise<{ expenses: Expense[], total: number }> => {
    const paramString = `searchText=${params.searchText}&skip=${params.skip}&limit=${params.limit}`;
    return httpClient.get(`/expenses?${paramString}`);
}

export const fetchExpensesByJobId = async(jobId: number): Promise<Expense[]> => {
    return httpClient.get(`/expenses/job/${jobId}`);
}

export const fetchExpensesByPassengerId = async(passengerId: number): Promise<Expense[]> => {
    return httpClient.get(`/expenses/passenger/${passengerId}`);
}

export const createExpense = async(requestBody: ExpenseRequestBody): Promise<Expense> => {
    return httpClient.post("/expenses/create", requestBody);
}

export const editExpense = async(expenseId: string, requestBody: ExpenseRequestBody): Promise<Expense> => {
    return httpClient.patch(`/expenses/${expenseId}/edit`, requestBody);
}

export const toggleExpenseApprovalStatus = async(expenseId: number): Promise<Expense> => {
    return httpClient.patch(`/expenses/${expenseId}/toggle`, {});
}

export const deleteExpense = async(expenseId?: number): Promise<void> => {
    return httpClient.delete(`/expenses/${expenseId}/delete`);
}

