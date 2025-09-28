'use client'

import { useState } from 'react'
import { 
  UserIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  AcademicCapIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  TrophyIcon,
  PencilIcon
} from '@heroicons/react/24/outline'
import { useUserProfile, useFinancialSummary } from '@/hooks/useFinancialData'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  
  // Fetch real data from Supabase
  const { data: userProfile, loading: profileLoading, error: profileError } = useUserProfile()
  const { data: financialSummary, loading: summaryLoading, error: summaryError } = useFinancialSummary()
  
  // Loading state
  if (profileLoading || summaryLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your financial profile...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (profileError || summaryError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading profile data</p>
          <p className="text-gray-600">{profileError || summaryError}</p>
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

  // Calculate financial score based on actual data
  const calculateFinancialScore = () => {
    if (!financialSummary) return 50
    
    let score = 50 // Base score
    
    // Positive factors
    const totalBalance = financialSummary.accountDetails.checkingbalance + financialSummary.accountDetails.currentsavings
    if (totalBalance > 1000) score += 20
    if (totalBalance > 5000) score += 10
    if (financialSummary.totalMonthlyIncome > financialSummary.totalMonthlyExpenses) score += 15
    if (financialSummary.totalDebt < financialSummary.totalMonthlyIncome * 6) score += 10 // Good debt ratio
    if (financialSummary.savingsRate > 0.1) score += 5 // Saving at least 10%
    
    return Math.min(100, score)
  }
  
  const financialScore = calculateFinancialScore()
  const completionPercentage = userProfile ? 95 : 50 // High completion since we have user data

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
                  <h2 className="text-xl font-semibold text-gray-900">
                    {userProfile ? userProfile.email.split('@')[0] : 'Loading...'}
                  </h2>
                  <p className="text-gray-600">
                    {userProfile ? userProfile.email : 'Loading email...'}
                  </p>
                  <p className="text-sm text-gray-500">User ID: {userProfile?.userid}</p>
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
                {/* Account Information */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                    <BanknotesIcon className="h-5 w-5 mr-2 text-indigo-600" />
                    Account Summary
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Checking Balance</div>
                      <div className="text-gray-900">${financialSummary?.accountDetails.checkingbalance?.toLocaleString() || '0'}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Current Savings</div>
                      <div className="text-gray-900">${financialSummary?.accountDetails.currentsavings?.toLocaleString() || '0'}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Monthly Income</div>
                      <div className="text-gray-900">${financialSummary?.totalMonthlyIncome?.toLocaleString() || '0'}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Monthly Expenses</div>
                      <div className="text-gray-900">${financialSummary?.totalMonthlyExpenses?.toLocaleString() || '0'}</div>
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
                      <div className="text-gray-900">{financialSummary?.accountDetails.financialgoal || 'Not set'}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Time Horizon</div>
                      <div className="text-gray-900">{financialSummary?.accountDetails.timeline || 'Not set'}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Target Amount</div>
                      <div className="text-gray-900">${financialSummary?.accountDetails.goalamount?.toLocaleString() || '0'}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Current Savings</div>
                      <div className="text-gray-900">${financialSummary?.accountDetails.currentsavings?.toLocaleString() || '0'}</div>
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
                      <div className="text-sm font-medium text-gray-700">Employment Status</div>
                      <div className="text-gray-900">{financialSummary?.accountDetails.employmentstatus || 'Not specified'}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Annual Income</div>
                      <div className="text-gray-900">${financialSummary?.accountDetails.annualincome?.toLocaleString() || '0'}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Age</div>
                      <div className="text-gray-900">{financialSummary?.accountDetails.age || 'Not specified'}</div>
                    </div>
                  </div>
                </div>

                {/* Current Financial Status */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                    <BanknotesIcon className="h-5 w-5 mr-2 text-purple-600" />
                    Current Financial Status
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Total Debt</div>
                      <div className="text-gray-900">${financialSummary?.totalDebt?.toLocaleString() || '0'}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Net Worth</div>
                      <div className={`${financialSummary?.netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${financialSummary?.netWorth?.toLocaleString() || '0'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Priorities */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                    <AcademicCapIcon className="h-5 w-5 mr-2 text-orange-600" />
                    Financial Priorities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {financialSummary?.accountDetails.goaltags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                      >
                        {tag.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    )) || (
                      <span className="text-gray-500 italic">No financial priorities set</span>
                    )}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                    <ShieldCheckIcon className="h-5 w-5 mr-2 text-emerald-600" />
                    Personalized Recommendations
                  </h4>
                  <div className="space-y-3">
                    {financialSummary && (
                      <>
                        <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                          <div className="text-sm font-medium text-blue-800">Savings Goal Progress</div>
                          <div className="text-blue-700 text-sm">
                            You&apos;re working towards {financialSummary.accountDetails.financialgoal}.
                            With ${financialSummary.accountDetails.currentsavings.toLocaleString()} saved toward your ${financialSummary.accountDetails.goalamount.toLocaleString()} goal.
                          </div>
                        </div>
                        {financialSummary.totalDebt > 0 && (
                          <div className="border-l-4 border-green-500 bg-green-50 p-4">
                            <div className="text-sm font-medium text-green-800">Debt Management</div>
                            <div className="text-green-700 text-sm">
                              You have ${financialSummary.totalDebt.toLocaleString()} in debt. Consider using our Smart Debt Payoff tool to create a repayment strategy.
                            </div>
                          </div>
                        )}
                        {financialSummary.savingsRate < 0.1 && (
                          <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
                            <div className="text-sm font-medium text-yellow-800">Improve Savings Rate</div>
                            <div className="text-yellow-700 text-sm">
                              Your current savings rate is {(financialSummary.savingsRate * 100).toFixed(1)}%. Consider targeting 10-20% of income for better financial health.
                            </div>
                          </div>
                        )}
                        <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                          <div className="text-sm font-medium text-purple-800">Financial Education</div>
                          <div className="text-purple-700 text-sm">
                            Visit our Financial Literacy Hub to learn more about achieving your financial goals and building wealth.
                          </div>
                        </div>
                      </>
                    )}
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