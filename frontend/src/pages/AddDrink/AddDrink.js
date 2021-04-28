import React from 'react'

const AddDrink = () => {
  return (
    <div className="h-screen flex">
      <div className="w-full max-w-md m-auto bg-green-200 bg-opacity-75 rounded-lg border-0 border-black shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-black mt-4 mb-12 text-center">
          New Drink 📝
        </h1>
        <form className="form">
          <div>
            <label htmlFor="date">Date Purchased</label>
            <input
              type="date"
              className={`w-full p-2 text-black border-2 rounded-md text-sm mb-4`}
              id="date"
              placeholder="mm/dd/yyyy"
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className={`w-full p-2 text-black border-2 rounded-md text-sm mb-4`}
              id="name"
              placeholder="Drink name"
            />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className={`w-full p-2 text-black border-2 rounded-md text-sm mb-4`}
              id="price"
              placeholder="Drink price"
            />
          </div>

          <div>
            <label htmlFor="sweetness">Sweetness Level</label>
            <input
              type="text"
              className={`w-full p-2 text-black border-2 rounded-md text-sm mb-4`}
              id="sweetness"
              placeholder="Low Regular High"
            />
          </div>

          <div className="flex justify-around">
            <button
              className="bg-blue-500 py-2 px-4 text-sm text-white rounded-md border-2 border-blue-500"
              type="submit"
            >
              Submit
            </button>

            <button
              className="bg-gray-500 py-2 px-4 text-sm text-white rounded-md border-2 border-gray-500 focus:outline-none focus:border-gray-900"
              type="reset"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddDrink
