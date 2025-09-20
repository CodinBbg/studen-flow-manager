import { apiService } from './api';

export interface FundAllocation {
  totalFunds: number;
  currentBalance: number;
  monthlyLimit: number;
  monthlySpent: number;
}

export const fundService = {
  getFundAllocation: () => apiService.get<FundAllocation>('/funds/allocation'),
  
  updateTotalFunds: (amount: number) => 
    apiService.put<FundAllocation>('/funds/total', { amount }),
  
  emergencyWithdraw: (amount: number, reason: string) => 
    apiService.post('/funds/emergency-withdraw', { amount, reason }),
};