import React from 'react'
import SpendingChart from '../../components/spendingChart'


const Dashboard = () => {
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
    let i;
    var price = 0.0;
    for (i in bobas) {
        price = Number(price) + Number(bobas[i].price);
        price = price.toFixed(2);
        console.log(price);
    }


    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading ...</div>
    } else {
        let drinksBought = bobas.length;
        return (
            <div>
                <div class="flex justify-evenly m-10 text-center ">
                    <div
                        class="border-2 border-indigo-600 bg-blue-200 rounded-lg p-6 m-2 w-1/6 cursor-pointer"
                        onClick={e => console.log("Clicked")} // change later
                    >
                        <div>Drinks Bought</div>
                        <div>{drinksBought}</div>
                        {console.log(price)}

                    </div>
                    <div class="border-2 border-yellow-600 bg-yellow-200 rounded-lg p-6 m-2 w-1/6 cursor-pointer"
                        onClick={e => console.log("Clicked")} // change later
                    >
                        <div>Money Spent</div>
                        <div>{price}</div>
                    </div>
                    <div class="border-2 border-red-600 bg-red-200 rounded-lg p-6 m-2 w-1/6 cursor-pointer"
                        onClick={e => console.log("Clicked")} // change later
                    >
                        <div>Drink Sugar Level</div>
                        <div>diabetic levels</div>
                    </div>

                </div>
                <div class="container mx-auto px-8 p-8">
                    <SpendingChart />
                </div>
            </div>
        )
    }


}

export default Dashboard