import { useAuth } from 'contexts/authContext'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './History.css'
const axios = require('axios')

const History = () => {
  // https://reactjs.org/docs/faq-ajax.html
  const { authContext } = useAuth()
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [bobas, setBobas] = useState([])

  useEffect(() => {
    fetch(`http://ec2-18-191-254-252.us-east-2.compute.amazonaws.com:3010/v0/boba/${authContext.user.email}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setBobas(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, []) // empty array so this will only run once

  const deleteHandler = (id) => async (e) => {
    try {
      e.preventDefault()
      console.log(id)
      await axios
        .delete(`http://ec2-18-191-254-252.us-east-2.compute.amazonaws.com:3010/v0/boba/${id}`, {
          headers: {
            Authorization: 'Bearer ' + authContext.user.token,
          },
          params: { isAdmin: authContext.user.isAdmin },
        })
        .then(() => {
          var deleteIdx = bobas.findIndex((i) => i.id === id)
          var tempBoba = [...bobas]
          tempBoba.splice(deleteIdx, 1)
          setBobas(tempBoba)
        })
    } catch (err) {
      setError(err.response)
      console.log(err.response)
    }
  }

  const historyRender = bobas.map((entry, i) => {
    var date = new Date(entry.purchase_date)
    date = new Date(date.getTime() + date.getTimezoneOffset() * 60000) //local Date
    console.log(entry.purchase_date);
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return (
      <form
        key={i}
        className="rounded-lg outline-black bg-loginreg shadow-md py-4 px-8 mb-10 w-56 mr-16 font-medium bg-historybox"
      >
        <div className="flex">
          {year}-{('00' + month).slice(-2)}-{('00' + day).slice(-2)}
        </div>
        <div className="whitespace-nowrap">{entry.drinkname}</div>
        <div className="flex whitespace-pre">Price: ${entry.price}</div>
        <div className="flex whitespace-pre">
          Sweetness level: {entry.sweetness}
        </div>
        <div className="flex justify-between mt-2">
          <Link
            className="rounded-lg btn bg-gray-200 p-2 font-semibold"
            to={`edit/${entry.id}`}
          >
            Edit
          </Link>
          <button
            className="rounded-lg bg-purple-300 p-2 font-semibold"
            onClick={deleteHandler(entry.id)}
          >
            Delete
          </button>
        </div>
      </form>
    )
  })

  return (
    <main className="container mx-auto max-w-full min-h-screen bckground-history">
      <div className="pt-10 text-2xl text-white font-cursive flex ml-16 semi-bold">
        Past Purchases
      </div>
      {isLoaded ? (
        <div className="flex flex-wrap ml-12 sm:ml-16 mt-12">{historyRender}</div>
      ) : (
        <div className="">Loading...</div>
      )}
    </main>
  )
}

export default History