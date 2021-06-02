import React, { Component } from 'react'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from 'contexts/authContext'
import { Link } from 'react-router-dom'
import * as qs from 'qs'
const axios = require('axios')

const Edit_History = (props) => {
  const { authContext } = useAuth()
  const inputStatus = useRef('')
  const [boba, setBoba] = useState('')
  const [drink, setDrink] = useState('')
  const [date, setDate] = useState('')
  const [price, setPrice] = useState('')
  const [sweetness, setSweetness] = useState('')
  const [error, setError] = useState('123')

  const [dateString, setDateString] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  useEffect(() => {
    const id = props.match.params.id
    axios.get(`http://localhost:3010/v0/boba/${id}/${id}`).then(({ data }) => {
      setBoba(data)
    })
  }, [])

  useEffect(() => {
    if (boba[0] !== undefined) {
      setDate(boba[0].purchase_date.substring(0, 10))
      setYear(boba[0].purchase_date.substring(0, 4))
      setMonth(boba[0].purchase_date.substring(5, 7) + '-')
      setDay(boba[0].purchase_date.substring(8, 10) + '-')
      setDrink(boba[0].drinkname)
      setPrice(boba[0].price)
      setSweetness(boba[0].sweetness)
    }
    console.log(month)
  }, [boba])

  useEffect(() => {
    if (dateString == '') {
      console.log(month)
      setDateString(day + '-' + month)
    }
    console.log(month)
  }, [day])

  const onChangeHandler = (e) => {
    const t = qs.parse(props.location.search, { ignoreQueryPrefix: true })
    const { name, value } = e.currentTarget
    switch (name) {
      case 'drink':
        setDrink(value)
        break
      case 'date':
        setDate(value)
        break
      case 'price':
        setPrice(parseFloat(value))
        break
      case 'sweetness':
        setSweetness(value)
        break
    }
  }

  const submitHandler = async (e) => {
    var dateFormatted = month + day + year
    e.preventDefault()
    setError(validate(drink, date, dateFormatted, price, sweetness))
    const id = props.match.params.id
    try {
      axios
        .put(
          `http://localhost:3010/v0/boba/${id}`,
          {
            user: authContext.user,
            date,
            drink,
            price,
            sweetness,
          },
          {
            headers: {
              Authorization: 'Bearer ' + authContext.user.token,
            },
          }
        )
        .then(({ data }) => console.log(data))
    } catch (err) {
      setError(err.response)
    }
    if (inputStatus.current != 'badData') {
      alert('Successfully modified!')
    }
    inputStatus.current = ''
  }

  function validate(drinkName, date, dateFormatted, price, sweetness) {
    let errors = {}
    if (date === '') {
      errors.date = 'Date required'
      inputStatus.current = 'badData'
    }

    if (drinkName === '') {
      errors.drink = 'Drink name required'
      inputStatus.current = 'badData'
    }

    if (price === '') {
      errors.price = 'Price required'
      inputStatus.current = 'badData'
    }

    if (sweetness === '') {
      errors.sweetness = 'Sweetness level required'
      inputStatus.current = 'badData'
    }
    console.log(date.substring(0, 2))
    if (
      (date.substring(0, 2) > 12 || date.substring(0, 2)) < 1 &&
      date != dateFormatted
    ) {
      errors.date = 'Month must be between 01 and 12'
      inputStatus.current = 'badData'
    }

    const value = parseFloat(sweetness)
    if (
      value != 0 &&
      value != 0.25 &&
      value != 0.5 &&
      value != 0.75 &&
      value != 1.0
    ) {
      errors.sweetness = 'Sweetness must be 0, 0.25, 0.50, 0.75, or 1.0.'
      inputStatus.current = 'badData'
    }

    return errors
  }

  return (
    <div className="h-screen flex bg-edit-bg bg-cover bg-opacity-75">
      <main className="max-w-md m-auto bg-white bg-opacity-90 rounded-lg border-gray-600 border-2 shadow-default pt-10 pb-8 px-12">
        <div className="text-2xl font-medium text-black mb-8 text-center">
          Edit Drink
        </div>
        <form className="form" onSubmit={submitHandler}>
          <fieldset>
            <div>
              <label name="date" htmlFor="date">
                Date Purchased (mm-dd-yyyy)
              </label>
              <input
                name="date"
                type="text"
                pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}$"
                className={`w-full p-2 text-black border-2 rounded-lg text-sm mb-4`}
                id="date"
                required
                placeholder="mm-dd-yyyy"
                onChange={onChangeHandler}
                defaultValue={month + day + year}
              />
              {error.date && (
                <p class="text-center text-sm text-red-500">{error.date}</p>
              )}
            </div>
            <div>
              <label name="drink" htmlFor="drink">
                Name
              </label>
              <input
                name="drink"
                type="text"
                className={`w-full p-2 text-black border-2 rounded-lg text-sm mb-4`}
                id="drink"
                required
                placeholder="Drink name"
                defaultValue={drink}
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <label name="price" htmlFor="price">
                Price
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                required
                placeholder="Drink price"
                className={`w-full p-2 text-black border-2 rounded-lg text-sm mb-4`}
                id="price"
                defaultValue={price}
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <label name="sweetness" htmlFor="sweetness">
                Sweetness Level
              </label>
              <input
                name="sweetness"
                type="number"
                step="0.25"
                min="0"
                max="1"
                required
                placeholder="Value of 0, 0.25, 0.50, 0.75, or 1"
                className={`w-full p-2 text-black border-2 rounded-lg text-sm mb-4`}
                id="sweetness"
                defaultValue={sweetness}
                onChange={onChangeHandler}
              />
              {error.sweetness && (
                <p class="text-center text-sm text-red-500">
                  {error.sweetness}
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-evenly">
              <button
                className="bg-blue-500 py-2 px-4 text-sm text-white rounded-md border-2 border-blue-500"
                type="submit"
              >
                Save
              </button>
              <Link className="btn bg-gray-300 p-2 rounded-lg" to={'/history'}>
                Cancel
              </Link>
            </div>
          </fieldset>
        </form>
      </main>
    </div>
  )
}

export default Edit_History
