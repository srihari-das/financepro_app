'use client'

import { useState } from 'react'
import { 
  CurrencyDollarIcon,
  CalendarIcon,
  ChartBarIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function SavingsPlanner() {
  const [activeTab, setActiveTab] = useState('create')
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    priority: 'medium',
    category: 'general'
  })

  // Mock existing goals
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Emergency Fund',
      targetAmount: 15000,
      currentAmount: 7500,
      targetDate: '2025-12-31',
      priority: 'high',
      category: 'emergency',
      monthlyContribution: 500,
      progress: 50,
      onTrack: true
    },
    {
      id: 2,
      name: 'House Down Payment',
      targetAmount: 50000,
      currentAmount: 12000,
      targetDate: '2026-06-30',
      priority: 'high',
      category: 'home',
      monthlyContribution: 1200,
      progress: 24,
      onTrack: false
    },
    {
      id: 3,
      name: 'Vacation to Europe',
      targetAmount: 5000,
      currentAmount: 1200,
      targetDate: '2025-07-15',
      priority: 'low',
      category: 'travel',
      monthlyContribution: 400,
      progress: 24,
      onTrack: true
    }
  ])

  const calculateMonthlyNeeded = (target: number, current: number, targetDate: string) => {
    const remaining = target - current
    const today = new Date()
    const endDate = new Date(targetDate)
    const monthsRemaining = Math.max(1, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24 * 30)))
    return Math.ceil(remaining / monthsRemaining)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'emergency': return '🛡️'
      case 'home': return '🏠'
      case 'travel': return '✈️'
      case 'education': return '🎓'
      case 'investment': return '📈'
      default: return '🎯'
    }
  }

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault()
    const target = parseFloat(newGoal.targetAmount)
    const current = parseFloat(newGoal.currentAmount) || 0
    const monthlyNeeded = calculateMonthlyNeeded(target, current, newGoal.targetDate)
    
    const goal = {
      id: goals.length + 1,
      name: newGoal.name,
      targetAmount: target,
      currentAmount: current,
      targetDate: newGoal.targetDate,
      priority: newGoal.priority,
      category: newGoal.category,
      monthlyContribution: monthlyNeeded,
      progress: Math.round((current / target) * 100),
      onTrack: true
    }
    
    setGoals([...goals, goal])
    setNewGoal({
      name: '',
      targetAmount: '',
      currentAmount: '',
      targetDate: '',
      priority: 'medium',
      category: 'general'
    })
    setActiveTab('overview')
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
                    <div className="text-2xl font-bold text-gray-900">
                      ${goals.reduce((sum, goal) => sum + goal.targetAmount, 0).toLocaleString()}
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
                    <div className="text-2xl font-bold text-gray-900">
                      ${goals.reduce((sum, goal) => sum + goal.currentAmount, 0).toLocaleString()}
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
                    <div className="text-2xl font-bold text-gray-900">
                      ${goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Monthly Required</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Goals List */}
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{getCategoryIcon(goal.category)}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{goal.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                            {goal.priority.toUpperCase()} PRIORITY
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            goal.onTrack ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {goal.onTrack ? 'ON TRACK' : 'BEHIND'}
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
                      <div className="text-lg font-semibold">${goal.targetAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Current Amount</div>
                      <div className="text-lg font-semibold text-green-600">${goal.currentAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Target Date</div>
                      <div className="text-lg font-semibold">{new Date(goal.targetDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Monthly Needed</div>
                      <div className="text-lg font-semibold text-blue-600">${goal.monthlyContribution.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{goal.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          goal.onTrack ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
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
                <p className="text-gray-600">Define your goal and we'll create a personalized savings plan</p>
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
                      onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
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
                      <option value="emergency">Emergency Fund</option>
                      <option value="home">Home & Real Estate</option>
                      <option value="travel">Travel & Vacation</option>
                      <option value="education">Education</option>
                      <option value="investment">Investment</option>
                      <option value="general">General Savings</option>
                    </select>
                  </div>
                </div>

                {newGoal.targetAmount && newGoal.targetDate && (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-indigo-900 mb-2">Savings Projection</h4>
                    <div className="text-sm text-indigo-700">
                      To reach your goal of ${parseFloat(newGoal.targetAmount).toLocaleString()} by{' '}
                      {new Date(newGoal.targetDate).toLocaleDateString()}, you'll need to save approximately{' '}
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
                    Create Goal
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
                {goals.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-xl">{getCategoryIcon(goal.category)}</div>
                      <div>
                        <div className="font-medium text-gray-900">{goal.name}</div>
                        <div className="text-sm text-gray-600">{goal.progress}% complete</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        ${goal.currentAmount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        of ${goal.targetAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Commitment */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Commitment</h3>
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div key={goal.id} className="flex justify-between items-center">
                    <span className="text-gray-700">{goal.name}</span>
                    <span className="font-semibold">${goal.monthlyContribution.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between items-center font-semibold text-lg">
                  <span>Total Monthly</span>
                  <span className="text-indigo-600">
                    ${goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0).toLocaleString()}
                  </span>
                </div>
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
                  <div className="text-sm text-green-700">Great job! You're on pace to reach your vacation goal.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}