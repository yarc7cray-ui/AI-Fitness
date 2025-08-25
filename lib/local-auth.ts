export interface User {
  id: string
  name: string
  email: string
  onboardingCompleted: boolean
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

class LocalAuth {
  private readonly USER_KEY = 'fitness_app_user'
  private readonly DEMO_USERS_KEY = 'fitness_app_demo_users'
  private isInitialized = false

  constructor() {
    // Don't initialize during SSR
  }

  private ensureInitialized() {
    if (typeof window === 'undefined') return // SSR check
    if (this.isInitialized) return

    this.seedDemoUsers()
    this.isInitialized = true
  }

  private seedDemoUsers() {
    if (typeof window === 'undefined') return // SSR check

    const existingUsers = this.getAllUsers()
    if (existingUsers.length === 0) {
      const demoUsers = [
        {
          id: 'demo_1',
          name: 'Demo User',
          email: 'demo@fitness.ai',
          password: 'password123',
          onboardingCompleted: false,
          createdAt: new Date().toISOString()
        },
        {
          id: 'demo_2',
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          onboardingCompleted: true,
          createdAt: new Date().toISOString()
        }
      ]
      localStorage.setItem(this.DEMO_USERS_KEY, JSON.stringify(demoUsers))
    }
  }

  private getAllUsers() {
    if (typeof window === 'undefined') return []
    const users = localStorage.getItem(this.DEMO_USERS_KEY)
    return users ? JSON.parse(users) : []
  }

  private saveAllUsers(users: any[]) {
    localStorage.setItem(this.DEMO_USERS_KEY, JSON.stringify(users))
  }

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null
    this.ensureInitialized()
    const user = localStorage.getItem(this.USER_KEY)
    return user ? JSON.parse(user) : null
  }

  getAuthState(): AuthState {
    const user = this.getCurrentUser()
    return {
      user,
      isAuthenticated: !!user
    }
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    if (typeof window === 'undefined') return { success: false, error: 'Not available on server' }
    this.ensureInitialized()

    const users = this.getAllUsers()
    const user = users.find((u: any) => u.email === email && u.password === password)

    if (!user) {
      return { success: false, error: 'Invalid email or password' }
    }

    const authUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      onboardingCompleted: user.onboardingCompleted,
      createdAt: user.createdAt
    }

    localStorage.setItem(this.USER_KEY, JSON.stringify(authUser))
    return { success: true, user: authUser }
  }

  async signUp(email: string, password: string, name: string): Promise<{ success: boolean; user?: User; error?: string }> {
    if (typeof window === 'undefined') return { success: false, error: 'Not available on server' }
    this.ensureInitialized()

    const users = this.getAllUsers()
    const existingUser = users.find((u: any) => u.email === email)

    if (existingUser) {
      return { success: false, error: 'User already exists' }
    }

    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      password,
      onboardingCompleted: false,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    this.saveAllUsers(users)

    const authUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      onboardingCompleted: newUser.onboardingCompleted,
      createdAt: newUser.createdAt
    }

    localStorage.setItem(this.USER_KEY, JSON.stringify(authUser))
    return { success: true, user: authUser }
  }

  signOut(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.USER_KEY)
  }

  updateUserOnboarding(completed: boolean): void {
    if (typeof window === 'undefined') return
    this.ensureInitialized()

    const user = this.getCurrentUser()
    if (user) {
      user.onboardingCompleted = completed
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))

      // Also update in demo users
      const users = this.getAllUsers()
      const userIndex = users.findIndex((u: any) => u.id === user.id)
      if (userIndex !== -1) {
        users[userIndex].onboardingCompleted = completed
        this.saveAllUsers(users)
      }
    }
  }

  updateUser(updates: Partial<User>): void {
    if (typeof window === 'undefined') return
    this.ensureInitialized()

    const user = this.getCurrentUser()
    if (user) {
      const updatedUser = { ...user, ...updates }
      localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser))

      // Also update in demo users
      const users = this.getAllUsers()
      const userIndex = users.findIndex((u: any) => u.id === user.id)
      if (userIndex !== -1) {
        Object.assign(users[userIndex], updates)
        this.saveAllUsers(users)
      }
    }
  }
}

export const localAuth = new LocalAuth()
