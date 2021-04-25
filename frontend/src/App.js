import React from 'react'
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar/>
      <div className="bg-blue-600 h-screen text-white flex items-center">
        <h1 className="text-center font-bold text-5xl w-full">Hello World!</h1>
      </div>
    </div>
  )
}

export default App
