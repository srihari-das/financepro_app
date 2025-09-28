import { supabase, getCurrentUserId } from '@/lib/supabase'
import {
  AccountDetails,
  Debt,
  Expenses,
  Income,
  Users,
  UserFinancialSummary,
  DebtSummary,
  SubscriptionSummary,
  SavingsGoalSummary
} from '@/types/database'

export class FinancialDataService {
  
  // Get comprehensive financial summary for a user
  async getFinancialSummary(): Promise<UserFinancialSummary | null> {
    try {
      const userId = await getCurrentUserId()
      if (!userId) {
        console.error('No authenticated user')
        return null
      }

      // Fetch all necessary data
      const [user, accountDetails, debts, expenses, income] = await Promise.all([
        this.getUserProfileById(userId),
        this.getAccountDetails(userId),
        this.getUserDebts(userId),
        this.getUserExpenses(userId),
        this.getUserIncome(userId)
      ])

      if (!user || !accountDetails) {
        return null
      }

      // Calculate summary statistics
      const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0)
      const totalMonthlyIncome = this.calculateMonthlyIncome(income)
      const totalMonthlyExpenses = this.calculateMonthlyExpenses(expenses)
      const netWorth = accountDetails.checkingbalance + accountDetails.currentsavings - totalDebt
      const debtToIncomeRatio = totalMonthlyIncome > 0 ? (totalDebt / (totalMonthlyIncome * 12)) : 0
      const savingsRate = totalMonthlyIncome > 0 ? ((totalMonthlyIncome - totalMonthlyExpenses) / totalMonthlyIncome) : 0

      return {
        user,
        accountDetails,
        totalDebt,
        totalMonthlyIncome,
        totalMonthlyExpenses,
        netWorth,
        debtToIncomeRatio,
        savingsRate
      }

    } catch (error) {
      console.error('Failed to get financial summary:', error)
      return null
    }
  }

  // Get debt information for debt payoff feature
  async getDebtSummary(): Promise<DebtSummary | null> {
    try {
      const userId = await getCurrentUserId()
      if (!userId) return null

      const debts = await this.getUserDebts(userId)
      const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0)
      
      // Calculate minimum payments (rough estimate of 2.5% of balance)
      const totalMinimumPayments = debts.reduce((sum, debt) => {
        const minPayment = debt.debttype === 'CreditCard' 
          ? Math.max(25, debt.balance * 0.025) // Credit cards: minimum $25 or 2.5%
          : debt.balance * 0.01 // Other debts: 1%
        return sum + minPayment
      }, 0)

      const highestInterestDebt = debts.reduce((highest, debt) => 
        (!highest || debt.interestrate > highest.interestrate) ? debt : highest
      , null as Debt | null)

      const lowestBalanceDebt = debts.reduce((lowest, debt) => 
        (!lowest || debt.balance < lowest.balance) ? debt : lowest
      , null as Debt | null)

      return {
        debts,
        totalDebt,
        totalMinimumPayments,
        highestInterestDebt,
        lowestBalanceDebt
      }

    } catch (error) {
      console.error('Failed to get debt summary:', error)
      return null
    }
  }

  // Get subscription summary for expense management
  async getSubscriptionSummary(): Promise<SubscriptionSummary | null> {
    try {
      const userId = await getCurrentUserId()
      if (!userId) return null

      const { data: subscriptions, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('userid', userId)
        .in('category', ['SubscriptionNeed', 'SubscriptionNice'])
        .order('amount', { ascending: false })

      if (error) {
        console.error('Error fetching subscriptions:', error)
        return null
      }

      const needSubscriptions = subscriptions.filter(sub => sub.category === 'SubscriptionNeed')
      const niceSubscriptions = subscriptions.filter(sub => sub.category === 'SubscriptionNice')
      
      const totalNeedAmount = needSubscriptions.reduce((sum, sub) => sum + sub.amount, 0)
      const totalNiceAmount = niceSubscriptions.reduce((sum, sub) => sum + sub.amount, 0)
      const potentialSavings = totalNiceAmount

      return {
        needSubscriptions,
        niceSubscriptions,
        totalNeedAmount,
        totalNiceAmount,
        potentialSavings
      }

    } catch (error) {
      console.error('Failed to get subscription summary:', error)
      return null
    }
  }

  // Get savings goals summary
  async getSavingsGoals(): Promise<SavingsGoalSummary | null> {
    try {
      const userId = await getCurrentUserId()
      if (!userId) return null

      const { data: goals, error } = await supabase
        .from('goalsavings')
        .select('*')
        .eq('userid', userId)
        .order('createdat', { ascending: false })

      if (error) {
        console.error('Error fetching savings goals:', error)
        return null
      }

      const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.goalamount, 0)
      const totalSavedAmount = goals.reduce((sum, goal) => sum + goal.checkingbalance, 0)
      const highestPriorityGoal = goals.find(goal => goal.prioritylevel === 'High') || 
                                 goals.find(goal => goal.prioritylevel === 'Med') || 
                                 goals.find(goal => goal.prioritylevel === 'Low')
      const activeGoalsCount = goals.filter(goal => goal.checkingbalance < goal.goalamount).length
      const completedGoalsCount = goals.filter(goal => goal.checkingbalance >= goal.goalamount).length

      return {
        goals: goals || [],
        totalGoalAmount,
        totalSavedAmount,
        highestPriorityGoal,
        activeGoalsCount,
        completedGoalsCount
      }
    } catch (error) {
      console.error('Failed to get savings goals:', error)
      return null
    }
  }

  // Get user profile
  async getUserProfile(): Promise<Users | null> {
    try {
      const userId = await getCurrentUserId()
      if (!userId) return null

      return this.getUserProfileById(userId)
    } catch (error) {
      console.error('Failed to get user profile:', error)
      return null
    }
  }

  // Helper methods
  private async getUserProfileById(userId: number): Promise<Users | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('userid', userId)
      .single()

    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }

    return data
  }

  private async getAccountDetails(userId: number): Promise<AccountDetails | null> {
    const { data, error } = await supabase
      .from('accountdetails')
      .select('*')
      .eq('userid', userId)
      .single()

    if (error) {
      console.error('Error fetching account details:', error)
      return null
    }

    return data
  }

  private async getUserDebts(userId: number): Promise<Debt[]> {
    const { data, error } = await supabase
      .from('debt')
      .select('*')
      .eq('userid', userId)
      .order('interestrate', { ascending: false })

    if (error) {
      console.error('Error fetching debts:', error)
      return []
    }

    return data || []
  }

  private async getUserExpenses(userId: number, days: number = 30): Promise<Expenses[]> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('userid', userId)
      .gte('expensedate', cutoffDate.toISOString().split('T')[0])
      .order('expensedate', { ascending: false })

    if (error) {
      console.error('Error fetching expenses:', error)
      return []
    }

    return data || []
  }

  private async getUserIncome(userId: number, days: number = 30): Promise<Income[]> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    const { data, error } = await supabase
      .from('income')
      .select('*')
      .eq('userid', userId)
      .gte('incomedate', cutoffDate.toISOString().split('T')[0])
      .order('incomedate', { ascending: false })

    if (error) {
      console.error('Error fetching income:', error)
      return []
    }

    return data || []
  }

  private calculateMonthlyIncome(income: Income[]): number {
    return income.reduce((sum, item) => sum + item.amount, 0)
  }

  private calculateMonthlyExpenses(expenses: Expenses[]): number {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0)
  }
}

export const financialDataService = new FinancialDataService();
export default financialDataService;