'use client'

import { useState } from 'react'
import { 
  UserIcon, 
  CogIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  AcademicCapIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  TrophyIcon,
  PencilIcon
} from '@heroicons/react/24/outline'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  
  // Mock user data - in real app this would come from survey results
  const [userData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    joinDate: 'March 2024',
    profileImage: null,
    
    // Survey Results
    age: '26-35',
    employmentStatus: 'Full-time employed',
    annualIncome: '$50,000 - $75,000',
    primaryGoal: 'Build an emergency fund',
    timeHorizon: '1-3 years',
    goalAmount: '$15,000',
    currentSavings: '$5,000 - $10,000',
    monthlyExpenses: '$3,200',
    existingDebts: 'Credit card debt',
    riskTolerance: 'Conservative - Small risk is okay for slightly better returns',
    investmentExperience: 'Some experience with savings accounts',
    budgetingExperience: 'Have a basic budget that I mostly follow',
    financialPriorities: ['Saving money', 'Paying off debt', 'Financial education']
  })

  const financialScore = 75 // Mock score based on survey
  const completionPercentage = 85 // Profile completion

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    return 'Needs Improvement'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your account and view your financial assessment</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 rounded-full p-3">
                  <UserIcon className="h-12 w-12 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
                  <p className="text-gray-600">{userData.email}</p>
                  <p className="text-sm text-gray-500">Member since {userData.joinDate}</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                  <span className="text-sm font-medium text-indigo-600">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Financial Score */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(financialScore)}`}>
                  <TrophyIcon className="h-4 w-4 mr-1" />
                  {getScoreLabel(financialScore)}
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-gray-900">{financialScore}/100</div>
                  <div className="text-sm text-gray-600">Financial Wellness Score</div>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  Based on your survey responses and financial goals
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Survey Results */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Financial Assessment Results</h3>
                <p className="text-gray-600">Based on your survey responses</p>
              </div>

              <div className="p-6 space-y-8">
                {/* Personal Information */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                    <UserIcon className="h-5 w-5 mr-2 text-indigo-600" />
                    Personal Information
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Age Range</div>
                      <div className="text-gray-900">{userData.age}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Employment</div>
                      <div className="text-gray-900">{userData.employmentStatus}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Annual Income</div>
                      <div className="text-gray-900">{userData.annualIncome}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Monthly Expenses</div>
                      <div className="text-gray-900">{userData.monthlyExpenses}</div>
                    </div>
                  </div>
                </div>

                {/* Financial Goals */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                    <CurrencyDollarIcon className="h-5 w-5 mr-2 text-green-600" />
                    Financial Goals
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Primary Goal</div>
                      <div className="text-gray-900">{userData.primaryGoal}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Time Horizon</div>
                      <div className="text-gray-900">{userData.timeHorizon}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Target Amount</div>
                      <div className="text-gray-900">{userData.goalAmount}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Current Savings</div>
                      <div className="text-gray-900">{userData.currentSavings}</div>
                    </div>
                  </div>
                </div>

                {/* Risk & Experience */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                    <ChartBarIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Risk Profile & Experience
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Risk Tolerance</div>
                      <div className="text-gray-900">{userData.riskTolerance}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Investment Experience</div>
                      <div className="text-gray-900">{userData.investmentExperience}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Budgeting Experience</div>
                      <div className="text-gray-900">{userData.budgetingExperience}</div>
                    </div>
                  </div>
                </div>

                {/* Current Financial Status */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                    <BanknotesIcon className="h-5 w-5 mr-2 text-purple-600" />
                    Current Financial Status
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-700">Existing Debts</div>
                    <div className="text-gray-900">{userData.existingDebts}</div>
                  </div>
                </div>

                {/* Financial Priorities */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                    <AcademicCapIcon className="h-5 w-5 mr-2 text-orange-600" />
                    Financial Priorities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {userData.financialPriorities.map((priority, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                      >
                        {priority}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                    <ShieldCheckIcon className="h-5 w-5 mr-2 text-emerald-600" />
                    Personalized Recommendations
                  </h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                      <div className="text-sm font-medium text-blue-800">Emergency Fund Focus</div>
                      <div className="text-blue-700 text-sm">Based on your goal to build an emergency fund, we recommend saving $500-1000 monthly to reach your $15,000 target within your 1-3 year timeline.</div>
                    </div>
                    <div className="border-l-4 border-green-500 bg-green-50 p-4">
                      <div className="text-sm font-medium text-green-800">Debt Management</div>
                      <div className="text-green-700 text-sm">Consider using our Smart Debt Payoff tool to create a strategy for your credit card debt while building your emergency fund.</div>
                    </div>
                    <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                      <div className="text-sm font-medium text-purple-800">Financial Education</div>
                      <div className="text-purple-700 text-sm">Visit our Financial Literacy Hub to learn more about conservative investment options that align with your risk tolerance.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Update Survey Responses
                  </button>
                  <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                    Download Financial Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}