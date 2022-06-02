import { firebaseAuth } from "../firebase"
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth"

interface IAuthContext {
  user: User | null
  resetPassword: (email: string) => void
  signUp: (email: string, pass: string) => void
  signIn: (email: string, pass: string, rmember?: boolean) => void
  signOut: () => void
  isReady: boolean
}

function buildContextValue(user?: User | null, isReady: boolean = false) {
  return {
    signOut: async () => firebaseAuth.signOut(),
    signUp: async (email: string, pass: string) =>
      createUserWithEmailAndPassword(firebaseAuth, email, pass),
    signIn: async (email: string, pass: string, remember = false) => {
      if (!remember)
        await setPersistence(firebaseAuth, browserSessionPersistence)

      return signInWithEmailAndPassword(firebaseAuth, email, pass)
    },
    resetPassword: async (email: string) =>
      sendPasswordResetEmail(firebaseAuth, email),
    user: user ?? null,
    isReady: isReady,
  }
}

const AuthContext = createContext<IAuthContext>(buildContextValue())

function useAuthContext() {
  return useContext(AuthContext)
}

function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user)
      setIsReady(true)
    })
  }, [])

  return (
    <AuthContext.Provider value={buildContextValue(user, isReady)}>
      {children}
    </AuthContext.Provider>
  )
}

export { useAuthContext, AuthProvider }
