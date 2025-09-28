'use client'

import { useState } from 'react'
import { 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CreditCardIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline'
import { useFinancialSummary, useSavingsGoals, useDebtInfo, useSubscriptionSummary } from '@/hooks/useFinancialData'

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months')
  
  // Fetch all financial data
  const { data: financialSummary, loading: summaryLoading } = useFinancialSummary()
  const { data: savingsData, loading: savingsLoading } = useSavingsGoals()
  const { data: debtData, loading: debtLoading } = useDebtInfo()
  const { data: subscriptionData, loading: subscriptionsLoading } = useSubscriptionSummary()

  // Loading state
  if (summaryLoading || savingsLoading || debtLoading || subscriptionsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your financial analytics...</p>
        </div>
      </div>
    )
  }

  const goals = savingsData?.goals || []
  const debts = debtData?.debts || []

  // Calculate analytics data
  const totalAssets = (financialSummary?.accountDetails.checkingbalance || 0) + 
                     (financialSummary?.accountDetails.currentsavings || 0) +
                     (savingsData?.totalSavedAmount || 0)
  
  const totalLiabilities = financialSummary?.totalDebt || 0
  const netWorth = totalAssets - totalLiabilities
  
  const monthlyIncome = financialSummary?.totalMonthlyIncome || 0
  const monthlyExpenses = financialSummary?.totalMonthlyExpenses || 0
  const monthlyCashFlow = monthlyIncome - monthlyExpenses
  
  const savingsGoalsProgress = goals.length > 0 
    ? (savingsData?.totalSavedAmount || 0) / (savingsData?.totalGoalAmount || 1) * 100
    : 0
  
  const debtToIncomeRatio = monthlyIncome > 0 
    ? (totalLiabilities / (monthlyIncome * 12)) * 100 
    : 0

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100'
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Financial Analytics
          </h1>
          <p className="text-gray-600">
            Comprehensive insights into your financial health and progress
          </p>
        </div>

        {/* Period Selector */}
        <div className="mb-8 flex justify-center">
          <nav className="flex space-x-4">
            {[
              { id: '3months', label: '3 Months' },
              { id: '6months', label: '6 Months' },
              { id: '1year', label: '1 Year' },
              { id: 'all', label: 'All Time' }
            ].map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === period.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
          {/* Net Worth */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Net Worth</div>
                <div className={`text-2xl font-bold font-numeric ${netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(netWorth)}
                </div>
              </div>
              <div className={`p-3 rounded-lg ${netWorth >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <BanknotesIcon className={`h-6 w-6 ${netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Assets: {formatCurrency(totalAssets)} | Liabilities: {formatCurrency(totalLiabilities)}
            </div>
          </div>

          {/* Monthly Cash Flow */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Monthly Cash Flow</div>
                <div className={`text-2xl font-bold font-numeric ${monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(monthlyCashFlow)}
                </div>
              </div>
              <div className={`p-3 rounded-lg ${monthlyCashFlow >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {monthlyCashFlow >= 0 ? (
                  <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
                ) : (
                  <ArrowTrendingDownIcon className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Income: {formatCurrency(monthlyIncome)} | Expenses: {formatCurrency(monthlyExpenses)}
            </div>
          </div>

          {/* Savings Goals Progress */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Savings Goals</div>
                <div className="text-2xl font-bold font-numeric text-gray-900">
                  {savingsGoalsProgress.toFixed(1)}%
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(savingsGoalsProgress, 100)}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {formatCurrency(savingsData?.totalSavedAmount || 0)} of {formatCurrency(savingsData?.totalGoalAmount || 0)}
              </div>
            </div>
          </div>

          {/* Debt to Income Ratio */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Debt-to-Income</div>
                <div className={`text-2xl font-bold font-numeric ${debtToIncomeRatio <= 36 ? 'text-green-600' : debtToIncomeRatio <= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {debtToIncomeRatio.toFixed(1)}%
                </div>
              </div>
              <div className={`p-3 rounded-lg ${debtToIncomeRatio <= 36 ? 'bg-green-100' : debtToIncomeRatio <= 50 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                <CreditCardIcon className={`h-6 w-6 ${debtToIncomeRatio <= 36 ? 'text-green-600' : debtToIncomeRatio <= 50 ? 'text-yellow-600' : 'text-red-600'}`} />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              {debtToIncomeRatio <= 36 ? 'Excellent' : debtToIncomeRatio <= 50 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Savings Goals Breakdown */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Goals Breakdown</h3>
            {goals.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <CurrencyDollarIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No savings goals to display</p>
                <p className="text-sm">Create your first savings goal to see analytics</p>
              </div>
            ) : (
              <div className="space-y-4">
                {goals.map((goal, index) => {
                  const progress = goal.goalamount > 0 ? (goal.checkingbalance / goal.goalamount) * 100 : 0
                  return (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{goal.goalcategory}</span>
                        <span className="text-sm font-medium">{progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(progress).includes('green') ? 'bg-green-500' : getProgressColor(progress).includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{formatCurrency(goal.checkingbalance)}</span>
                        <span>{formatCurrency(goal.goalamount)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Debt Breakdown */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Debt Breakdown</h3>
            {debts.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <CreditCardIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No debts to display</p>
                <p className="text-sm">Great job staying debt-free!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {debts.map((debt, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{debt.debttype}</span>
                      <span className="text-sm font-medium text-red-600">{debt.interestrate}% APR</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Balance: {formatCurrency(debt.balance)}</span>
                      <span>Min Payment: {formatCurrency(debt.balance * 0.025)}</span>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between font-semibold">
                    <span>Total Debt:</span>
                    <span className="text-red-600">{formatCurrency(totalLiabilities)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Monthly Subscription Analysis */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Subscription Analysis</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 font-numeric">
                {formatCurrency(subscriptionData?.totalNeedAmount || 0)}
              </div>
              <div className="text-sm text-gray-600">Essential Subscriptions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 font-numeric">
                {formatCurrency(subscriptionData?.totalNiceAmount || 0)}
              </div>
              <div className="text-sm text-gray-600">Optional Subscriptions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 font-numeric">
                {formatCurrency(subscriptionData?.potentialSavings || 0)}
              </div>
              <div className="text-sm text-gray-600">Potential Monthly Savings</div>
            </div>
          </div>
        </div>

        {/* Financial Health Recommendations */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health Recommendations</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {netWorth < 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-sm font-medium text-red-800">Negative Net Worth</div>
                  <div className="text-sm text-red-700">Focus on debt reduction and building emergency savings.</div>
                </div>
              )}
              {debtToIncomeRatio > 36 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-sm font-medium text-yellow-800">High Debt-to-Income Ratio</div>
                  <div className="text-sm text-yellow-700">Consider debt consolidation or increased payments.</div>
                </div>
              )}
              {monthlyCashFlow < 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-sm font-medium text-red-800">Negative Cash Flow</div>
                  <div className="text-sm text-red-700">Review expenses and consider increasing income.</div>
                </div>
              )}
            </div>
            <div className="space-y-3">
              {savingsGoalsProgress < 25 && goals.length > 0 && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm font-medium text-blue-800">Low Savings Progress</div>
                  <div className="text-sm text-blue-700">Consider increasing monthly savings contributions.</div>
                </div>
              )}
              {(subscriptionData?.potentialSavings || 0) > 100 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm font-medium text-green-800">Subscription Optimization</div>
                  <div className="text-sm text-green-700">You could save {formatCurrency(subscriptionData?.potentialSavings || 0)} by canceling optional subscriptions.</div>
                </div>
              )}
              {monthlyCashFlow > 0 && savingsGoalsProgress > 75 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm font-medium text-green-800">Great Financial Health!</div>
                  <div className="text-sm text-green-700">You&apos;re on track with your financial goals.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}