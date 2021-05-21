import React from 'react'
import { useAuth } from 'contexts/authContext'

const Navbar = () => {
  const authContext = useAuth()
  if (authContext.authContext.authenticated)
    return (
      <div class="container mx-auto bg-white p-5">
          <nav class="flex justify-between">
            {/* Logo aligned on left */}
            <div class=" display: inline-block text-xl font-bold">
              <a href="/home">
              Boba Tracker</a>
              <img
              src="https://i.imgur.com/ZAeNBty.png"
              alt="..."
              class="display: inline-block h-8 ml-2 mb-2"
              />
            </div>
            {/* Links aligned on right */}
            <ul class="flex flex-row">
              <li class="pr-5"><a href="/"> Dashboard </a></li>
              <li class="pr-5"><a href="/add_drink">New Drink</a></li>
              <li class="pr-5"><a href="/history">History</a></li>
              <li class="pr-5"><a onClick={authContext.logout}>Log Out</a></li>
            </ul>
            
          </nav>
      </div>
    )
  else return <div className=""></div>
}
export default Navbar
