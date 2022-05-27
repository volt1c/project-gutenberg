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
}

function buildContextValue(user?: User | null) {
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
  }
}

const AuthContext = createContext<IAuthContext>(buildContextValue())

function useAuthContext() {
  return useContext(AuthContext)
}

function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>()

  useEffect(() => onAuthStateChanged(firebaseAuth, (user) => setUser(user)), [])

  return (
    <AuthContext.Provider value={buildContextValue(user)}>
      {children}
    </AuthContext.Provider>
  )
}

export { useAuthContext, AuthProvider }
