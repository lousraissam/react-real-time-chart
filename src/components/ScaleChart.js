import React, { Component } from 'react';
// import {StreamingPlugin, RealTimeScale } from 'chartjs-plugin-streaming';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, DatasetController } from 'chart.js'

// import {Chart} from 'chart.js';

import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
// import ChartStreaming from "chartjs-plugin-streaming"

// Chart.register(StreamingPlugin );
// Chart.register(ChartStreaming)
// Chart.register(RealTimeScale)
import ChartStreaming from "chartjs-plugin-streaming";
import { DateTimeTickStrategy } from '@arction/lcjs';
import { render } from '@testing-library/react';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

Chart.register(ChartStreaming);

const  ScaleChart = (props) => {
    const {data} = props
    console.log('data from new scalechart', data)
    // console.log("random",Math.random())
  var tab= ['0.005811760746964489', ' 0.06734924574214167', ' 0.75988793936386054']

    return (
      <Line
        data={{
          datasets: [ {
            label: 'Dataset 2',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            cubicInterpolationMode: 'monotone',
            fill: true,
            data: []
          }]
        }}
        options={{
          scales: {
            x: {
              type: 'realtime',
              realtime: {
              
                onRefresh: chart => {
                  chart.data.datasets.forEach(dataset => {
                      // console.log("datasetttttt",dataset.data)
                      for(let i=0;i<tab.length; i++ ){

                        let now = new Date()
                        console.log(now.getTime())

                    dataset.data.push({
                      x: i,
                      y: tab[i]
                      
                      
                    });
                  }
                  });
                }
              }
            }
          }
        }}
      />
    );
      }
  


export default ScaleChart;