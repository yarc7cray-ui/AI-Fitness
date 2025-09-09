'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { localAuth, User, AuthState } from '@/lib/local-auth'

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; user?: User; error?: string }>
  signOut: () => void
  updateUserOnboarding: (completed: boolean) => void
  updateUser: (updates: Partial<User>) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function LocalAuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({ user: null, isAuthenticated: false })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize auth state from localStorage
    const state = localAuth.getAuthState()
    setAuthState(state)
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    const result = await localAuth.signIn(email, password)
    if (result.success && result.user) {
      setAuthState({ user: result.user, isAuthenticated: true })
    }
    return result
  }

  const signUp = async (email: string, password: string, name: string) => {
    const result = await localAuth.signUp(email, password, name)
    if (result.success && result.user) {
      setAuthState({ user: result.user, isAuthenticated: true })
    }
    return result
  }

  const signOut = () => {
    localAuth.signOut()
    setAuthState({ user: null, isAuthenticated: false })
  }

  const updateUserOnboarding = (completed: boolean) => {
    localAuth.updateUserOnboarding(completed)
    const updatedState = localAuth.getAuthState()
    setAuthState(updatedState)
  }

  const updateUser = (updates: Partial<User>) => {
    localAuth.updateUser(updates)
    const updatedState = localAuth.getAuthState()
    setAuthState(updatedState)
  }

  const value: AuthContextType = {
    ...authState,
    signIn,
    signUp,
    signOut,
    updateUserOnboarding,
    updateUser,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a LocalAuthProvider')
  }
  return context
}
