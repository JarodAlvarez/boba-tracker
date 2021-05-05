import React, { Component } from 'react'
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default class SpendingChart extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: 'line',
            data: {
                labels: ['5 weeks ago', '4 weeks ago', '3 weeks ago', '2 weeks ago', 'Last week', 'This week'],
                datasets: [{
                    label: 'spending',
                    data: [
                        25,
                        20,
                        31.50,
                        11,
                        14,
                        21
                    ],
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