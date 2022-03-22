import { createContext, useState, useContext } from 'react'
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { transactionsAPI } from '../../services';

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

  const userToken = localStorage.getItem('token')
  const userInfoData = JSON.parse(localStorage.getItem('userInfo'))
  let userData = null
  if (userToken) {
    userData = jwt(userToken)
  }
  const [auth, setAuth] = useState(userData)
  const [authToken, setAuthToken] = useState(userToken)
  const [userInfo, setUserInfo] = useState(userInfoData)
  const navigate = useNavigate()

  const saveUserInfo = async(id) => {
    const response = await transactionsAPI.oneUser(id);
    console.log('userdata with balance from authContext saveUser: ', response)
    if (response.status === 200) {
      setUserInfo(response.data)
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    } else {
      throw new Error(`Couldn't get userinfo: ${response}`);
    }
  }

  const login = async (email, password) => {
    console.log('login', email, password)
    try {
      const userCredential = await transactionsAPI.login({email: email, password: password})
      if (userCredential.status !== 200) {
        return false
      }
      console.log('Res as token from LOGIN request', userCredential)
      const user = jwt(userCredential.data);
      localStorage.setItem('token', userCredential.data);
      console.log('user login from authcontext: ', auth)
      transactionsAPI.updateServiceAuth();
      console.log('user._id', user.id)
      await saveUserInfo(user.id);
      setAuth(user)
      setAuthToken(userCredential.data)
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  const signup = async (name, email, password) => {
    console.log('From authContext file', email, password)
    try {
     // const userCredential = await axios.post('auth/signup', { email, password })
      const userCredential = await transactionsAPI.signup({name: name, email: email, password: password})
      console.log('Res as token from SIGNUP request', userCredential)
      const user = jwt(userCredential.data);
      localStorage.setItem('token', userCredential.data);
      console.log("stored token in local storage")
      console.log('user signup from authcontext: ', auth)
      transactionsAPI.updateServiceAuth();
      await saveUserInfo(user.id);
      setAuth(user)
      console.log('user signup from authcontext111: ', auth)
      setAuthToken(userCredential.data)
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }


  const logout = async () => {
    console.log('logout')
    try {
      localStorage.clear();
      await axios.post('http://localhost:3001/auth/logout', {token: auth })
      setAuth(null)
      setAuthToken(null)
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <AuthContext.Provider value={{ saveUserInfo, auth, authToken, userInfo, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
