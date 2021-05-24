import React from 'react'
import SpendingChart from '../../components/spendingChart'
import SugarChart from '../../components/sugarChart'
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
    let drinks = 0
    var price = 0.0;
    var sugar = 0.0
    for (i in bobas) {
        var date = new Date(bobas[i].purchase_date);
        // calculate the current week only 
        const today = new Date();
        const todayDate = today.getDate(); // 1-31
        const todayDay = today.getDay(); // 0-6
        const firstDayOfWeek = new Date(today.setDate(todayDate - todayDay));
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
        firstDayOfWeek.setHours(0, 0, 0, 0);

        if (date >= firstDayOfWeek && date <= lastDayOfWeek) {
            price = Number(price) + Number(bobas[i].price);
            sugar = Number(sugar) + Number(bobas[i].sweetness)
            price = price.toFixed(2);
            drinks++;
        }
    }
    sugar = sugar / drinks;
    let drinksBoughtThisWeek = drinks;
    sugar = sugar.toFixed(2);


    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading ...</div>
    } else {
        return (
            <div>
                <div
                    class="bg-purple-200"
                >
                    <h1 class="text-left text-5xl pl-10">Welcome {authContext.authContext.user.email}!</h1>
                    <div class="flex justify-evenly m-10 text-center text-white">
                        <div
                            class="border-0 bg-purple-500 rounded-full shadow-md p-6 m-4 w-1/4"
                        >
                            <div class="text-lg">Drinks Bought This Week</div>
                            <div class="text-2xl font-bold">{drinksBoughtThisWeek}</div>
                            {/* {console.log(price)} */}

                        </div>
                        <div
                            class="border-0 bg-purple-500 rounded-full shadow-md p-6 m-4 w-1/4"
                        >
                            <div class="text-lg">Money Spent</div>
                            <div class="text-2xl font-bold">${price}</div>
                        </div>
                        <div
                            class="border-0 bg-purple-500 rounded-full shadow-md p-6 m-4 w-1/4"
                        >
                            <div class="text-lg">Average Sweetness</div>
                            <div class="text-2xl font-bold">{(sugar * 100).toFixed(2)}%</div>
                        </div>

                    </div>
                    <div class="text-center grid xl:grid-cols-2 sm:grid-cols-1 gap-4 px-12">
                        <div class="border-1 bg-white rounded-lg p-4 h-1/5 shadow-md">
                            <SpendingChart />
                        </div>
                        <div class="border-1 bg-white rounded-lg p-4 h-1/5 shadow-md">
                            <SugarChart />
                        </div>
                    </div>
                </div>

            </div>

        )
    }


}

export default Dashboard