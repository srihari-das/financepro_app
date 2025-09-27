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

export default function DebtPayoff() {
  const [activeTab, setActiveTab] = useState('overview')
  const [newDebt, setNewDebt] = useState({
    name: '',
    balance: '',
    minimumPayment: '',
    interestRate: '',
    type: 'credit-card'
  })

  // Mock debt data
  const [debts, setDebts] = useState([
    {
      id: 1,
      name: 'Chase Freedom Credit Card',
      balance: 3500,
      minimumPayment: 105,
      interestRate: 18.99,
      type: 'credit-card',
      monthsToPayoff: 42,
      totalInterest: 1247
    },
    {
      id: 2,
      name: 'Student Loan - Federal',
      balance: 15000,
      minimumPayment: 170,
      interestRate: 5.5,
      type: 'student-loan',
      monthsToPayoff: 120,
      totalInterest: 5400
    },
    {
      id: 3,
      name: 'Car Loan - Honda Civic',
      balance: 8500,
      minimumPayment: 285,
      interestRate: 4.2,
      type: 'auto-loan',
      monthsToPayoff: 36,
      totalInterest: 892
    }
  ])

  // Mock subscription data  
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: 'Netflix', amount: 15.99, category: 'nice-to-have', active: true },
    { id: 2, name: 'Spotify Premium', amount: 9.99, category: 'nice-to-have', active: true },
    { id: 3, name: 'Internet', amount: 79.99, category: 'need-to-have', active: true },
    { id: 4, name: 'Phone Plan', amount: 65.00, category: 'need-to-have', active: true },
    { id: 5, name: 'Gym Membership', amount: 29.99, category: 'nice-to-have', active: false },
    { id: 6, name: 'Amazon Prime', amount: 14.98, category: 'nice-to-have', active: true },
    { id: 7, name: 'Health Insurance', amount: 320.00, category: 'need-to-have', active: true }
  ])

  const getDebtTypeColor = (type: string) => {
    switch (type) {
      case 'credit-card': return 'bg-red-100 text-red-800'
      case 'student-loan': return 'bg-blue-100 text-blue-800'
      case 'auto-loan': return 'bg-green-100 text-green-800'
      case 'mortgage': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDebtTypeIcon = (type: string) => {
    switch (type) {
      case 'credit-card': return '💳'
      case 'student-loan': return '🎓'
      case 'auto-loan': return '🚗'
      case 'mortgage': return '🏠'
      default: return '💰'
    }
  }

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0)
  const totalMinimumPayments = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0)
  const totalInterestIfMinimum = debts.reduce((sum, debt) => sum + debt.totalInterest, 0)

  const activeSubscriptions = subscriptions.filter(sub => sub.active)
  const niceToHaveTotal = activeSubscriptions
    .filter(sub => sub.category === 'nice-to-have')
    .reduce((sum, sub) => sum + sub.amount, 0)

  const handleAddDebt = (e: React.FormEvent) => {
    e.preventDefault()
    const balance = parseFloat(newDebt.balance)
    const minPayment = parseFloat(newDebt.minimumPayment)
    const rate = parseFloat(newDebt.interestRate)
    
    // Simple calculation for months to payoff and total interest
    const monthsToPayoff = Math.ceil(balance / minPayment)
    const totalInterest = (minPayment * monthsToPayoff) - balance

    const debt = {
      id: debts.length + 1,
      name: newDebt.name,
      balance,
      minimumPayment: minPayment,
      interestRate: rate,
      type: newDebt.type,
      monthsToPayoff,
      totalInterest: Math.max(0, totalInterest)
    }

    setDebts([...debts, debt])
    setNewDebt({
      name: '',
      balance: '',
      minimumPayment: '',
      interestRate: '',
      type: 'credit-card'
    })
  }

  const toggleSubscription = (id: number) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === id ? { ...sub, active: !sub.active } : sub
    ))
  }

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
            <div className="text-3xl font-bold text-red-600 mb-2">
              ${totalDebt.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Debt</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              ${totalMinimumPayments.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Monthly Minimums</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              ${totalInterestIfMinimum.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Interest (Min Payments)</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
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

              {debts.map((debt) => (
                <div key={debt.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{getDebtTypeIcon(debt.type)}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{debt.name}</h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDebtTypeColor(debt.type)}`}>
                          {debt.type.replace('-', ' ').toUpperCase()}
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
                      <div className="text-lg font-semibold text-red-600">
                        ${debt.balance.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Minimum Payment</div>
                      <div className="text-lg font-semibold">
                        ${debt.minimumPayment}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Interest Rate</div>
                      <div className="text-lg font-semibold text-orange-600">
                        {debt.interestRate}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Payoff Time</div>
                      <div className="text-lg font-semibold">
                        {Math.floor(debt.monthsToPayoff / 12)}y {debt.monthsToPayoff % 12}m
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
                      <div className="text-sm text-red-700">
                        At minimum payments, you'll pay <strong>${debt.totalInterest.toLocaleString()}</strong> in interest
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Debt Visualization */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ChartPieIcon className="h-5 w-5 mr-2 text-indigo-600" />
                  Debt Breakdown
                </h3>
                <div className="space-y-3">
                  {debts.map((debt) => {
                    const percentage = ((debt.balance / totalDebt) * 100).toFixed(1)
                    return (
                      <div key={debt.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="text-sm">{getDebtTypeIcon(debt.type)}</div>
                          <div className="text-sm font-medium text-gray-700 truncate">
                            {debt.name}
                          </div>
                        </div>
                        <div className="text-sm font-semibold">{percentage}%</div>
                      </div>
                    )
                  })}
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
                <div className="text-3xl font-bold mb-1">2.8 years</div>
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
                    <div className="text-2xl font-bold text-blue-600">
                      ${activeSubscriptions.reduce((sum, sub) => sum + sub.amount, 0).toFixed(2)}
                    </div>
                    <div className="text-sm text-blue-800">Total Monthly</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">
                      ${niceToHaveTotal.toFixed(2)}
                    </div>
                    <div className="text-sm text-red-800">Nice to Have</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ${activeSubscriptions
                        .filter(sub => sub.category === 'need-to-have')
                        .reduce((sum, sub) => sum + sub.amount, 0).toFixed(2)}
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
                      {subscriptions
                        .filter(sub => sub.category === 'need-to-have')
                        .map((sub) => (
                          <div key={sub.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900">{sub.name}</div>
                              <div className="text-sm text-gray-600">${sub.amount}/month</div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              sub.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {sub.active ? 'Active' : 'Canceled'}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Nice to Have */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <XMarkIcon className="h-5 w-5 mr-2 text-red-600" />
                      Nice to Have
                    </h3>
                    <div className="space-y-3">
                      {subscriptions
                        .filter(sub => sub.category === 'nice-to-have')
                        .map((sub) => (
                          <div key={sub.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900">{sub.name}</div>
                              <div className="text-sm text-gray-600">${sub.amount}/month</div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                sub.active ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {sub.active ? 'Active' : 'Canceled'}
                              </div>
                              <button
                                onClick={() => toggleSubscription(sub.id)}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                  sub.active
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                              >
                                {sub.active ? 'Cancel' : 'Reactivate'}
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Savings Summary */}
                {niceToHaveTotal > 0 && (
                  <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-indigo-900 mb-2">💰 Potential Savings</h4>
                    <p className="text-indigo-700 mb-4">
                      By canceling "nice to have" subscriptions, you could free up{' '}
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Debt Payoff Strategies</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Debt Avalanche */}
                <div className="border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <ChartBarIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Debt Avalanche</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Pay minimums on all debts, then put extra money toward the highest interest rate debt first.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Interest Saved:</span>
                      <span className="font-semibold text-blue-600">$2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time to Debt Free:</span>
                      <span className="font-semibold text-blue-600">2.1 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Best For:</span>
                      <span className="font-semibold">Mathematically optimal</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Use This Strategy
                  </button>
                </div>

                {/* Debt Snowball */}
                <div className="border border-green-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <ChartPieIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Debt Snowball</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Pay minimums on all debts, then put extra money toward the smallest balance first.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Interest Saved:</span>
                      <span className="font-semibold text-green-600">$2,156</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time to Debt Free:</span>
                      <span className="font-semibold text-green-600">2.3 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Best For:</span>
                      <span className="font-semibold">Building momentum</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Use This Strategy
                  </button>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Extra Payment Calculator</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Extra Monthly Payment
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="200"
                    />
                  </div>
                  <div className="flex items-end">
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      Calculate Impact
                    </button>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Time Saved</div>
                    <div className="text-xl font-bold text-indigo-600">8 months</div>
                  </div>
                </div>
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
                      onChange={(e) => setNewDebt({ ...newDebt, type: e.target.value })}
                    >
                      <option value="credit-card">Credit Card</option>
                      <option value="student-loan">Student Loan</option>
                      <option value="auto-loan">Auto Loan</option>
                      <option value="mortgage">Mortgage</option>
                      <option value="personal-loan">Personal Loan</option>
                      <option value="other">Other</option>
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