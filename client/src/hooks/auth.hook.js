import { useState, useCallback, useEffect } from 'react'


const storageName = 'authData'


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(null)

    const login = useCallback((jwtToken, userData) => {
        setToken(jwtToken)
        setUserData(userData)
        localStorage.setItem(storageName, JSON.stringify({ token: jwtToken, userData }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserData(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userData)
        }
    }, [login])

    console.log('userData', userData)

    return { login, logout, token, userData }
}