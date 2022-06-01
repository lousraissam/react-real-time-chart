// /*
//  * LightningChartJS example that showcases a simulated ECG signal.
//  */
// // Import LightningChartJS
import React, { useState, useEffect,useRef, useMemo  } from "react";
// import {InfluxDB, Point} from 'https://unpkg.com/@influxdata/influxdb-client-browser/dist/index.browser.mjs'
import { lightningChart, AxisScrollStrategies,AxisTickStrategies, Themes, Axis, Color } from '@arction/lcjs'
import {createSampledDataGenerator,} from '@arction/xydata'
const { createProgressiveFunctionGenerator } = require('@arction/xydata')



// Import LightningChartJS
const RealTime = (props) => {
    const {data} = props
    const chartRef = useRef(undefined)


useEffect(() => {
// const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
// const {
//     lightningChart,
//     AxisScrollStrategies,
//     Themes
// } = lcjs

// Import data-generators from 'xydata'-library.
// const {
//     createSampledDataGenerator
// } = require('@arction/xydata')

// Create a XY Chart.
const chart = lightningChart().ChartXY({


    
    // container:id
    theme: Themes.lightNew, 
}).setTitle('ECG')
.setMouseInteractionsWhileScrolling(true)


// // Create line series optimized for regular progressive X data.
// const series = chart.addLineSeries(


//     {
//     dataPattern: {
//         // pattern: 'ProgressiveX' => Each consecutive data point has increased X coordinate.
//         pattern: 'ProgressiveX',
//         // regularProgressiveStep: true => The X step between each consecutive data point is regular (for example, always `1.0`).
//         regularProgressiveStep: true,
//     }
//  })
 chartRef.current = { chart }

    // Destroy automatically outscrolled data (old data becoming out of scrolling axis range).
    // Actual data cleaning can happen at any convenient time (not necessarily immediately when data goes out of range).
    // .setMaxPointCount(10000)
    // .setMouseInteractions(false)

// // Setup view nicely.
chart.getDefaultAxisY()
    .setTitle('ECG F')
    .setInterval(-6, 9)
    .setScrollStrategy(AxisScrollStrategies.expansion)

chart.getDefaultAxisX()
    .setTitle('milliseconds')
    .setInterval(0,3000)
    .setScrollStrategy(AxisScrollStrategies.progressive)
    .setTickStrategy(
    //     AxisTickStrategies.DateTime,
        (tickStrategy) => tickStrategy.setDateOrigin( new Date())
    )


    return () => {
        // Destroy chart.
        console.log('destroy chart')
        chart.dispose()
        chartRef.current = undefined
      }


}, [])


useEffect(() => {
    const DATA_FREQUENCY_HZ = 300

    const components = chartRef.current
    if (!components) return

    // Set chart data.
    console.log(data)
    // const { series } = components
    const { chart } = components
    const series = chart.addLineSeries(
            {
    dataPattern: {
        // pattern: 'ProgressiveX' => Each consecutive data point has increased X coordinate.
        pattern: 'ProgressiveX',
        // regularProgressiveStep: true => The X step between each consecutive data point is regular (for example, always `1.0`).
        regularProgressiveStep: true,
    },
    automaticColorIndex: 0
 }
    ).setMaxPointCount()





    // .setCursorInterpolationEnabled('nearestY')



    // chart.BeginUpdate();
    // chart.getDefaultAxisX().setInterval(0, 500).setScrollStrategy(AxisScrollStrategies.progressive)
    // series.add(data); 
    // chart.getDefaultAxisX().setScrollStrategy(AxisScrollStrategies.progressive).setInterval(-500, 0)

    // chart.EndUpdate(); 


    //     series.add(data)
    // const intervalQ = setInterval( () => {

    // console.log("befor loop", data)

    createProgressiveFunctionGenerator()
    .setStart(0)
    .setEnd(data.length)
    .setStep(1)
    // .setSamplingFrequency(1)
    // .setInputData()
    .generate()
    // .setStreamBatchSize(50)
    // .setStreamInterval(50)
    // .setStreamRepeat(false)
    // .toStream() 
    .toPromise()
    .then((a) => {
        // console.log("view data", data)
        // Push more data in each frame, while keeping a consistent amount of incoming points according to specified stream rate as Hz.
        let xPos = 0
        let tPrev = performance.now()
        let newDataModulus = 0
        const streamMoreData = () => {
            const tNow = performance.now()
            const tDelta = tNow - tPrev
            let newDataPointsCount = DATA_FREQUENCY_HZ * (tDelta / 1000) + newDataModulus
            newDataModulus = newDataPointsCount % 1
            newDataPointsCount = Math.floor(newDataPointsCount)
            const seriesNewDataPoints = []
            
                const nDataset = data
                // console.log('ndataset', nDataset)
                const newDataPoints = []
                for (let iDp = 0; iDp < newDataPointsCount; iDp++) {
                    const x = xPos + iDp
                    const iData = x % (nDataset.length - 1)
                    const y = nDataset[iData].y
                    // console.log("x", x, "y", y)
                    // console.log(typeof(y))
                    const point = { x, y }

                    newDataPoints.push(point)
                }
            
            series.add(newDataPoints,  )
            xPos += newDataPointsCount
    
            // Request next frame.
            tPrev = tNow
            requestAnimationFrame(streamMoreData)
        }

        // const intervalQ = setInterval( () => {
            streamMoreData();
        //   },1000)
        //   return () =>{
        //     clearInterval(intervalQ)
        //   }
    
        // 
    
    })
    // .forEach(data => {
    //     // Push the created points to the series.
    //          var now = new Date()


    //     series.add({x:data.timestamp, y:data.data.y})

    // })

    // console.log("teest")
    //  const axisX = chart.getDefaultAxisX()
 
    // //   if (start !== 300)
    //     axisX.setInterval(-300, 0, false, false)
    // })

    // chart.getDefaultAxisX().setScrollStrategy(AxisScrollStrategies.progressive).setInterval(-300,0,false,false)
   
// }, 1000)

// return () =>{
//     clearInterval(intervalQ)
//   }


    
    //  var now = new Date()
// console.log(data)
//     var now = new Date()
//     for(let i=0; i<data.length; i++){
//         series.add({x: i, y:data[i].y })
//         console.log(data[i].y)

//     }
  
    




    // return () => {
    //     // Destroy chart.
    //     console.log('destroy chart')
    //     chart.dispose()
    //     chartRef.current = undefined
    //   }
  }, [data, chartRef])
  return <div  className='chart'></div>
}
export default RealTime