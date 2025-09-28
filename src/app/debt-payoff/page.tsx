'use client'

import { useState } from 'react'
import { 
  CreditCardIcon,
  ChartBarIcon,
  ChartPieIcon,
  PlusIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  TrashIcon,
  PencilIcon
} from '@heroicons/react/24/outline'
import ReactMarkdown from 'react-markdown'
import { useDebtInfo, useSubscriptionSummary } from '@/hooks/useFinancialData'
import { DebtType } from '@/types/database'

export default function DebtPayoff() {
  
  const [activeTab, setActiveTab] = useState('overview')
  const [newDebt, setNewDebt] = useState({
    name: '',
    balance: '',
    minimumPayment: '',
    interestRate: '',
    type: 'CreditCard' as DebtType
  })
  const [extraPayment, setExtraPayment] = useState('');
  const [aiStrategy, setAiStrategy] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch debt and subscription data from database
  const { data: debtData, loading: debtLoading, error: debtError } = useDebtInfo()
  const { data: subscriptionData, loading: subscriptionLoading, error: subscriptionError } = useSubscriptionSummary()

  // Loading state
  if (debtLoading || subscriptionLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your debt information...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (debtError || subscriptionError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading debt data</p>
          <p className="text-gray-600">{debtError || subscriptionError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const debts = debtData?.debts || []

  const getDebtTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'creditcard': return 'bg-red-100 text-red-800'
      case 'studentloan': return 'bg-blue-100 text-blue-800'
      case 'autoloan': return 'bg-green-100 text-green-800'
      case 'mortgage': return 'bg-purple-100 text-purple-800'
      case 'personalloan': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDebtTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'creditcard': return '💳'
      case 'studentloan': return '🎓'
      case 'autoloan': return '🚗'
      case 'mortgage': return '🏠'
      case 'personalloan': return '💰'
      default: return '💰'
    }
  }

  const totalDebt = debtData?.totalDebt || 0
  const totalMinimumPayments = debtData?.totalMinimumPayments || 0
  
  // Calculate estimated total interest (simplified calculation)
  const totalInterestIfMinimum = debts.reduce((sum, debt) => {
    // Simple interest calculation assuming minimum payments
    const monthsToPayoff = Math.ceil(debt.balance / (debt.balance * 0.025)) // rough estimate
    return sum + (debt.balance * (debt.interestrate / 100) * (monthsToPayoff / 12))
  }, 0)

  const niceToHaveTotal = subscriptionData?.totalNiceAmount || 0

  const handleAddDebt = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to create new debt in Supabase
    alert('Debt creation will be implemented with Supabase integration')
    
    // For now, reset form and switch to overview
    setNewDebt({
      name: '',
      balance: '',
      minimumPayment: '',
      interestRate: '',
      type: 'CreditCard' as DebtType
    })
    setActiveTab('overview')
  }

  // Helper function to calculate months to payoff
  const calculateMonthsToPayoff = (balance: number, interestRate: number) => {
    const monthlyRate = interestRate / 100 / 12
    const minPayment = Math.max(25, balance * 0.025) // Minimum 2.5% or $25
    
    if (monthlyRate === 0) {
      return Math.ceil(balance / minPayment)
    }
    
    return Math.ceil(-Math.log(1 - (balance * monthlyRate) / minPayment) / Math.log(1 + monthlyRate))
  }

  // At the top of your DebtPayoff component

  const handleGenerateStrategy = async () => {
    setIsGenerating(true);
    setError(null);
    setAiStrategy('');


    try {
      const response = await fetch('/api/debt-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          debts: debts,
          subscriptions: subscriptionData,
          extraPayment: parseFloat(extraPayment) || 0,
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text(); // Get the raw HTML/text response
        throw new Error(errorText || `Server returned an error: ${response.status}`)
      }

      const data = await response.json();

      if (data.error) {
      throw new Error(data.error);
    }
      
      setAiStrategy(data.strategy);

    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
      console.error('Error generating AI strategy:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Smart Debt Payoff
          </h1>
          <p className="text-gray-600">
            Track your debts, manage subscriptions, and accelerate your journey to financial freedom
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2 font-numeric">
              ${totalDebt.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Debt</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2 font-numeric">
              ${totalMinimumPayments.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Monthly Minimums</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2 font-numeric">
              ${totalInterestIfMinimum.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Interest (Min Payments)</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2 font-numeric">
              ${niceToHaveTotal.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Cancelable Subscriptions</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 justify-center">
            {[
              { id: 'overview', label: 'Debt Overview' },
              { id: 'subscriptions', label: 'Subscription Manager' },
              { id: 'strategies', label: 'Payoff Strategies' },
              { id: 'add-debt', label: 'Add Debt' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Debt List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Debts</h2>
                <button
                  onClick={() => setActiveTab('add-debt')}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Debt
                </button>
              </div>

              {debts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center col-span-2">
                  <div className="text-gray-400 mb-4">
                    <CreditCardIcon className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No debts tracked</h3>
                  <p className="text-gray-600 mb-6">Add your debts to create a personalized payoff strategy.</p>
                  <button
                    onClick={() => setActiveTab('add-debt')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                  >
                    Add Your First Debt
                  </button>
                </div>
              ) : (
                debts.map((debt) => {
                  const monthsToPayoff = calculateMonthsToPayoff(debt.balance, debt.interestrate)
                  const estimatedInterest = debt.balance * (debt.interestrate / 100) * (monthsToPayoff / 12)
                  
                  return (
                    <div key={debt.userid} className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{getDebtTypeIcon(debt.debttype)}</div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{debt.debttype} Debt</h3>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDebtTypeColor(debt.debttype)}`}>
                              {debt.debttype.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600">Balance</div>
                          <div className="text-lg font-semibold text-red-600 font-numeric">
                            ${debt.balance.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Minimum Payment</div>
                          <div className="text-lg font-semibold font-numeric">
                            ${Math.max(25, debt.balance * 0.025).toFixed(0)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Interest Rate</div>
                          <div className="text-lg font-semibold text-orange-600 font-numeric">
                            {debt.interestrate}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Payoff Time</div>
                          <div className="text-lg font-semibold">
                            {Math.floor(monthsToPayoff / 12)}y {monthsToPayoff % 12}m
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center">
                          <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
                          <div className="text-sm text-red-700">
                            At minimum payments, you&apos;ll pay <strong>${estimatedInterest.toFixed(0).toLocaleString()}</strong> in interest
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Debt Visualization */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ChartPieIcon className="h-5 w-5 mr-2 text-indigo-600" />
                  Debt Breakdown
                </h3>
                <div className="space-y-3">
                  {debts.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <p>No debts to display</p>
                    </div>
                  ) : (
                    debts.map((debt) => {
                      const percentage = totalDebt > 0 ? ((debt.balance / totalDebt) * 100).toFixed(1) : '0'
                      return (
                        <div key={debt.userid} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="text-sm">{getDebtTypeIcon(debt.debttype)}</div>
                            <div className="text-sm font-medium text-gray-700 truncate">
                              {debt.debttype} Debt
                            </div>
                          </div>
                          <div className="text-sm font-semibold">{percentage}%</div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Simulator</h3>
                <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center text-gray-500">
                    <ChartBarIcon className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">Debt payoff timeline chart</p>
                    <p className="text-xs">Interactive visualization coming soon</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-sm p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Debt-Free Goal</h3>
                <div className="text-3xl font-bold mb-1 font-numeric">2.8 years</div>
                <div className="text-green-100 text-sm">
                  With current minimum payments
                </div>
                <button className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Optimize Strategy
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Subscription Manager</h2>
                <p className="text-gray-600">Review and manage your monthly subscriptions to free up money for debt payments</p>
              </div>

              <div className="p-6">
                {/* Summary */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 font-numeric">
                      ${((subscriptionData?.totalNeedAmount || 0) + (subscriptionData?.totalNiceAmount || 0)).toFixed(2)}
                    </div>
                    <div className="text-sm text-blue-800">Total Monthly</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600 font-numeric">
                      ${subscriptionData?.totalNiceAmount?.toFixed(2) || '0.00'}
                    </div>
                    <div className="text-sm text-red-800">Nice to Have</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600 font-numeric">
                      ${subscriptionData?.totalNeedAmount?.toFixed(2) || '0.00'}
                    </div>
                    <div className="text-sm text-green-800">Need to Have</div>
                  </div>
                </div>

                {/* Subscription Lists */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Need to Have */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
                      Need to Have
                    </h3>
                    <div className="space-y-3">
                      {subscriptionData?.needSubscriptions?.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                          <p>No essential subscriptions found</p>
                        </div>
                      ) : (
                        subscriptionData?.needSubscriptions?.map((sub) => (
                          <div key={sub.userid} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900">{sub.expensename}</div>
                              <div className="text-sm text-gray-600 font-numeric">${sub.amount}/month</div>
                            </div>
                            <div className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              Active
                            </div>
                          </div>
                        )) || []
                      )}
                    </div>
                  </div>

                  {/* Nice to Have */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <XMarkIcon className="h-5 w-5 mr-2 text-red-600" />
                      Nice to Have
                    </h3>
                    <div className="space-y-3">
                      {subscriptionData?.niceSubscriptions?.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                          <p>No optional subscriptions found</p>
                        </div>
                      ) : (
                        subscriptionData?.niceSubscriptions?.map((sub) => (
                          <div key={sub.userid} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900">{sub.expensename}</div>
                              <div className="text-sm text-gray-600 font-numeric">${sub.amount}/month</div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                Active
                              </div>
                              <div className="text-sm text-gray-600">
                                Consider canceling to free up funds
                              </div>
                            </div>
                          </div>
                        )) || []
                      )}
                    </div>
                  </div>
                </div>

                {/* Savings Summary */}
                {niceToHaveTotal > 0 && (
                  <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-indigo-900 mb-2">💰 Potential Savings</h4>
                    <p className="text-indigo-700 mb-4">
                      By canceling &quot;nice to have&quot; subscriptions, you could free up{' '}
                      <strong>${niceToHaveTotal.toFixed(2)}/month</strong> (${(niceToHaveTotal * 12).toFixed(2)}/year) 
                      to put toward debt payments.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/50 p-3 rounded">
                        <div className="font-medium">Extra monthly debt payment:</div>
                        <div className="text-indigo-900 font-bold">${niceToHaveTotal.toFixed(2)}</div>
                      </div>
                      <div className="bg-white/50 p-3 rounded">
                        <div className="font-medium">Potential time saved:</div>
                        <div className="text-indigo-900 font-bold">8-12 months</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Your Personalized AI-Powered Strategy
                </h2>
                <p className="text-gray-600">
                  Let our AI analyze your finances to create a custom payoff plan, just for you.
                </p>
              </div>

              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-4 items-end">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Extra Monthly Payment (Optional)
                    </label>
                    <input
                      type="number"
                      value={extraPayment}
                      onChange={(e) => setExtraPayment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g., 200"
                    />
                  </div>
                  <button
                    onClick={handleGenerateStrategy}
                    disabled={isGenerating}
                      className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                    >
                    {isGenerating ? 'Generating Plan...' : 'Generate My Personalized Strategy'}
                  </button>
                </div>
              </div>

              {/* Display area for the AI's response */}
              <div className="mt-6">
                {isGenerating && (
                  <div className="text-center text-gray-500 py-8">
                    <p>Please wait while our AI crafts your personalized plan...</p>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
                    <p className="font-medium">An error occurred:</p>
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {aiStrategy && (
                  <div className="p-6 border border-gray-200 rounded-lg bg-gray-50/50">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Custom Plan:</h3>
                    <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                      <ReactMarkdown>{aiStrategy}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'add-debt' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New Debt</h2>
                <p className="text-gray-600">Add a debt to track and include in your payoff strategy</p>
              </div>

              <form onSubmit={handleAddDebt} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Debt Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., Visa Credit Card, Car Loan"
                    value={newDebt.name}
                    onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Balance
                    </label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="5000.00"
                      value={newDebt.balance}
                      onChange={(e) => setNewDebt({ ...newDebt, balance: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Monthly Payment
                    </label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="150.00"
                      value={newDebt.minimumPayment}
                      onChange={(e) => setNewDebt({ ...newDebt, minimumPayment: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="18.99"
                      value={newDebt.interestRate}
                      onChange={(e) => setNewDebt({ ...newDebt, interestRate: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Debt Type
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      value={newDebt.type}
                      onChange={(e) => setNewDebt({ ...newDebt, type: e.target.value as DebtType })}
                    >
                      <option value="CreditCard">Credit Card</option>
                      <option value="StudentLoan">Student Loan</option>
                      <option value="AutoLoan">Auto Loan</option>
                      <option value="Mortgage">Mortgage</option>
                      <option value="PersonalLoan">Personal Loan</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                  >
                    Add Debt
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}