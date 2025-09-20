import { apiService } from './api';

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export const transactionService = {
  getTransactions: () => apiService.get<Transaction[]>('/transactions'),
  
  createTransaction: (transaction: Omit<Transaction, 'id'>) => 
    apiService.post<Transaction>('/transactions', transaction),
  
  getRecentTransactions: (limit = 10) => 
    apiService.get<Transaction[]>(`/transactions/recent?limit=${limit}`),
};