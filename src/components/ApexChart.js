import React, { useState, useEffect } from "react";
import ApexCharts from 'apexcharts'
import ReactApexChart from "react-apexcharts";


class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
        //   data: data.slice()
        data: [
            { x: 2, y: 81 },
            { x: 3, y: 83 },
            { x: 4, y: 88 },
            { x: 5, y: 98 },
            { x: 6, y: 92 },
            { x: 7, y: 85 },
            { x: 8, y: 73 },
            { x: 9, y: 71 },
            { x: 10, y: 70 },
        ]
  
        
        }],
        options: {
          chart: {
            id: 'realtime',
            height: 350,
            type: 'line',
            animations: {
              enabled: true,
              easing: 'linear',
              dynamicAnimation: {
                speed: 1000
              }
            },
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Dynamic Updating Chart',
            align: 'left'
          },
          markers: {
            size: 0
          },
        //   xaxis: {
        //     type: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        //     // range: XAXISRANGE,
        //   },
          yaxis: {
            
          },
          legend: {
            show: false
          },
        },
      
      
      };
    }

  
    // componentDidMount() {
    //   window.setInterval(() => {
    //     // getNewSeries(data, {
    //     //   min: 10,
    //     //   max: 90
    //     // })
        
    //     ApexCharts.exec('realtime', 'updateSeries', [{
    //       data: this.state.series
    //     }])
    //   }, 1000)
    // }
  

    render() {
      return (
        

  <div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
</div>

      );
    }
  }


export default ApexChart
