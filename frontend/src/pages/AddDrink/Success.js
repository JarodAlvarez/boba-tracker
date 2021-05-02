// Confirmation page
// Shown after user succesfully submits form 
import React from 'react'

const Success = () => {
    return (
    <div className="h-screen flex">
      <div className="w-full max-w-md m-auto bg-green-200 bg-opacity-75 rounded-lg border-0 border-black shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-black mt-8 mb-12 text-center">
          New drink added! ✅
        </h1>
      </div>
    </div>
    )
}

export default Success;