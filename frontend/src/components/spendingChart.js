import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { useAuth } from 'contexts/authContext'
Chart.register(...registerables);


const SpendingChart = () => {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [bobas, setBobas] = React.useState([]);
    // const [dateSpendings, setDateSpendings] = React.useState([0,0,0,0,0,0,0]);
    const authContext = useAuth();
    const call = "http://localhost:3010/v0/boba/" + authContext.authContext.user.email;
    var date_spendings = [0,0,0,0,0,0,0];
    let newChartInstance = '';

    console.log("reloaded");
    useEffect(() => {
        fetch(call)
            .then(res => res.json())
            .then(
                (result) => {
                    for (var i in result) {
                        var date = new Date(result[i].purchase_date);
                        var index = Number(date.getDay());
                        date_spendings[index] = date_spendings[index] + result[i].price;
                    }
                    setIsLoaded(true);
                    console.log("set??");
                    // setDateSpendings(date_spendings);
                    setBobas(result);
                    newChartInstance.update();
                    console.log(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

        const chartConfig = {
            type: 'bar',
            data: {
                labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                datasets: [{
                    label: ' $ Spending',
                    // data: [
                    //     2,
                    //     20,
                    //     31.50,
                    //     11,
                    //     14,
                    //     21
                    // ],
                    data: date_spendings,
                    backgroundColor: [
                        'rgba(236, 220, 194, 0.7)'
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ],
                    borderWidth: 1
                }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: false
                            }
                        }
                    ]
                }
            }
        };


        if (chartContainer && chartContainer.current) {
            newChartInstance = new Chart(chartContainer.current, chartConfig);
            setChartInstance(newChartInstance);
            // newChartInstance.update();
        }
    }, [chartContainer]);

    const updateDataset = (datasetIndex, newData) => {
        chartInstance.data.datasets[datasetIndex].data = newData;
        chartInstance.update();
    };

    return (
        <div>
            <canvas ref={chartContainer} />
        </div>
    );
};

export default SpendingChart;
