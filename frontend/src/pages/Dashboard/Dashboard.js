import React from 'react'
import SpendingChart from '../../components/spendingChart'
import { useAuth } from 'contexts/authContext'

const Dashboard = () => {
    // https://reactjs.org/docs/faq-ajax.html
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [bobas, setBobas] = React.useState([]);
    const authContext = useAuth();
    const call = "http://localhost:3010/v0/boba/" + authContext.authContext.user.email;  
    React.useEffect(() => {
        fetch(call)
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

    // calc total of $$ spent and suagr consumed
    let i;
    let counter = 0
    var price = 0.0;
    var sugar = 0.0
    for (i in bobas) {
        price = Number(price) + Number(bobas[i].price);
        sugar = Number(sugar) + Number(bobas[i].sweetness)
        price = price.toFixed(2);
        counter ++;
    }
    sugar = sugar / counter;
    sugar = sugar.toFixed(2);


    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading ...</div>
    } else {
        let drinksBought = bobas.length;
        return (
            <div>
                <h1 class="text-center">Welcome {authContext.authContext.user.email}!</h1>
                <div class="flex justify-evenly m-10 text-center ">
                    <div
                        class="border-2 border-indigo-600 bg-blue-200 rounded-lg p-6 m-2 w-1/6 cursor-pointer"
                    >
                        <div>Drinks Bought</div>
                        <div>{drinksBought}</div>
                        {/* {console.log(price)} */}

                    </div>
                    <div class="border-2 border-yellow-600 bg-yellow-200 rounded-lg p-6 m-2 w-1/6 cursor-pointer"
                    >
                        <div>Money Spent</div>
                        <div>{price}</div>
                    </div>
                    <div class="border-2 border-red-600 bg-red-200 rounded-lg p-6 m-2 w-1/6 cursor-pointer"
                    >
                        <div>Average Sweetness</div>
                        <div>{sugar}</div>
                    </div>

                </div>
                <div class=" object-contain container mx-auto p-12">
                    <SpendingChart />
                </div>
            </div>
        )
    }


}

export default Dashboard