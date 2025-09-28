'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import { supabase, getCurrentUserId } from '@/lib/supabase'
import { GoalTag, EmploymentStatus } from '@/types/database'

export default function Survey() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Demographics
    age: '',
    employmentStatus: '',
    annualIncome: '',
    
    // Financial Goals
    primaryGoal: '',
    timeHorizon: '',
    goalAmount: '',
    
    // Risk Assessment
    riskTolerance: '',
    investmentExperience: '',
    
    // Preferences
    budgetingExperience: '',
    financialPriorities: []
  })

  const steps = [
    {
      title: 'Personal Information',
      description: 'Tell us a bit about yourself'
    },
    {
      title: 'Financial Goals',
      description: 'What are you working towards?'
    },
    {
      title: 'Risk & Experience',
      description: 'Your investment comfort level'
    },
    {
      title: 'Preferences',
      description: 'Customize your experience'
    }
  ]

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const userId = await getCurrentUserId()
      if (!userId) {
        alert('Please sign in to save your survey data')
        return
      }

      // Map survey data to database fields
      const accountData = {
        userid: userId,
        financialgoal: formData.primaryGoal,
        timeline: formData.timeHorizon,
        goalamount: parseFloat(formData.goalAmount.replace(/[$,]/g, '')) || 0,
        goaltags: mapFinancialPriorities(formData.financialPriorities),
        age: parseInt(formData.age) || 0,
        employmentstatus: mapEmploymentStatus(formData.employmentStatus),
        annualincome: parseFloat(formData.annualIncome.replace(/[$,]/g, '')) || 0,
        checkingbalance: 0, // Default value, user can update later
        currentsavings: 0, // Default value, user can update later
        monthlyexpenses: 0 // Default value, user can update later
      }

      const { error } = await supabase
        .from('accountdetails')
        .upsert(accountData, { onConflict: 'userid' })

      if (error) {
        console.error('Error saving survey data:', error)
        alert('Failed to save survey data. Please try again.')
      }
    } catch (error) {
      console.error('Survey submission error:', error)
      alert('An error occurred. Please try again.')
    }
  }

  // Helper functions to parse survey data

  const mapEmploymentStatus = (status: string): EmploymentStatus => {
    if (status.includes('Full-time')) return 'Employed'
    if (status.includes('Part-time')) return 'Employed'
    if (status.includes('Self-employed')) return 'SelfEmployed'
    if (status.includes('Student')) return 'Student'
    if (status.includes('Retired')) return 'Retired'
    if (status.includes('Unemployed')) return 'Unemployed'
    return 'Other'
  }

  const mapFinancialPriorities = (priorities: string[]): GoalTag[] => {
    const mapping: { [key: string]: GoalTag } = {
      'Saving money': 'saving money',
      'Paying off debt': 'paying off debt',
      'Learning about investing': 'learning about investing',
      'Building credit': 'building credit',
      'Financial education': 'financial education',
      'Retirement planning': 'retirement planning',
      'Tax optimization': 'tax optimization',
      'Insurance planning': 'insurance planning'
    }
    
    return priorities.map(p => mapping[p] || 'financial education' as GoalTag)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What&apos;s your age?
              </label>
              <input
                type="number"
                placeholder="Enter your age"
                min="18"
                max="100"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employment Status
              </label>
              <div className="space-y-2">
                {[
                  'Full-time employed',
                  'Part-time employed',
                  'Self-employed',
                  'Student',
                  'Retired',
                  'Unemployed'
                ].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleInputChange('employmentStatus', status)}
                    className={`w-full p-3 rounded-lg border text-left font-medium transition-colors ${
                      formData.employmentStatus === status
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Income
              </label>
              <input
                type="text"
                placeholder="e.g., $75,000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.annualIncome}
                onChange={(e) => handleInputChange('annualIncome', e.target.value)}
              />
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What&apos;s your primary financial goal?
              </label>
              <div className="space-y-2">
                {[
                  'Build an emergency fund',
                  'Save for a house down payment',
                  'Pay off debt',
                  'Retirement planning',
                  'Save for vacation',
                  'Investment growth',
                  'Education expenses',
                  'Start a business'
                ].map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => handleInputChange('primaryGoal', goal)}
                    className={`w-full p-3 rounded-lg border text-left font-medium transition-colors ${
                      formData.primaryGoal === goal
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What&apos;s your time horizon for this goal?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Less than 1 year',
                  '1-3 years',
                  '3-5 years',
                  '5-10 years',
                  '10+ years',
                  'No specific timeline'
                ].map((timeframe) => (
                  <button
                    key={timeframe}
                    type="button"
                    onClick={() => handleInputChange('timeHorizon', timeframe)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      formData.timeHorizon === timeframe
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target amount for your goal?
              </label>
              <input
                type="text"
                placeholder="e.g., $10,000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.goalAmount}
                onChange={(e) => handleInputChange('goalAmount', e.target.value)}
              />
            </div>
          </div>
        )


      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How comfortable are you with investment risk?
              </label>
              <div className="space-y-2">
                {[
                  'Very conservative - I prefer guaranteed returns',
                  'Conservative - Small risk is okay for slightly better returns',
                  'Moderate - I can handle some ups and downs',
                  'Aggressive - I want high growth potential',
                  'Very aggressive - I can handle significant volatility'
                ].map((risk) => (
                  <button
                    key={risk}
                    type="button"
                    onClick={() => handleInputChange('riskTolerance', risk)}
                    className={`w-full p-3 rounded-lg border text-left font-medium transition-colors ${
                      formData.riskTolerance === risk
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {risk}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment experience level
              </label>
              <div className="space-y-2">
                {[
                  'Complete beginner',
                  'Some experience with savings accounts',
                  'Some experience with basic investments',
                  'Experienced with various investment types',
                  'Advanced investor'
                ].map((experience) => (
                  <button
                    key={experience}
                    type="button"
                    onClick={() => handleInputChange('investmentExperience', experience)}
                    className={`w-full p-3 rounded-lg border text-left font-medium transition-colors ${
                      formData.investmentExperience === experience
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {experience}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How experienced are you with budgeting?
              </label>
              <div className="space-y-2">
                {[
                  'Never created a budget',
                  'Tried budgeting but struggled to stick to it',
                  'Have a basic budget that I mostly follow',
                  'Very disciplined with detailed budgeting',
                  'Expert budgeter with advanced strategies'
                ].map((experience) => (
                  <button
                    key={experience}
                    type="button"
                    onClick={() => handleInputChange('budgetingExperience', experience)}
                    className={`w-full p-3 rounded-lg border text-left font-medium transition-colors ${
                      formData.budgetingExperience === experience
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {experience}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Which areas are most important to you? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Saving money',
                  'Paying off debt',
                  'Learning about investing',
                  'Building credit',
                  'Financial education',
                  'Retirement planning',
                  'Tax optimization',
                  'Insurance planning'
                ].map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => {
                      const current = formData.financialPriorities || []
                      const updated = current.includes(priority)
                        ? current.filter(p => p !== priority)
                        : [...current, priority]
                      handleInputChange('financialPriorities', updated)
                    }}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      (formData.financialPriorities || []).includes(priority)
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 text-center ${
                index <= currentStep ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <div className="hidden sm:block mt-2 text-xs font-medium">
                {step.title}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep].description}
            </p>
          </div>

          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <ChevronLeftIcon className="h-5 w-5 mr-1" />
              Previous
            </button>

            {currentStep === steps.length - 1 ? (
              <Link
                href="/profile"
                onClick={handleSubmit}
                className="flex items-center px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                Complete Survey
                <ChevronRightIcon className="h-5 w-5 ml-1" />
              </Link>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                Next
                <ChevronRightIcon className="h-5 w-5 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}