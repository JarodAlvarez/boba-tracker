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
    fetch(`http://localhost:3010/v0/boba/${authContext.user.email}`)
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
      await axios
        .delete(`http://localhost:3010/v0/boba/${id}`, {
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

  bobas.sort(function (a, b) {
    if (b.purchase_date.substr(0, 4) == a.purchase_date.substr(0, 4)) {
      if (b.purchase_date.substr(5, 2) == a.purchase_date.substr(5, 2)) {
        if (b.purchase_date.substr(8, 2) == a.purchase_date.substr(8, 2)) {
          if (a.drinkname < b.drinkname) {
            return -1
          }
          return 0
        }
        return b.purchase_date.substr(8, 2) - a.purchase_date.substr(8, 2)
      }
      return b.purchase_date.substr(5, 2) - a.purchase_date.substr(5, 2)
    }
    return b.purchase_date.substr(0, 4) - a.purchase_date.substr(0, 4)
  })

  const historyRender = bobas.map((entry, i) => {
    const date = new Date(entry.purchase_date)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return (
      <form
        key={i}
        className="rounded-lg bg-loginreg shadow-md py-4 px-8 mb-10 w-56 mr-16 font-medium bg-historybox"
      >
        <div className="flex">
          {('00' + month).slice(-2)}-{('00' + day).slice(-2)}-{year}
        </div>
        <div className="whitespace-nowrap truncate overflow-clip">
          {entry.drinkname}
        </div>
        <div className="flex whitespace-pre overflow-clip">
          Price: ${entry.price}
        </div>
        <div className="flex whitespace-pre overflow-clip">
          Sweetness level: {entry.sweetness}
        </div>
        <div className="flex justify-between mt-2 overflow-clip">
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
        <div className="flex flex-wrap ml-16 mt-12">{historyRender}</div>
      ) : (
        <div className="">Loading...</div>
      )}
    </main>
  )
}

export default History
