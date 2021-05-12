import { useState, useEffect } from 'react'
import { useAuth } from 'contexts/authContext'
const useForm = (callback, validate) => {
  const authContext = useAuth()
  const [values, setValues] = useState({
    date: '',
    drink: '',
    price: '',
    sweetness: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(validate(values))
    setIsSubmitting(true)

    const data = {
      purchase_date: values.date,
      drinkname: values.drink,
      price: values.price,
      sweetness: values.sweetness,
      email: authContext.authContext.user.email,
    };
    fetch('http://localhost:3010/v0/boba', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((response) => console.log('Success:', response))
      setErrors(validate(values))
      setIsSubmitting(true)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback()
    }
  }, [errors]);

  return { handleChange, values, handleSubmit, errors }
}

export default useForm
