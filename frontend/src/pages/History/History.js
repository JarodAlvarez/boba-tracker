import React, { useState } from 'react'
import ReactDOMServer from 'react-dom/server'



const History = () => {
    // https://reactjs.org/docs/faq-ajax.html
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [bobas, setBobas] = React.useState([]);

    React.useEffect(() => {
        fetch("http://localhost:3010/v0/boba")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setBobas(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []) // empty array so this will only run once

    // calc total of $$ spent

  const prices = bobas.map(bobas => <div>{bobas.price}</div>)
  const name = bobas.map(bobas => <div>{bobas.drinkname}</div>)
  const sweetness = bobas.map(bobas => <div>{bobas.sweetness}</div>)
  const date = bobas.map(bobas => <div>{bobas.purchase_date}</div>)

  /*handleRemoval(event){
    fetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify("Asd")
    })
  }*/



  return (
    <main className="container mx-auto max-w-full">
      <div className="text-4xl font-cursive flex ml-16 semi-bold">Past Purchases</div>
    <div className = "flex ml-16 mt-12">
    <form className="outline-black bg-loginreg shadow-md p-8 mb-2 w-56 mr-16 font-medium bg-historybox">
      <div className="flex">
        {ReactDOMServer.renderToString(date[0]).substring(23,33)}
      </div>
      <div className ="whitespace-nowrap">{name[0]}</div>
      <div className = "flex whitespace-pre">Price: ${prices[0]}</div>
      <div className = "flex whitespace-pre">Sweetness level: {sweetness[0]}</div>
    </form>
    <form className="outline-black bg-loginreg shadow-md p-8 mb-2 w-56 mr-16 font-medium bg-historybox">
    <div className="flex">
        {ReactDOMServer.renderToString(date[1]).substring(23,33)}
      </div>
      <div className ="whitespace-nowrap">{name[1]}</div>
      <div className = "flex whitespace-pre">Price: ${prices[1]}</div>
      <div className = "flex whitespace-pre">Sweetness level: {sweetness[1]}</div>

    </form>
    <form className="outline-black bg-loginreg shadow-md p-8 mb-2 w-56 mr-16 font-medium bg-historybox">
    <div className="flex">
        {ReactDOMServer.renderToString(date[2]).substring(23,33)}
      </div>
      <div className ="whitespace-nowrap">{name[2]}</div>
      <div className = "flex whitespace-pre">Price: ${prices[2]}</div>
      <div className = "flex whitespace-pre">Sweetness level: {sweetness[2]}</div>

    </form>
    </div>
    </main>
  )
}

export default History