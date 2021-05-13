import React, { useEffect, useReducer } from 'react'
import Cookies from 'js-cookie'

const axios = require('axios')

const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const REGISTER_REQUEST = 'REGISTER_REQUEST'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAIL = 'REGISTER_FAIL'
const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const CHECK_AUTH_SUCCESS = 'CHECK_AUTH_SUCCESS'
const CHECK_AUTH_FAIL = 'CHECK_AUTH_FAIL'

const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { isLoading: true }
    case REGISTER_SUCCESS:
      return { isLoading: false, user: action.payload, authenticated: true }
    case REGISTER_FAIL:
      return { isLoading: false, error: action.payload }
    case LOGIN_REQUEST:
      return { isLoading: true }
    case LOGIN_SUCCESS:
      return { isLoading: false, user: action.payload, authenticated: true }
    case LOGIN_FAIL:
      return { isLoading: false, error: action.payload }
    case LOGOUT_REQUEST:
      return { isLoading: true }
    case LOGOUT_SUCCESS:
      return { isLoading: false, user: undefined }
    case CHECK_AUTH_SUCCESS:
      return { isLoading: false, authenticated: true, user: action.payload }
    case CHECK_AUTH_FAIL:
      return { isLoading: false, authenticated: false, user: undefined }
    default:
      return state
  }
}

const initialState = {
  isLoading: true,
  user: undefined,
  error: '',
  authenticated: false,
  token: '',
}

const AuthContext = React.createContext({
  updateUser: () => {},
  logout: async () => {},
  signUp: async (name, email, password) => {},
  logIn: async (email, password) => {},
})

export const AuthProvider = ({ children }) => {
  const [authContext, dispatch] = useReducer(authReducer, initialState)
  useEffect(() => {
    updateUser()
  }, [])

  const updateUser = () => {
    let user = Cookies.getJSON('userInfo')
    if (user !== undefined) {
      axios
        .get('http://localhost:3010/users/verifyLogin', {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        })
        .then(({ data }) => {
          if (data.isAuth) dispatch({ type: CHECK_AUTH_SUCCESS, payload: user })
          else dispatch({ type: CHECK_AUTH_FAIL })
        })
    } else dispatch({ type: CHECK_AUTH_FAIL })
  }

  const logIn = async (username, password) => {
    dispatch({ type: LOGIN_REQUEST, payload: { username, password } })
    try {
      const { data } = await axios.post('http://localhost:3010/users/signIn', {
        email: username,
        password,
      })
      Cookies.set('userInfo', JSON.stringify(data), { expires: 7 })
      dispatch({ type: LOGIN_SUCCESS, payload: data })
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.error })
      throw err.response.data.error
    } finally {
      console.log(authContext)
    }
  }

  const logout = async () => {
    dispatch({ type: LOGOUT_REQUEST })
    try {
      Cookies.remove('userInfo')
      dispatch({ type: LOGOUT_SUCCESS })
    } catch (err) {
      console.error(err.response.data.error)
      throw err.response.data.error
    }
  }

  const signUp = async (name, email, password) => {
    dispatch({ type: REGISTER_REQUEST, payload: { name, email, password } })
    try {
      const { data } = await axios.post('http://localhost:3010/users/', {
        email,
        password,
        name,
      })
      Cookies.set('userInfo', JSON.stringify(data))
      dispatch({ type: REGISTER_SUCCESS, payload: data })
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.error })
      throw err.response.data.error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        authContext,
        logout,
        signUp,
        logIn,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)
