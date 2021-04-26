import React from 'react'
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';


const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
        <div className="bg-blue-600 h-screen text-white flex items-center">
          <h1 className="text-center font-bold text-5xl w-full">Hello World!</h1>
        </div>
      </Router>
    </div>
  )
}

export default App
