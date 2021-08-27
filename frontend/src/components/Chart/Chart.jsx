import React, { useEffect } from 'react'
import {Bar, Pie, defaults } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubjects, getSubjectName } from '../../Redux/Action/action'

// defaults.global.tooltips.enabled = false
// defaults.global.legend.position = 'bottom'

const Chart = () => {
    const dispatch = useDispatch()
  
    useEffect(() => {
        dispatch(getSubjectName())
        dispatch(fetchSubjects())
      }, [])
      const subname = useSelector(state => state.store.subName)
      const subject =useSelector(state=>state.store.subject)

  return (
    <div>
      <Pie
        data={{
   
        labels: [...subname.map(x=>x.name)],
          datasets: [
            {
              label: 'number of students',
              data: [...subject.map(x=>x.student.length)],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
            // {
            //   label: 'Quantity',
            //   data: [47, 52, 67, 58, 9, 50],
            //   backgroundColor: 'orange',
            //   borderColor: 'red',
            // },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  )
}

export default Chart 