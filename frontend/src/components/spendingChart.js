import React, { Component } from 'react'
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default class SpendingChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            bobas: []
        };
    }

    chartRef = React.createRef();

    componentDidMount() {
        var date_spendings = [];

        fetch("http://localhost:3010/v0/boba")
            .then(res => res.json())
            .then(
                (result) => {
                    for(var i in result) {
                        var date = new Date(result[i].purchase_date);
                        var index = Number(date.getDay());
                        date_spendings[index] = result[i].price;
                    }
                    this.setState({
                        isLoaded: true,
                        bobas: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )


        const myChartRef = this.chartRef.current.getContext("2d");
        console.log(date_spendings);
        new Chart(myChartRef, {
            type: 'line',
            data: {
                labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                datasets: [{
                    label: ' $ Spending',
                    // data: [
                    //     25,
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
                    borderWidth: 0.5,
                    borderColor: '#777',
                    pointBackgroundColor: '#2D0000',
                    pointRadius: 10,
                    pointHoverRadius: 10,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            min: 0
                        }
                    }]
                },
                title: {
                    display: true,
                    text: '$$ Spent on Boba',
                    fontSize: 25,
                },
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: '#000'
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                },
                tooltips: {
                    enabled: true
                }
            }
        });
    }
    render() {
        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}