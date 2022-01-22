import { initializeApp } from '@firebase/app'
import { GithubAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCTzsPMSgCQEFNKnfBHiBYXSLG5OsZcdKw',
	authDomain: 'devter-3cc55.firebaseapp.com',
	projectId: 'devter-3cc55',
	storageBucket: 'devter-3cc55.appspot.com',
	messagingSenderId: '696813078502',
	appId: '1:696813078502:web:5c31b809da6a2dc6b07827',
	measurementId: 'G-8XBRL2GC5W',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()

const mapUserFromFirebaseAuthToUser = user => {
	const { displayName, photoURL } = user

	return {
		username: displayName,
		avatar: photoURL,
	}
}

export const authStateChanged = onChange => {
	return auth.onAuthStateChanged(user => {
		const normalizedUser = mapUserFromFirebaseAuthToUser(user)
		onChange(normalizedUser)
	})
}

export const loginWithGitHub = () => {
	const githubProvider = new GithubAuthProvider()
	return signInWithPopup(auth, githubProvider)
}
