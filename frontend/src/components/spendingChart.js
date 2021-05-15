// import React, { Component } from 'react'
// import { Chart, registerables } from "chart.js";
// Chart.register(...registerables);

// const SpendingChart = () => {

//     const chartRef = React.createRef();

//     React.useEffect(() => {
//         var date_spendings = [];

//         fetch("http://localhost:3010/v0/boba")
//             .then(res => res.json())
//             .then(
//                 (result) => {
//                     console.log(result)
//                     for (var i in result) {
//                         var date = new Date(result[i].purchase_date);
//                         var index = Number(date.getDay());
//                         date_spendings[index] = result[i].price;
//                     }
//                     this.setState({
//                         isLoaded: true,
//                         bobas: result
//                     });
//                 },
//                 // Note: it's important to handle errors here
//                 // instead of a catch() block so that we don't swallow
//                 // exceptions from actual bugs in components.
//                 (error) => {
//                     this.setState({
//                         isLoaded: true,
//                         error
//                     });
//                 }
//             )


//         const myChartRef = chartRef.current.getContext("2d");
//         console.log(date_spendings);
//         new Chart(myChartRef, {
//             type: 'line',
//             data: {
//                 labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//                 datasets: [{
//                     label: ' $ Spending',
//                     data: [
//                         2,
//                         20,
//                         31.50,
//                         11,
//                         14,
//                         21
//                     ],
//                     data: date_spendings,
//                     backgroundColor: [
//                         'rgba(236, 220, 194, 0.7)'
//                     ],
//                     borderWidth: 0.5,
//                     borderColor: '#777',
//                     pointBackgroundColor: '#2D0000',
//                     pointRadius: 10,
//                     pointHoverRadius: 10,
//                 }]
//             },
//             options: {
//                 scales: {
//                     yAxes: [{
//                         display: true,
//                         ticks: {
//                             min: 0
//                         }
//                     }]
//                 },
//                 title: {
//                     display: true,
//                     text: '$$ Spent on Boba',
//                     fontSize: 25,
//                 },
//                 legend: {
//                     display: true,
//                     position: 'right',
//                     labels: {
//                         fontColor: '#000'
//                     }
//                 },
//                 layout: {
//                     padding: {
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         top: 0
//                     }
//                 },
//                 tooltips: {
//                     enabled: true
//                 }
//             }
//         });
//     })

//     return (
//         <div>
//             <canvas
//                 id="myChart"
//                 ref={chartRef}
//             />
//         </div>
//     )
// }

// export default SpendingChart

import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);


const chartConfig = {
    type: 'line',
    data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: ' $ Spending',
            data: [
                2,
                20,
                31.50,
                11,
                14,
                21
            ],
            // data: date_spendings,
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

const SpendingChart = () => {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(chartContainer.current, chartConfig);
            setChartInstance(newChartInstance);
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
