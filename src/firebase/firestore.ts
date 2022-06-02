import {
  collection,
  getDocs,
  query,
  setDoc,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore"
import { firebaseDb } from "."
import { IFavorites } from "../types/firestore"

export async function getFavoritesByUserUid(userId: string) {
  const favorites: IFavorites[] = []
  const q = query(
    collection(firebaseDb, "favorites"),
    where("user_id", "==", userId)
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => favorites.push(doc.data() as IFavorites))
  return favorites
}

export async function addFavoriteBook(uid: string, bookId: number) {
  const favorite: IFavorites = { user_id: uid, book_id: bookId }
  const document = doc(firebaseDb, "favorites", `${uid}-${bookId}`)
  return await setDoc(document, favorite)
}

export async function deleteFavoriteBook(userId: string, bookId: number) {
  return await deleteDoc(doc(firebaseDb, "favorites", `${userId}-${bookId}`))
}

export async function isFavorite(userId: string, bookId: number) {
  const q = query(
    collection(firebaseDb, "favorites"),
    where("user_id", "==", userId),
    where("book_id", "==", bookId)
  )
  const querySnapshot = await getDocs(q)
  return !querySnapshot.empty
}
