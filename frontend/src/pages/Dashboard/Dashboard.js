import React from 'react'

const Dashboard = () => {
    return (
        <div class="flex justify-evenly m-10 text-center ">
            <div class = "border-2 border-indigo-600 bg-blue-200 rounded-lg p-6 m-2 w-1/6">
                <div>Drinks Bought</div>
                <div># A lot</div>
                
            </div>
            <div class = "border-2 border-yellow-600 bg-yellow-200 rounded-lg p-6 m-2 w-1/6">
                <div>Money Spent</div>
                <div>$too much$</div>
            </div>
            <div class = "border-2 border-red-600 bg-red-200 rounded-lg p-6 m-2 w-1/6">
                <div>Drink Sugar Level</div>
                <div>diabetic levels</div>
            </div>
        </div>
    )
}

export default Dashboard