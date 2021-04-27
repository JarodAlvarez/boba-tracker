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
      if (confirmation !== password)
        setError("PASSWORDS AND CONFIRMATION DON'T MATCH")
      else {
        setError('')
        await authContext.signUp(email, password, name)
      }
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div className="min-h-screen ">
      <main className="container">
        <div className="flex">
          <div className="">
            <div className="">BobaTracker</div>
            <p className="">
              An easy way to track your monthly boba tea purchases.
            </p>
          </div>
          <div className="">
            <div className="bg-blue-400 text-white text-center text-xl py-4">
              Create an account
            </div>
            <form
              className="bg-blue-400 shadow-md p-8"
              onSubmit={signUpHandler}
            >
              <fieldset>
                {error && (
                  <div className="p-2 bg-purple-400 text-gray-100 text-center text-xl mb-4 ">
                    {error}
                  </div>
                )}
                <div className="flex flex-col sm:flex-row items-baseline justify-between mb-4 w-full">
                  <label
                    className="text-white text-lg text-sm font-bold mr-5 w-1/2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <div className="w-full sm:w-2/3">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="shadow appearance-none outline-none  w-full py-2 px-3
                  bg-gray-900 text-gray-100 leading-tight focus:shadow-outline"
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-baseline justify-between mb-4 w-full">
                  <label
                    className="text-white  text-lg text-sm font-bold mr-5 w-1/2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="w-full sm:w-2/3">
                    <input
                      id="email"
                      name="email"
                      required
                      className="shadow appearance-none outline-none  w-full py-2 px-3
                  bg-gray-900 text-gray-100 leading-tight focus:shadow-outline"
                      onChange={onChangeHandler}
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-baseline justify-between mb-4 w-full">
                  <label
                    className="text-white text-lg text-sm font-bold mr-5 w-1/2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="w-full sm:w-2/3">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="shadow appearance-none outline-none  w-full py-2 px-3
                  bg-gray-900 text-gray-100 leading-tight focus:shadow-outline"
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-baseline justify-between w-full">
                  <label
                    htmlFor="confirmation"
                    className="text-white text-lg text-sm font-bold mr-5 w-1/2"
                  >
                    Confirmation
                  </label>
                  <div className="w-full sm:w-2/3">
                    <input
                      id="confirmation"
                      name="confirmation"
                      placeholder="Re-enter your password"
                      type="password"
                      required
                      className="shadow appearance-none outline-none  w-full py-2 px-3
                  bg-gray-900 text-gray-100 leading-tight focus:shadow-outline"
                      onChange={onChangeHandler}
                    ></input>
                  </div>
                </div>
                <button
                  className="w-full bg-purple-400 text-white font-bold py-2 px-4  
              focus:outline-none focus:shadow-outline hover:bg-red-500 mt-4"
                  type="submit"
                >
                  Register
                </button>
              </fieldset>
            </form>
            <footer className="bg-blue-400 text-white -b-lg text-center py-4">
              {'Already have an account? '}
              <nobr>
                <Link className="text-blue-400" to={`/login`}>
                  Log in
                </Link>
              </nobr>
            </footer>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Register
