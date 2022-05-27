import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import { firebaseAuth } from "../firebase"
import firebase from "firebase/compat/app"

interface IAuthContext {
  user: firebase.User | null
  resetPassword: (email: string) => void
  signUp: (email: string, pass: string) => void
  signIn: (email: string, pass: string, rmember?: boolean) => void
  signOut: () => void
}

function buildContextValue(user?: firebase.User | null) {
  return {
    signOut: async () => firebaseAuth.signOut(),
    signUp: async (email: string, pass: string) =>
      firebaseAuth.createUserWithEmailAndPassword(email, pass),
    signIn: async (email: string, pass: string, remember = false) =>
      firebaseAuth.signInWithEmailAndPassword(email, pass),
    resetPassword: async (email: string) =>
      firebaseAuth.sendPasswordResetEmail(email),
    user: user ?? null,
  }
}

const AuthContext = createContext<IAuthContext>(buildContextValue())

function useAuthContext() {
  return useContext(AuthContext)
}

function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<firebase.User | null>()

  useEffect(() => firebaseAuth.onAuthStateChanged((user) => setUser(user)), [])

  return (
    <AuthContext.Provider value={buildContextValue(user)}>
      {children}
    </AuthContext.Provider>
  )
}

export { useAuthContext, AuthProvider }
