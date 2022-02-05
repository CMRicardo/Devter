import { initializeApp } from "@firebase/app"
import {
  addDoc,
  query,
  collection,
  getDocs,
  getFirestore,
  orderBy,
} from "firebase/firestore"
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTzsPMSgCQEFNKnfBHiBYXSLG5OsZcdKw",
  appId: "1:696813078502:web:5c31b809da6a2dc6b07827",
  authDomain: "devter-3cc55.firebaseapp.com",
  measurementId: "G-8XBRL2GC5W",
  messagingSenderId: "696813078502",
  projectId: "devter-3cc55",
  storageBucket: "devter-3cc55.appspot.com",
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
const db = getFirestore()
const colRef = collection(db, "devits")
const q = query(colRef, orderBy("createdAt", "desc"))

const auth = getAuth()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, photoURL, uid } = user

  return {
    username: displayName,
    avatar: photoURL,
    id: uid,
  }
}

export const authStateChanged = (onChange) => {
  return auth.onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null

    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider()
  return signInWithPopup(auth, githubProvider)
}

export const addDevit = ({ avatar, content, img, userId, userName }) => {
  return addDoc(colRef, {
    avatar,
    content,
    createdAt: new Date(),
    img,
    likesCount: 0,
    sharesCount: 0,
    userId,
    userName,
  })
    .then(() => console.log("It worked!!!"))
    .catch(() => console.log("It didn't work"))
}

export const fetchLatestDevits = () => {
  return getDocs(q)
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data
        createdAt.toDate()

        return { ...data, id, createdAt: +createdAt.toDate() }
      })
    })
    .catch((err) => console.log(err.message))
}

export const uploadImage = (file) => {
  const storageRef = ref(storage, `/images/${file.name}`)
  const uploadTask = uploadBytesResumable(storageRef, file)
  return uploadTask
}
