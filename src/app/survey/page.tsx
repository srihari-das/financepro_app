'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'

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
    
    // Current Financial Status
    currentSavings: '',
    monthlyExpenses: '',
    existingDebts: '',
    
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
      title: 'Current Situation',
      description: 'Help us understand your finances'
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

  const handleSubmit = () => {
    // TODO: Save survey data and redirect to profile or dashboard
    console.log('Survey completed:', formData)
    // Redirect to profile page to show results
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your age range?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['18-25', '26-35', '36-45', '46-55', '56-65', '65+'].map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => handleInputChange('age', range)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      formData.age === range
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
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
                Annual Income Range
              </label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  'Less than $25,000',
                  '$25,000 - $50,000',
                  '$50,000 - $75,000',
                  '$75,000 - $100,000',
                  '$100,000 - $150,000',
                  'More than $150,000'
                ].map((income) => (
                  <button
                    key={income}
                    type="button"
                    onClick={() => handleInputChange('annualIncome', income)}
                    className={`p-3 rounded-lg border text-left font-medium transition-colors ${
                      formData.annualIncome === income
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {income}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your primary financial goal?
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
                What's your time horizon for this goal?
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
                Current savings amount
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Less than $1,000',
                  '$1,000 - $5,000',
                  '$5,000 - $10,000',
                  '$10,000 - $25,000',
                  '$25,000 - $50,000',
                  'More than $50,000'
                ].map((savings) => (
                  <button
                    key={savings}
                    type="button"
                    onClick={() => handleInputChange('currentSavings', savings)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      formData.currentSavings === savings
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {savings}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly expenses
              </label>
              <input
                type="text"
                placeholder="e.g., $3,000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.monthlyExpenses}
                onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you have existing debts?
              </label>
              <div className="space-y-2">
                {[
                  'No debt',
                  'Credit card debt',
                  'Student loans',
                  'Car loan',
                  'Mortgage',
                  'Multiple types of debt'
                ].map((debt) => (
                  <button
                    key={debt}
                    type="button"
                    onClick={() => handleInputChange('existingDebts', debt)}
                    className={`w-full p-3 rounded-lg border text-left font-medium transition-colors ${
                      formData.existingDebts === debt
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {debt}
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

      case 4:
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