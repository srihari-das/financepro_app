import { useState, useEffect } from 'react'
import financialDataService from '@/services/financial-data'
import {
  Users,
  UserFinancialSummary,
  DebtSummary,
  SubscriptionSummary,
  SavingsGoalSummary
} from '@/types/database'

// Hook for financial summary data
export const useFinancialSummary = () => {
  const [data, setData] = useState<UserFinancialSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const summary = await financialDataService.getFinancialSummary()
        setData(summary)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch financial data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error, refetch: () => window.location.reload() }
}

// Hook for debt information
export const useDebtInfo = () => {
  const [data, setData] = useState<DebtSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const debtInfo = await financialDataService.getDebtSummary()
        setData(debtInfo)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch debt data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

// Hook for savings goals
export const useSavingsGoals = () => {
  const [data, setData] = useState<SavingsGoalSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const goals = await financialDataService.getSavingsGoals()
        setData(goals)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch savings goals')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

// Hook for user profile
export const useUserProfile = () => {
  const [data, setData] = useState<Users | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const profile = await financialDataService.getUserProfile()
        setData(profile)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user profile')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

// Hook for subscription summary
export const useSubscriptionSummary = () => {
  const [data, setData] = useState<SubscriptionSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const subscriptions = await financialDataService.getSubscriptionSummary()
        setData(subscriptions)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch subscription data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
