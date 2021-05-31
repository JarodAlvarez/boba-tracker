import React, { Component } from 'react';
import { useState, useEffect, useRef } from 'react'
import { useAuth } from 'contexts/authContext'
import { Link } from 'react-router-dom'
import * as qs from 'qs'
const axios = require('axios')


const Edit_History = (props) => {

    const { authContext } = useAuth()
  
    const thing = useRef('')
    const [boba, setBoba] = useState('')
    const [drink, setDrink] = useState('')
    const [date, setDate] = useState('')
    const [price, setPrice] = useState('')
    const [sweetness, setSweetness] = useState('')
    const [error, setError] = useState('123')
    const [canSubmit, setSubmitting] = useState(false)


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
        e.preventDefault()
        console.log(date)
        setError(validate(drink, date, price, sweetness))
        console.log(error)
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
      console.log(thing)
      if(thing.current != 'badData')
      {
      alert('Successfully modified!')
      }
      thing.current = ''
    }

    function validate(dr, da, pr, sw){
      console.log(da)
      let errors = {}
      if(!da){
        errors.date = "Date required"
        console.log("no date")
        thing.current = 'badData'
      }
  
      if(!dr){
        errors.drink = "Drink name required"
        console.log("no date")
        thing.current = 'badData'
      }
  
      if(!pr){
        errors.price = "Price required"
        thing.current = 'badData'
      }
  
      if(!sw){
        errors.sweetness = "Sweetness level required"
        thing.current = 'badData'
      }
      const pattern = /^([0-9]{4}-[0-9]{2}-[0-9]{2}$)/
      const validDate = pattern.test(da)
      console.log(validDate)
      console.log(da)
      if (!validDate){
        errors.date = "Date must be in yyyy-mm-dd format!"
        thing.current = 'badData'
      }
      const value = parseFloat(sw)
      if((value != 0 && value != 0.25 && value != 0.5 && value != 0.75 && value != 1.00)){
          console.log(parseFloat(sw))
          errors.sweetness = "Sweetness must be 0, 0.25, 0.50, 0.75, or 1.0."
          thing.current = 'badData'
    }

      console.log(thing.current)
      return errors;
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
                Date Purchased
              </label>
                <input
                  name="date"
                  type="text"
                  className={`w-full p-2 text-black border-2 rounded-lg text-sm mb-4`}
                  id="date"
                  required
                  //placeholder="mm/dd/yyyy"
                  onChange={onChangeHandler}
                  defaultValue={date}
                />
                {error.date && <p class="text-center text-sm text-red-500">{error.date}</p>}
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
                  className={`w-full p-2 text-black border-2 rounded-lg text-sm mb-4`}
                  id="drink"
                  required
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
                  className={`w-full p-2 text-black border-2 rounded-lg text-sm mb-4`}
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
                  className={`w-full p-2 text-black border-2 rounded-lg text-sm mb-4`}
                  id="sweetness"
                  //placeholder="Value between 0 and 1"
                  defaultValue={sweetness}
                  onChange={onChangeHandler}
                />
                {error.sweetness && <p class="text-center text-sm text-red-500">{error.sweetness}</p>}
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