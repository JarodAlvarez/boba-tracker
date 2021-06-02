import React, { useState } from 'react'
import { useAuth } from 'contexts/authContext'
import { Link } from 'react-router-dom'

/**
 * Placeholder for Register Page
 */
const Register = () => {
  const authContext = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget
    if (name === 'email') setEmail(value)
    else if (name === 'password') setPassword(value)
    else if (name === 'confirmation') setConfirmation(value)
    else if (name === 'name') setName(value)
  }

  const signUpHandler = async (e) => {
    try {
      e.preventDefault()
      if (!validateEmail(email)) setError('INVALID EMAIL FORMAT')
      else if (password.length < 6)
        setError('PASSWORD MUST BE AT LEAST 6 CHARACTERS LONG')
      else if (confirmation !== password)
        setError("PASSWORDS AND CONFIRMATION DON'T MATCH")
      else {
        setError('')
        await authContext.signUp(name, email, password)
      }
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url('${'/images/gradient.png'}')` }}>
      <div className="w-screen bg-white pt-2 pb-2">
        <div className="justify-center text-5xl font-cursive flex">
          Boba Tracker
          <img
            src="https://i.imgur.com/ZAeNBty.png"
            alt="..."
            className="rounded max-w-full h-16 align-right ml-2"
          />
        </div>
      </div>
      <main className="container mx-auto max-w-md">
        <div className="sm:h-18 h-16">
          <div className="text-base font-cursive text-center">
            An easy way to track your weekly boba tea
          </div>
          <div className="text-base font-cursive text-center">purchases</div>
        </div>
        <form
          className="bg-white border border-gray-400 shadow-md p-12 mx-8 rounded-lg"
          onSubmit={signUpHandler}
        >
          <fieldset>
            {error && (
              <div className="p-2 bg-red-700 text-gray-100 text-center text-xl mb-4 rounded">
                {error}
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-baseline justify-center mb-4 w-full h-12">
              <label className="text-black text-2xl font-bold">
                Create an account
              </label>
            </div>
            <div className="items-baseline justify-between mb-2 w-full">
              <label className="text-black text-lg" htmlFor="name">
                Name
              </label>
              <div className="mb-2 w-full mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="shadow appearance-none outline-none border-2 border-gray-400 rounded w-full py-2 px-3 mb-2
                  bg-white text-gray-900 leading-tight focus:shadow-outline"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="items-baseline justify-between mb-2 w-full">
              <label className="text-black text-lg" htmlFor="email">
                Email
              </label>
              <div className="mb-2 w-full mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  className="shadow appearance-none outline-none border-2 border-gray-400 rounded w-full py-2 px-3 mb-2
                  bg-white text-gray-900 leading-tight focus:shadow-outline"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="items-baseline justify-between mb-2 w-full">
              <label
                className="text-black text-lg mb-2"
                name="password"
                htmlFor="password"
              >
                Password
              </label>
              <div className="mb-2 w-full mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="shadow appearance-none outline-none border-2 border-gray-400 rounded w-full py-2 px-3 mb-2
                  bg-white text-gray-900 leading-tight focus:shadow-outline"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="items-baseline justify-between mb-2 w-full">
              <label
                className="text-black text-lg mb-2"
                name="confirmation"
                htmlFor="confirmation"
              >
                Confirm Password
              </label>
              <div className="mb-4 w-full mt-2">
                <input
                  id="confirmation"
                  name="confirmation"
                  type="password"
                  required
                  className="shadow appearance-none outline-none border-2 border-gray-400 rounded w-full py-2 px-3 mb-2
                  bg-white text-gray-900 leading-tight focus:shadow-outline"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <button
              className="w-48 bg-logregbutton text-black font-bold py-2 px-4 rounded 
              focus:outline-none focus:shadow-outline hover:bg-red-500 sm:ml-12"
              type="submit"
            >
              Register
            </button>
          </fieldset>
        </form>
        <footer className="text-black rounded-b-lg text-center py-4">
          {'Already a member? '}
          <nobr>
            <Link className="text-blue-400 font-bold" to="/login">
              Log in
            </Link>
          </nobr>
        </footer>
      </main>
    </div>
  )
}

export default Register
