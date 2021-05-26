import React, { Component } from 'react';
import { useState, useEffect, useRef } from 'react'
import { useAuth } from 'contexts/authContext'
import ReactDOMServer from 'react-dom/server'
import * as qs from 'qs'
const axios = require('axios')


const Edit_History = (props) => {

    const { authContext } = useAuth()
  
    const thing = useRef()
    const [boba, setBoba] = useState('')
    const [drink, setDrink] = useState('')
    const [date, setDate] = useState('')
    const [price, setPrice] = useState('')
    const [sweetness, setSweetness] = useState('')
    const [error, setError] = useState('')

    //const t = qs.parse(props.location.search, {ignoreQueryPrefix: true})
  
    useEffect(() => {
      const id = props.match.params.id
      axios.get(`http://localhost:3010/v0/boba/${id}/${id}`).then(({ data }) => {
      setBoba(data)
      console.log(boba)
    })
  }, [])



    useEffect(() => {
        if (boba[0] !== undefined) {
            var year = boba[0].purchase_date.substring(0, 4)
            var month = boba[0].purchase_date.substring(0, 4)
          setDate(boba[0].purchase_date.substring(0, 10))
          console.log("hi", date)
          setDrink(boba[0].drinkname)
          console.log(drink)
          setPrice(boba[0].price)
          console.log(price)
          setSweetness(boba[0].sweetness)
        }
      }, [boba])
      


    const onChangeHandler = (e) => {
      const t = qs.parse(props.location.search, {ignoreQueryPrefix: true})
        console.log(props.location.search)
        const { name, value } = e.currentTarget
        switch (name) {
          case 'drink':
            setDrink(value)
            console.log("123123", drink)
            break
          case 'date':
            setDate(value)
            console.log("123123", date)
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
        //console.log(drink, date, price, sweetness)
        const id = props.match.params.id
        try {
        axios
        .put(
            `http://localhost:3010/v0/boba/${id}`,
            {
                user: authContext.user,
              //id: drink.id,
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
      console.log(err.response)
      setError(err.response)
    }
    alert('Successfully added!')
    e.preventDefault()
  }

  return (
    <div className="h-screen flex">
      <main className="w-full max-w-md m-auto bg-green-200 bg-opacity-75 rounded-lg border-0 border-black shadow-default py-10 px-16">
        <div className="text-2xl font-medium text-black mt-4 mb-12 text-center">
          Edit Drink 📝
        </div>
        <form className="form" onSubmit={submitHandler}>
          <fieldset>
            {error && (
              <div className="p-2 bg-red-700 text-gray-100 text-center text-xl mb-4 rounded">
                {error}
              </div>
            )}
            <div>
              <label name="date" htmlFor="date">
                Date Purchased
              </label>
                <input
                  name="date"
                  type="text"
                  required
                  className={`w-full p-2 text-black border-2 rounded-md text-sm mb-4`}
                  id="date"
                  //placeholder="mm/dd/yyyy"
                  onChange={onChangeHandler}
                  defaultValue={date}
                />
            </div>
            <div>
              <label
                name="drink" htmlFor="drink"
              >
                Name
              </label>
                <input
                  name="drink"
                  type="text"
                  required
                  className={`w-full p-2 text-black border-2 rounded-md text-sm mb-4`}
                  id="drink"
                  //placeholder="Drink name"
                  defaultValue={drink}
                  onChange={onChangeHandler}
                />
            </div>
            <div>
              <label
                name="price" htmlFor="price"
              >
                Price
              </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  required
                  className={`w-full p-2 text-black border-2 rounded-md text-sm mb-4`}
                  id="price"
                  //placeholder="Drink price"
                  defaultValue={price}
                  onChange={onChangeHandler}
                />
            </div>
            <div>
              <label
                name="sweetness" htmlFor="sweetness"
              >
                Sweetness Level
              </label>
                <input
                  name="sweetness"
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  required
                  className={`w-full p-2 text-black border-2 rounded-md text-sm mb-4`}
                  id="sweetness"
                  //placeholder="Value between 0 and 1"
                  defaultValue={sweetness}
                  onChange={onChangeHandler}
                />
            </div>
            <div className="flex justify-around">
            <button
              className="bg-blue-500 py-2 px-4 text-sm text-white rounded-md border-2 border-blue-500"
              type="submit"
            >
              Save
            </button>
            </div>
          </fieldset>
        </form>
      </main>
    </div>
  )


}

export default Edit_History