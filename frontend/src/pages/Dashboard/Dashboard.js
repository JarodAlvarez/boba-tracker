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
    const call = "http://ec2-18-191-254-252.us-east-2.compute.amazonaws.com:3010/v0/boba/" + authContext.authContext.user.email;
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
                    setBobas({});
                    console.log("Hello There");
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
    let drinksBoughtThisWeek = drinks;
    if (drinks != 0) {
        sugar = sugar / drinks;
        sugar = sugar.toFixed(2);
    }

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
                    <h1 class="text-center sm:text-left text-3xl sm:text-5xl sm:pl-10">Welcome {authContext.authContext.user.name}!</h1>
                    <div class="flex justify-evenly m-2 gap-2 sm:m-10 text-center text-white">
                        <div
                            class="border-0 bg-purple-500 rounded-full shadow-md p-2 sm:p-6 sm:m-4 w-1/3 sm:w-1/4"
                        >
                            <div class="text-lg">Drinks Bought This Week</div>
                            <div class="text-2xl font-bold">{drinksBoughtThisWeek}</div>

                        </div>
                        <div
                            class="border-0 bg-purple-500 rounded-full shadow-md p-2 sm:p-6 sm:m-4 w-1/3 sm:w-1/4"
                        >
                            <div class="text-lg">Money Spent</div>
                            <div class="text-2xl font-bold">${price}</div>
                        </div>
                        <div
                            class="border-0 bg-purple-500 rounded-full shadow-md p-2 sm:p-6 sm:m-4 w-1/3 sm:w-1/4"
                        >
                            <div class="text-lg">Average Sweetness</div>
                            <div class="text-2xl font-bold">{(sugar * 100).toFixed(2)}%</div>
                        </div>

                    </div>
                    <div class="text-center grid xl:grid-cols-2 sm:grid-cols-1 gap-4 p-2 sm:px-12">
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