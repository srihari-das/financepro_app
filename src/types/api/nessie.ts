// Nessie API Type Definitions based on Capital One API Documentation

export interface Address {
  street_number: string;
  street_name: string;
  city: string;
  state: string;
  zip: string;
}

export interface Customer {
  _id: string;
  first_name: string;
  last_name: string;
  address: Address;
}

export interface Account {
  _id: string;
  type: 'Credit Card' | 'Checking' | 'Savings';
  nickname: string;
  rewards: number;
  balance: number;
  account_number: string;
  customer_id: string;
}

export interface Purchase {
  _id: string;
  merchant_id: string;
  medium: 'balance' | 'rewards';
  purchase_date: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  description: string;
  account_id: string;
}

export interface Bill {
  _id: string;
  status: 'pending' | 'completed' | 'cancelled';
  payee: string;
  nickname: string;
  creation_date: string;
  payment_date: string;
  recurring_date: number;
  upcoming_payment_date: string;
  payment_amount: number;
  account_id: string;
}

export interface Deposit {
  _id: string;
  type: 'deposit';
  transaction_date: string;
  status: 'pending' | 'completed';
  medium: 'balance';
  amount: number;
  description: string;
  account_id: string;
}

export interface Transfer {
  _id: string;
  type: 'p2p' | 'deposit' | 'withdrawal';
  transaction_date: string;
  status: 'pending' | 'completed' | 'cancelled';
  medium: 'balance' | 'rewards';
  payer_id: string;
  payee_id: string;
  amount: number;
  description: string;
}

// API Response wrappers
export interface NessieApiResponse<T> {
  message?: string;
  code?: number;
  data?: T;
}

export interface CustomerResponse extends NessieApiResponse<Customer[]> {}
export interface SingleCustomerResponse extends NessieApiResponse<Customer> {}
export interface AccountsResponse extends NessieApiResponse<Account[]> {}
export interface PurchasesResponse extends NessieApiResponse<Purchase[]> {}
export interface BillsResponse extends NessieApiResponse<Bill[]> {}
export interface DepositsResponse extends NessieApiResponse<Deposit[]> {}
export interface TransfersResponse extends NessieApiResponse<Transfer[]> {}

// Our application's transformed data types
export interface FinancialSummary {
  totalBalance: number;
  totalRewards: number;
  accounts: Account[];
  recentTransactions: (Purchase | Deposit | Transfer)[];
  monthlyIncome: number;
  monthlyExpenses: number;
  upcomingBills: Bill[];
}

export interface DebtInfo {
  creditCards: Account[];
  totalCreditCardDebt: number;
  minimumPayments: number;
  availableCredit: number;
}

export interface SavingsGoalData {
  currentSavings: number;
  savingsAccounts: Account[];
  monthlyDeposits: Deposit[];
}