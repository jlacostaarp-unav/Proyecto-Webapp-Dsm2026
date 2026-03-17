import React from "react"

const AuthContext = React.createContext({
    login: false,
    username: '',
    language: 'es-ES',
    idToken: '',
    userId: ''
})

export default AuthContext
