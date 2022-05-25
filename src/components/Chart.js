import React, { useState, useEffect } from "react";
// import { InfluxDB } from "@influxdata/influxdb-client";
import {InfluxDB, Point} from 'https://unpkg.com/@influxdata/influxdb-client-browser/dist/index.browser.mjs'

import { ResponsiveLine } from "@nivo/line";
import { Line } from "@nivo/line";


const token =  "lfKYykGn6ZCmaGhG-Y3FOkjSJi5wMXRWK7F5vV-YLegKPXu3G9HtPJqYhAI-rpBvCAHEYIJRcEEqwee3OaWGPw==";
const org = "esi-sna";
const bucket = "test";
const url = "http://localhost:8086";

let query = `from(bucket: "ecg")
  |> range(start: -1h)
  |> filter(fn: (r) => r["_measurement"] == "ecg")
  |> filter(fn: (r) => r["_field"] == "value")
  |> aggregateWindow(every: 1s, fn: last, createEmpty: false)
  |> yield(name: "last")`;


export default function Chart() {
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
          
          let finalData = []
 
          //variable is used to track if the current ID already has a key
          var exists = false

          //nested for loops aren’t ideal, this could be optimized but gets the job done
          for(let i = 0; i < res.length; i++) {
            var x = res[i]._time
            var y= res[i]._value

          console.log(`ecg de ${i}`, x + "value" , y)

              
            
          }
       
          setData(finalData);
       
      
        },

        error(error) {
          console.log("query failed- ", error);
        }
      });
     
    };

    influxQuery();
  }, []);

  return (
  <Line 
  width={1000}
  height={600}
  margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
  axisBottom={{
    orient: "bottom",
    tickSize: 0,
    tickPadding: 10,
    tickRotation: 0,
    tickValues: ["FI", "CM"]
  }}
  data={data}

  
   />
  )
};