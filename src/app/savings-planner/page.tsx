'use client'

import { useState } from 'react'
import { 
  CurrencyDollarIcon,
  ChartBarIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useSavingsGoals } from '@/hooks/useFinancialData'
import financialDataService from '@/services/financial-data'
import { GoalCategory } from '@/types/database'

export default function SavingsPlanner() {
  const [activeTab, setActiveTab] = useState('overview')
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    priority: 'Med' as 'High' | 'Med' | 'Low',
    category: 'Other' as GoalCategory
  })

  // Fetch savings goals from database
  const { data: savingsData, loading, error } = useSavingsGoals()
  
  // Add state for refresh
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState('')

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your savings goals...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading savings data</p>
          <p className="text-gray-600">{error}</p>
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

  const goals = savingsData?.goals || []

  const calculateMonthlyNeeded = (target: number, current: number, targetDate: string) => {
    const remaining = target - current
    const today = new Date()
    const endDate = new Date(targetDate)
    const monthsRemaining = Math.max(1, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24 * 30)))
    return Math.ceil(remaining / monthsRemaining)
  }

  const calculateProgress = (current: number, target: number) => {
    if (target === 0) return 0
    return Math.round((current / target) * 100)
  }

  const isOnTrack = (current: number, target: number, targetDate: string) => {
    const progress = calculateProgress(current, target)
    const today = new Date()
    const endDate = new Date(targetDate)
    const totalDays = Math.max(1, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24)))
    const expectedProgress = Math.max(0, 100 - (totalDays / 365) * 100) // Rough calculation
    return progress >= expectedProgress
  }

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'med': 
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'emergencyfund': return '🛡️'
      case 'vacation': return '✈️'
      case 'education': return '🎓'
      case 'retirement': return '🏦'
      case 'largepurchase': return '🛒'
      case 'other': 
      default: return '🎯'
    }
  }

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    setCreateError('')
    
    try {
      const goalData = {
        name: newGoal.name,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: parseFloat(newGoal.currentAmount) || 0,
        targetDate: newGoal.targetDate,
        priority: newGoal.priority,
        category: newGoal.category
      }
      
      const success = await financialDataService.createSavingsGoal(goalData)
      
      if (success) {
        // Reset form and switch to overview
        setNewGoal({
          name: '',
          targetAmount: '',
          currentAmount: '',
          targetDate: '',
          priority: 'Med' as 'High' | 'Med' | 'Low',
          category: 'Other' as GoalCategory
        })
        setActiveTab('overview')
        // Refresh the page to show new goal
        window.location.reload()
      } else {
        setCreateError('Failed to create savings goal. Please try again.')
      }
    } catch (error) {
      setCreateError('An error occurred while creating the goal.')
      console.error('Error creating goal:', error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Goal-Based Savings Planner
          </h1>
          <p className="text-gray-600">
            Create and track your financial goals with personalized savings strategies
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 justify-center">
            {[
              { id: 'overview', label: 'Goals Overview' },
              { id: 'create', label: 'Create New Goal' },
              { id: 'analytics', label: 'Analytics' }
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
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <CurrencyDollarIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900 font-numeric">
                      ${savingsData?.totalGoalAmount?.toLocaleString() || '0'}
                    </div>
                    <div className="text-sm text-gray-600">Total Goal Amount</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900 font-numeric">
                      ${savingsData?.totalSavedAmount?.toLocaleString() || '0'}
                    </div>
                    <div className="text-sm text-gray-600">Current Savings</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <ChartBarIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900 font-numeric">
                      ${goals.reduce((sum, goal) => sum + calculateMonthlyNeeded(goal.goalamount, goal.checkingbalance, goal.deadlinetogoal), 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Monthly Required</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Goals List */}
            <div className="space-y-4">
              {goals.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <CurrencyDollarIcon className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No savings goals yet</h3>
                  <p className="text-gray-600 mb-6">Create your first savings goal to start planning your financial future.</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                  >
                    Create Your First Goal
                  </button>
                </div>
              ) : (
                goals.map((goal) => {
                  const progress = calculateProgress(goal.checkingbalance || 0, goal.goalamount || 0)
                  const onTrack = isOnTrack(goal.checkingbalance || 0, goal.goalamount || 0, goal.deadlinetogoal)
                  const monthlyNeeded = calculateMonthlyNeeded(goal.goalamount || 0, goal.checkingbalance || 0, goal.deadlinetogoal)
                  
                  return (
                    <div key={goal.userid} className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{getCategoryIcon(goal.goalcategory)}</div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{goal.goalcategory}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.prioritylevel)}`}>
                                {goal.prioritylevel?.toUpperCase()} PRIORITY
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                onTrack ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {onTrack ? 'ON TRACK' : 'BEHIND'}
                              </span>
                            </div>
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
                          <div className="text-sm text-gray-600">Target Amount</div>
                          <div className="text-lg font-semibold font-numeric">${goal.goalamount.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Current Amount</div>
                          <div className="text-lg font-semibold text-green-600 font-numeric">${(goal.checkingbalance || 0).toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Target Date</div>
                          <div className="text-lg font-semibold">{new Date(goal.deadlinetogoal).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Monthly Needed</div>
                          <div className="text-lg font-semibold text-blue-600 font-numeric">${monthlyNeeded.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{progress}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              onTrack ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <button
              onClick={() => setActiveTab('create')}
              className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
            >
              <PlusIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <div className="text-gray-600 font-medium">Create New Savings Goal</div>
            </button>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Savings Goal</h2>
                <p className="text-gray-600">Define your goal and we&apos;ll create a personalized savings plan</p>
              </div>

              <form onSubmit={handleCreateGoal} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., Emergency Fund, Vacation, New Car"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Amount
                    </label>
                    <input
                      type="number"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="15000"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Amount (Optional)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="5000"
                      value={newGoal.currentAmount}
                      onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority Level
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      value={newGoal.priority}
                      onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as 'High' | 'Med' | 'Low' })}
                    >
                      <option value="High">High Priority</option>
                      <option value="Med">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                    >
                      <option value="EmergencyFund">Emergency Fund</option>
                      <option value="Vacation">Vacation</option>
                      <option value="Education">Education</option>
                      <option value="Retirement">Retirement</option>
                      <option value="LargePurchase">Large Purchase</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {newGoal.targetAmount && newGoal.targetDate && (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-indigo-900 mb-2">Savings Projection</h4>
                    <div className="text-sm text-indigo-700">
                      To reach your goal of ${parseFloat(newGoal.targetAmount).toLocaleString()} by{' '}
                      {new Date(newGoal.targetDate).toLocaleDateString()}, you&apos;ll need to save approximately{' '}
                      <span className="font-semibold">
                        ${calculateMonthlyNeeded(
                          parseFloat(newGoal.targetAmount),
                          parseFloat(newGoal.currentAmount) || 0,
                          newGoal.targetDate
                        ).toLocaleString()}{' '}
                        per month
                      </span>.
                    </div>
                  </div>
                )}

                {createError && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {createError}
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    disabled={isCreating}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors disabled:opacity-50"
                  >
                    {isCreating ? 'Creating...' : 'Create Goal'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Savings Progress Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Progress</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center text-gray-500">
                  <ChartBarIcon className="h-12 w-12 mx-auto mb-2" />
                  <p>Interactive chart would be displayed here</p>
                  <p className="text-sm">Showing progress over time for all goals</p>
                </div>
              </div>
            </div>

            {/* Goal Breakdown */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Breakdown</h3>
              <div className="space-y-4">
                {goals.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <p>No savings goals to display</p>
                  </div>
                ) : (
                  goals.map((goal) => {
                    const progress = calculateProgress(goal.checkingbalance || 0, goal.goalamount || 0)
                    return (
                      <div key={goal.userid} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-xl">{getCategoryIcon(goal.goalcategory)}</div>
                          <div>
                            <div className="font-medium text-gray-900">{goal.goalcategory}</div>
                            <div className="text-sm text-gray-600">{progress}% complete</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            ${(goal.checkingbalance || 0).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            of ${(goal.goalamount || 0).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Monthly Commitment */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Commitment</h3>
              <div className="space-y-3">
                {goals.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <p>No savings goals to display</p>
                  </div>
                ) : (
                  <>
                    {goals.map((goal) => {
                      const monthlyNeeded = calculateMonthlyNeeded(goal.goalamount || 0, goal.checkingbalance || 0, goal.deadlinetogoal)
                      return (
                        <div key={goal.userid} className="flex justify-between items-center">
                          <span className="text-gray-700">{goal.goalcategory}</span>
                          <span className="font-semibold">${monthlyNeeded.toLocaleString()}</span>
                        </div>
                      )
                    })}
                    <div className="border-t pt-3 flex justify-between items-center font-semibold text-lg">
                      <span>Total Monthly</span>
                      <span className="text-indigo-600">
                        ${goals.reduce((sum, goal) => sum + calculateMonthlyNeeded(goal.goalamount || 0, goal.checkingbalance || 0, goal.deadlinetogoal), 0).toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm font-medium text-blue-900">Prioritize Emergency Fund</div>
                  <div className="text-sm text-blue-700">Focus on completing your emergency fund before other goals.</div>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-sm font-medium text-yellow-900">Adjust House Down Payment Timeline</div>
                  <div className="text-sm text-yellow-700">Consider extending the timeline to reduce monthly pressure.</div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm font-medium text-green-900">Vacation Goal on Track</div>
                  <div className="text-sm text-green-700">Great job! You&apos;re on pace to reach your vacation goal.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}