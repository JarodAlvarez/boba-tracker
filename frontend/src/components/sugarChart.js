import React, { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { useAuth } from 'contexts/authContext'
Chart.register(...registerables)

const SugarChart = () => {
  const chartContainer = useRef(null)
  const [error, setError] = React.useState(null)
  const authContext = useAuth()
  const call =
    'http://localhost:3010/v0/boba/' + authContext.authContext.user.email
  var sug_spendings = [0, 0, 0, 0, 0]
  let newChartInstance = ''
  var chartStyle = {
    position: 'relative',
  }
  useEffect(() => {
    fetch(call)
      .then((res) => res.json())
      .then(
        (result) => {
          for (var i in result) {
            var date = new Date(result[i].purchase_date)
            /* Current Week Calculation adapted from spendingChart code */
            const today = new Date()
            const todayDate = today.getDate()
            const todayDay = today.getDay()
            const firstDayOfWeek = new Date(today.setDate(todayDate - todayDay))
            const lastDayOfWeek = new Date(firstDayOfWeek)
            lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6)
            firstDayOfWeek.setHours(0, 0, 0, 0)
            console.log(result[i])
            if (date >= firstDayOfWeek && date <= lastDayOfWeek) {
              if (result[i].sweetness == 0) {
                sug_spendings[0]++
              } else if (result[i].sweetness == 0.25) {
                sug_spendings[1]++
              } else if (result[i].sweetness == 0.5) {
                sug_spendings[2]++
              } else if (result[i].sweetness == 0.75) {
                sug_spendings[3]++
              } else if ((result[i].sweetness = 1)) {
                sug_spendings[4]++
              }
            }
          }
          newChartInstance.update()
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error)
        }
      )

    const chartConfig = {
      responsive: true,
      //maintainAspectRatio: false,
      type: 'bar',
      data: {
        labels: ['0%', '25%', '50%', '75%', '100%'],
        datasets: [
          {
            label: 'Total Sugar Level Counts for this Week',
            data: sug_spendings,
            backgroundColor: ['rgba(236, 220, 194, 0.7)'],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 3,
          },
        ],
      },
    }

    if (chartContainer && chartContainer.current) {
      newChartInstance = new Chart(chartContainer.current, chartConfig)
    }
  }, [chartContainer])

  return (
    <div class="chart-container">
      <canvas ref={chartContainer} style={chartStyle} />
    </div>
  )
}

export default SugarChart
