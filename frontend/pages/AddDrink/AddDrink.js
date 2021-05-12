import Form from './Form'
import Success from './Success'
import React, { useState } from 'react'

const AddDrink = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  function submitForm() {
    setIsSubmitted(true)
  }
  return (
    <div>
      {!isSubmitted ? <Form submitForm={submitForm} /> : <Success />}
    </div>
  )
}

export default AddDrink;
