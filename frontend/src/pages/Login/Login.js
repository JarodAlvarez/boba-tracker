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
    <div className="h-screen bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url('${'/images/gradient.png'}')` }}>
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
          <div className="text-base font-cursive text-center pt-2">
            An easy way to track your weekly boba tea
          </div>
          <div className="text-base font-cursive text-center">purchases</div>
        </div>
        <form
          className="bg-white shadow-md border border-black-400 p-12 mx-8 mt-6 rounded-lg"
          onSubmit={loginHandler}
        >
          <fieldset>
            {error && (
              <div className="p-2 bg-red-700 text-gray-100 text-center text-xl mb-4 rounded">
                {error}
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-baseline justify-center sm:mb-4 w-full h-12">
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
                  className="shadow appearance-none outline-none border-2 border-gray-400 rounded w-full py-2 px-3 mb-3
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
                  className="shadow appearance-none outline-none border-2 border-gray-400 rounded w-full py-2 px-3 mb-2
                  bg-white text-gray-900 leading-tight focus:shadow-outline"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <button
              className="w-48 bg-logregbutton text-black font-bold py-2 px-4 rounded 
              focus:outline-none focus:shadow-outline hover:bg-red-500 sm:ml-12 mt-4"
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
