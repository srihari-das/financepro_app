import {
  Customer,
  Account,
  Purchase,
  Bill,
  Deposit,
  Transfer,
  CustomerResponse,
  SingleCustomerResponse,
  AccountsResponse,
  PurchasesResponse,
  BillsResponse,
  DepositsResponse,
  TransfersResponse,
} from '@/types/api/nessie';

class NessieApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_NESSIE_BASE_URL || 'http://api.nessieisreal.com';
    this.apiKey = process.env.NEXT_PUBLIC_NESSIE_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('Nessie API key not found. Please set NEXT_PUBLIC_NESSIE_API_KEY in your .env.local file');
    }
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}${endpoint.includes('?') ? '&' : '?'}key=${this.apiKey}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Nessie API request failed:', error);
      throw error;
    }
  }

  // Customer endpoints
  async getAllCustomers(): Promise<Customer[]> {
    const response = await this.makeRequest<CustomerResponse>('/customers');
    return response.data || [];
  }

  async getCustomer(customerId: string): Promise<Customer | null> {
    try {
      const response = await this.makeRequest<SingleCustomerResponse>(`/customers/${customerId}`);
      return response.data || null;
    } catch (error) {
      console.error('Failed to fetch customer:', error);
      return null;
    }
  }

  // Account endpoints
  async getCustomerAccounts(customerId: string): Promise<Account[]> {
    try {
      const response = await this.makeRequest<AccountsResponse>(`/customers/${customerId}/accounts`);
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch customer accounts:', error);
      return [];
    }
  }

  async getAccount(accountId: string): Promise<Account | null> {
    try {
      const response = await this.makeRequest<Account>(`/accounts/${accountId}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch account:', error);
      return null;
    }
  }

  // Purchase endpoints
  async getAccountPurchases(accountId: string): Promise<Purchase[]> {
    try {
      const response = await this.makeRequest<PurchasesResponse>(`/accounts/${accountId}/purchases`);
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch account purchases:', error);
      return [];
    }
  }

  async getCustomerPurchases(customerId: string): Promise<Purchase[]> {
    try {
      const response = await this.makeRequest<PurchasesResponse>(`/customers/${customerId}/purchases`);
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch customer purchases:', error);
      return [];
    }
  }

  // Bill endpoints
  async getAccountBills(accountId: string): Promise<Bill[]> {
    try {
      const response = await this.makeRequest<BillsResponse>(`/accounts/${accountId}/bills`);
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch account bills:', error);
      return [];
    }
  }

  async getCustomerBills(customerId: string): Promise<Bill[]> {
    try {
      const response = await this.makeRequest<BillsResponse>(`/customers/${customerId}/bills`);
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch customer bills:', error);
      return [];
    }
  }

  // Deposit endpoints
  async getAccountDeposits(accountId: string): Promise<Deposit[]> {
    try {
      const response = await this.makeRequest<DepositsResponse>(`/accounts/${accountId}/deposits`);
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch account deposits:', error);
      return [];
    }
  }

  // Transfer endpoints
  async getAccountTransfers(accountId: string): Promise<Transfer[]> {
    try {
      const response = await this.makeRequest<TransfersResponse>(`/accounts/${accountId}/transfers`);
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch account transfers:', error);
      return [];
    }
  }

  // Utility methods for getting test customer data
  async getTestCustomerId(): Promise<string | null> {
    const testCustomerId = process.env.NEXT_PUBLIC_TEST_CUSTOMER_ID;
    
    if (testCustomerId && testCustomerId !== 'your_customer_id_here') {
      return testCustomerId;
    }

    // If no specific test customer ID is set, get the first customer
    try {
      const customers = await this.getAllCustomers();
      return customers.length > 0 ? customers[0]._id : null;
    } catch (error) {
      console.error('Failed to get test customer ID:', error);
      return null;
    }
  }
}

export const nessieApiClient = new NessieApiClient();
export default nessieApiClient;