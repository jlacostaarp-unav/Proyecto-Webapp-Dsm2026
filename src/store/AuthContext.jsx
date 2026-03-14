import React from "react"

const AuthContext = React.createContext({
    login: false,
    language: 'es-ES',
    idToken: ''
})

export default AuthContext
