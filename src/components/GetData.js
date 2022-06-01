import React, { useState, useEffect, useMemo  } from "react";
import {InfluxDB, Point} from 'https://unpkg.com/@influxdata/influxdb-client-browser/dist/index.browser.mjs';
import RealTime from "../components/RealTime";
import Recharts from "./Recharts";
import ScaleChart from "./ScaleChart";
import { render } from "@testing-library/react";


const token =  "lfKYykGn6ZCmaGhG-Y3FOkjSJi5wMXRWK7F5vV-YLegKPXu3G9HtPJqYhAI-rpBvCAHEYIJRcEEqwee3OaWGPw==";
const org = "esi-sna";
const bucket = "test";
const url = "http://localhost:8086";
// |> aggregateWindow(every: 1s, fn: last, createEmpty: false)   |> range(start: -4s)   |> yield(name: "last")



let query = `from(bucket: "ecg")
|> range(start: -110h)
|> filter(fn: (r) => r["_measurement"] == "ecg")
|> filter(fn: (r) => r["_field"] == "value")
|>last()
  `;

const  GetData = (props) => {
const [data, setData] = useState([]);
var ecgF = []
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
                  // const interval = setInterval(() => {

        complete() {
          let now = new Date()

            
          for(let i = 0; i < res.length; i++) {
            var tab = res[i]._value.substr(1,res[i]._value.length-2)
            tab = tab.split(',')
            for(let j=100; j<tab.length-100; j++){
            let point = {}
            point["x"] = res[i]._time
            point["y"] = tab[j]
            ecgF.push(point)
            
            }
          }  
        
          // const interval = setInterval(() => {
          setData(ecgF);

        // }, 1000)
          // console.log("last data", data)     
        //   console.log("last data", ecgF)
        // console.log("check res every 1s", data)
        // return () => {
        //   clearInterval(interval)
      
        // }
        },
        // }, 2000)

        error(error) {
          console.log("query failed- ", error);
        }
      });
     
    };
    const intervalQ = setInterval( () => {
      influxQuery();
    },1000)
    return () =>{
      clearInterval(intervalQ)
    }

},[data]);

return (
<div >
    <RealTime id='chart-1' data={data }/>
  </div>
)
}

export default GetData

