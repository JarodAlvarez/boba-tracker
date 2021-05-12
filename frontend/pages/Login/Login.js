import React, { useState } from 'react'
import { useAuth } from 'contexts/authContext'
import { Link } from 'react-router-dom'

const LogIn = () => {
  const authContext = useAuth()
  const [email, setEmail] = useState('This username does not exist')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget
    if (name === 'email') setEmail(value)
    else if (name === 'password') setPassword(value)
  }

  const loginHandler = async (e) => {
    try {
      e.preventDefault()
      await authContext.logIn(email, password)
    } catch (err) {
      console.error(err)
      setError(err)
    }
  }

  return (
    <div className="min-h-screen p-2- bg-white">
      <main className="container mx-auto max-w-md">
        <div className="text-5xl font-cursive flex ml-16">
          Boba Tracker
          <img
            src="https://i.imgur.com/ZAeNBty.png"
            alt="..."
            className="rounded max-w-full h-16 align-right ml-2"
          />
        </div>
        <div className="sm:h-18 h-16">
          <div className="text-base font-cursive text-center">
            An easy way to track your monthly boba tea
          </div>
          <div className="text-base font-cursive text-center">purchases</div>
        </div>
        <form
          className="outline-black bg-loginreg shadow-md p-12 mx-8"
          onSubmit={loginHandler}
        >
          <fieldset>
            {error && (
              <div className="p-2 bg-red-700 text-gray-100 text-center text-xl mb-4 rounded">
                {error}
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-baseline justify-center mb-4 w-full h-12">
              <label className="text-black text-2xl font-bold">
                Welcome back!
              </label>
            </div>
            <div className="items-baseline justify-between mb-2 w-full">
              <label className="text-black text-lg" htmlFor="username">
                Email
              </label>
              <div className="mb-4 w-full mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  className="shadow appearance-none outline-none rounded w-full py-2 px-3 mb-3
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
              <div className="mb-4 w-full mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="shadow appearance-none outline-none rounded w-full py-2 px-3 mb-2
                  bg-white text-gray-900 leading-tight focus:shadow-outline"
                  onChange={onChangeHandler}
                />
                <p className="text-gray-500 text-sm text-right">
                  <a href="#" className="text-blue-400 font-bold">
                    Forgot your password?
                  </a>
                </p>
              </div>
            </div>
            <button
              className="w-48 bg-logregbutton text-black font-bold py-2 px-4 rounded 
              focus:outline-none focus:shadow-outline hover:bg-red-500 ml-12 mt-4"
              type="submit"
            >
              Sign in
            </button>
          </fieldset>
        </form>
        <footer className="text-black rounded-b-lg text-center py-4">
          {'New member? '}
          <nobr>
            <Link className="text-blue-400 font-bold" to="/register">
              Create an account!
            </Link>
          </nobr>
        </footer>
      </main>
    </div>
  )
}

export default LogIn