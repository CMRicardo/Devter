import { initializeApp } from "@firebase/app"
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore"
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

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

initializeApp(firebaseConfig)
const db = getFirestore()
const colRef = collection(db, "devits")

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

export const addDevit = ({ avatar, content, userId, userName }) => {
  return addDoc(colRef, {
    avatar,
    content,
    userId,
    userName,
    createdAt: new Date(),
    likesCount: 0,
    sharesCount: 0,
  })
    .then(() => console.log("It worked!!!"))
    .catch(() => console.log("It didn't work"))
}

export const fetchLatestDevits = () => {
  return getDocs(colRef)
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data
        const date = new Date(createdAt.seconds * 1000)
        const normalizedCreatedAt = new Intl.DateTimeFormat("es-HN").format(
          date
        )

        return { ...data, id, createdAt: normalizedCreatedAt }
      })
    })
    .catch((err) => console.log(err.message))
}
