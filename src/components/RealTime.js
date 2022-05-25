/*
 * LightningChartJS example that showcases a simulated ECG signal.
 */
// Import LightningChartJS
import React, { useState, useEffect, useMemo  } from "react";
import {InfluxDB, Point} from 'https://unpkg.com/@influxdata/influxdb-client-browser/dist/index.browser.mjs'


const token =  "lfKYykGn6ZCmaGhG-Y3FOkjSJi5wMXRWK7F5vV-YLegKPXu3G9HtPJqYhAI-rpBvCAHEYIJRcEEqwee3OaWGPw==";
const org = "esi-sna";
const bucket = "test";
const url = "http://localhost:8086";
// |> aggregateWindow(every: 1s, fn: last, createEmpty: false)   |> range(start: -4s)   |> yield(name: "last")



let query = `from(bucket: "ecg")
|> range(start: -1h)
|> filter(fn: (r) => r["_measurement"] == "ecg")
|> filter(fn: (r) => r["_field"] == "value")
|>last()
  `;

export default function RealTime() {
const [data, setData] = useState([]);

useEffect(() => {
    let res = [];
    const influxQuery = async () => {
      //create InfluxDB client
      const queryApi = await new InfluxDB({url:"http://localhost:8086", token:"lfKYykGn6ZCmaGhG-Y3FOkjSJi5wMXRWK7F5vV-YLegKPXu3G9HtPJqYhAI-rpBvCAHEYIJRcEEqwee3OaWGPw==" }).getQueryApi("esi-sna");
      //make query
      await queryApi.queryRows(query, {
        next(row, tableMeta) {
        
          const o = tableMeta.toObject(row);
         //push rows from query into an array object
          res.push(o);

        },
        complete() {
          console.log("check res every 1s", res)

            var ecgF = []
          for(let i = 0; i < res.length; i++) {
            var tab = res[i]._value.substr(1,res[i]._value.length-2)
            tab = tab.split(',')
            for(let j=0; j<tab.length; j++){
            let point = {}
            point["x"] = res[i]._time
            point["y"] = tab[j]
            ecgF.push(point)
            
            }
           
          }  
          setData(ecgF);
          // console.log("last data", data)     
        //   console.log("last data", ecgF)
 
        },

        error(error) {
          console.log("query failed- ", error);
        }
      });
     
    };
    influxQuery();
}, [data]);
/*
 * LightningChartJS example that showcases a simulated ECG signal.
 */
// Import LightningChartJS

useEffect(() => {
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    AxisScrollStrategies,
    Themes
} = lcjs

// Import data-generators from 'xydata'-library.
const {
    createSampledDataGenerator
} = require('@arction/xydata')

// Create a XY Chart.
const chart = lightningChart().ChartXY({
    // theme: Themes.lightNew, 
}).setTitle('ECG')

// // Create line series optimized for regular progressive X data.
var series = chart.addLineSeries({
    dataPattern: {
        // pattern: 'ProgressiveX' => Each consecutive data point has increased X coordinate.
        pattern: 'ProgressiveX',
        // regularProgressiveStep: true => The X step between each consecutive data point is regular (for example, always `1.0`).
        regularProgressiveStep: true,
    }
 })
    // Destroy automatically outscrolled data (old data becoming out of scrolling axis range).
    // Actual data cleaning can happen at any convenient time (not necessarily immediately when data goes out of range).
    // .setMaxPointCount(10000)
    // .setMouseInteractions(false)

// // Setup view nicely.
chart.getDefaultAxisY()
    .setTitle('ECG F')
    .setInterval(0, 1)
    .setScrollStrategy(AxisScrollStrategies.expansion)

chart.getDefaultAxisX()
    .setTitle('milliseconds')
    .setInterval(0, 2500)
    .setScrollStrategy(AxisScrollStrategies.progressive)

 

// Points that are used to generate a continuous stream of data.

// Create a data generator to supply a continuous stream of data.

createSampledDataGenerator(data)
    .setSamplingFrequency(1)
    .setInputData(data)
    .generate()
    .setStreamBatchSize(48)
    .setStreamInterval(50)
    .setStreamRepeat(false)
    .toStream()
    .forEach(data => {
       
        // Push the created points to the series.
        series.add({ x: data.timestamp, y: data.data.y })
        
    })


}, []);

}
