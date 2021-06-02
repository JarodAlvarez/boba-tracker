// https://youtu.be/KGFG-yQD7Dw
import React from "react";
import useForm from "./useForm"
import validate from "./validateInfo"

const Form = ({submitForm}) => {
  const {handleChange, values, handleSubmit, errors} = useForm(submitForm, validate);
  return (
    <div className="h-screen flex bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url('${'/images/boba-cover.jpg'}')` }}>
      <div className="w-full max-w-md m-auto bg-yellow-200 rounded-lg border-0 border-black shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-black mt-4 mb-12 text-center">
          New Drink 📝
        </h1>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="date">Date Purchased</label>
            <input
              name="date"
              type="text"
              className={`w-full p-2 text-black border-2 rounded-md text-sm mb-4`}
              id="date"
              placeholder="mm-dd-yyyy"
              value={values.date || ""}
              onChange={handleChange}
            />
            {errors.date && <p class="text-center text-sm text-red-500">{errors.date}</p>}
          </div>
          <div>
            <label htmlFor="drink">Name</label>
            <input
              name="drink"
              type="text"
              className={`w-full p-2 text-black border-2 rounded-md text-sm mb-4`}
              id="drink"
              placeholder="Drink name"
              value={values.drink || ""}
              onChange={handleChange}
            />
            {errors.drink && <p class="text-center text-sm text-red-500">{errors.drink}</p>}
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input
              name="price"
              type="number"
              step="0.01"
              className={`w-full p-2 text-black border-2 rounded-md text-sm mb-4`}
              id="price"
              placeholder="Drink price"
              value={values.price || ""}
              onChange={handleChange}
            />
            {errors.price && <p class="text-center text-sm text-red-500">{errors.price}</p>}
          </div>

          <div>
            <label htmlFor="sweetness">Sweetness Level</label>
            <input
              name="sweetness"
              type="number"
              step="0.25"
              min="0"
              max="1"
              className={`w-full p-2 text-black border-2 rounded-md text-sm mb-4`}
              id="sweetness"
              placeholder="Value between 0 and 1"
              value={values.sweetness || ""}
              onChange={handleChange}
            />
            {errors.sweetness && <p class="text-center text-sm text-red-500">{errors.sweetness}</p>}
          </div>

          <div className="flex justify-around">
            <button
              className="bg-teal-400 py-2 px-4 text-sm text-white rounded-md border-2 border-teal-400" 
              type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;