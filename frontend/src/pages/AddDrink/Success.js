// Confirmation page
// Shown after user succesfully submits form 
import React from 'react'

const Success = () => {
    return (
    // <div className="h-screen flex">
    <div className="h-screen flex bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url('${'/images/boba-cover.jpg'}')` }}>
      <div className="w-full max-w-md m-auto bg-yellow-200 rounded-lg border-0 border-black shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-black mt-8 mb-12 text-center">
          New drink added! ✅
        </h1>
      </div>
    </div>
    )
}

export default Success;