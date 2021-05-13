import { useAuth } from 'contexts/authContext'
import React, { useState, useEffect } from 'react'
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
        .then(() =>
          axios
            .get(`http://localhost:3010/v0/boba/${authContext.user.email}`)
            .then(({ data }) => {
              setBobas(data)
            })
        )
    } catch (err) {
      setError(err.response)
      console.log(err.response)
    }
  }

  const editHandler = (id) => async (e) => {}

  // calc total of $$ spent

  const historyRender = bobas.map((entry, i) => {
    const date = new Date(entry.purchase_date)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    return (
      <form
        key={i}
        className="outline-black bg-loginreg shadow-md p-8 mb-2 w-56 mr-16 font-medium bg-historybox"
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
          <button className="bg-gray-200 p-2" onClick={deleteHandler}>
            Edit
          </button>
          <button className="bg-purple-300 p-2" onClick={editHandler}>
            Delete
          </button>
        </div>
      </form>
    )
  })

  /*handleRemoval(event){
    fetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify("Asd")
    })
  }*/

  return (
    <main className="container mx-auto max-w-full">
      <div className="text-4xl font-cursive flex ml-16 semi-bold">
        Past Purchases
      </div>
      <div className="flex ml-16 mt-12">{historyRender}</div>
    </main>
  )
}

export default History
