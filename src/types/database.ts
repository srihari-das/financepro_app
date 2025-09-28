// Supabase Database Type Definitions

export type EmploymentStatus = 'Employed' | 'Unemployed' | 'Student' | 'Retired' | 'SelfEmployed' | 'Other'

export type DebtType = 'CreditCard' | 'StudentLoan' | 'Mortgage' | 'PersonalLoan' | 'AutoLoan' | 'Other'

export type ExpenseCategory = 
  | 'Housing' 
  | 'Utilities' 
  | 'Food' 
  | 'Transportation' 
  | 'Healthcare' 
  | 'Entertainment' 
  | 'Debt' 
  | 'SubscriptionNeed' 
  | 'SubscriptionNice' 
  | 'Other'

export type PriorityLevel = 'Low' | 'Med' | 'High'

export type GoalCategory = 
  | 'EmergencyFund' 
  | 'Vacation' 
  | 'Education' 
  | 'Retirement' 
  | 'LargePurchase' 
  | 'Other'

export type IncomeCategory = 'Salary' | 'Bonus' | 'Investment' | 'Gift' | 'Other'

export type GoalTag = 
  | 'saving money'
  | 'paying off debt'
  | 'learning about investing'
  | 'building credit'
  | 'financial education'
  | 'retirement planning'
  | 'tax optimization'
  | 'insurance planning'

// Database table interfaces
export interface Users {
  userid: number
  email: string
  phonenumber?: string
}

export interface AccountDetails {
  userid: number
  financialgoal: string
  timeline: string
  goalamount: number
  currentsavings: number
  monthlyexpenses: number
  goaltags: GoalTag[]
  age: number
  employmentstatus: EmploymentStatus
  annualincome: number
  checkingbalance: number
  createdat: string
}

export interface Debt {
  userid: number
  balance: number
  debttype: DebtType
  interestrate: number
  payofftime: string // interval as string
  debtfreegoal: number
  createdat: string
}

export interface Expenses {
  userid: number
  expensename: string
  amount: number
  expensedate: string // date as string
  category: ExpenseCategory
  company?: string
  reciever?: string
  createdat: string
}

export interface GoalSavings {
  userid: number
  goalamount: number
  prioritylevel: PriorityLevel
  goalcategory: GoalCategory
  checkingbalance: number
  frequencypayment: string
  deadlinetogoal: string // date as string
  createdat: string
}

export interface Income {
  userid: number
  sender?: string
  amount: number
  incomedate: string // date as string
  incomecategory: IncomeCategory
  company?: string
  createdat: string
}

// Database schema type for Supabase
export interface Database {
  public: {
    Tables: {
      users: {
        Row: Users
        Insert: Omit<Users, 'userid'>
        Update: Partial<Omit<Users, 'userid'>>
      }
      accountdetails: {
        Row: AccountDetails
        Insert: Omit<AccountDetails, 'createdat'>
        Update: Partial<Omit<AccountDetails, 'userid' | 'createdat'>>
      }
      debt: {
        Row: Debt
        Insert: Omit<Debt, 'createdat'>
        Update: Partial<Omit<Debt, 'userid' | 'createdat'>>
      }
      expenses: {
        Row: Expenses
        Insert: Omit<Expenses, 'createdat'>
        Update: Partial<Omit<Expenses, 'userid' | 'createdat'>>
      }
      goalsavings: {
        Row: GoalSavings
        Insert: Omit<GoalSavings, 'createdat'>
        Update: Partial<Omit<GoalSavings, 'userid' | 'createdat'>>
      }
      income: {
        Row: Income
        Insert: Omit<Income, 'createdat'>
        Update: Partial<Omit<Income, 'userid' | 'createdat'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Computed/derived types for the application
export interface UserFinancialSummary {
  user: Users
  accountDetails: AccountDetails
  totalDebt: number
  totalMonthlyIncome: number
  totalMonthlyExpenses: number
  netWorth: number
  debtToIncomeRatio: number
  savingsRate: number
}

export interface DebtSummary {
  debts: Debt[]
  totalDebt: number
  totalMinimumPayments: number
  highestInterestDebt: Debt | null
  lowestBalanceDebt: Debt | null
}

export interface SubscriptionSummary {
  needSubscriptions: Expenses[]
  niceSubscriptions: Expenses[]
  totalNeedAmount: number
  totalNiceAmount: number
  potentialSavings: number
}

export interface SavingsGoalSummary {
  goals: GoalSavings[]
  totalGoalAmount: number
  totalSavedAmount: number
  highestPriorityGoal?: GoalSavings
  activeGoalsCount: number
  completedGoalsCount: number
}
