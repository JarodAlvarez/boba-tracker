import React from 'react'
import Navbar from './components/Navbar'
import { AuthProvider } from 'contexts/authContext'
import RoutingSwitch from 'routing/RoutingSwitch'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <RoutingSwitch />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
