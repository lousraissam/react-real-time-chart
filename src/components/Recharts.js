import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';

// const data = [
//     { x: 2, y: 81 },
//     { x: 3, y: 83 },
//     { x: 4, y: 88 },
//     { x: 5, y: 98 },
//     { x: 6, y: 92 },
//     { x: 7, y: 85 },
//     { x: 8, y: 73 },
//     { x: 9, y: 71 },
//     { x: 10, y: 70 },
//     { x: 11, y: 83 },
  
// ];

// export default class Recharts extends PureComponent {
const Recharts = (props) => {
    const {data} = props

    console.log('data from new component', data)



    return (
      <div style={{ width: '100%' }}>

        <ResponsiveContainer width="100%" height={600} >
          <LineChart
            width={500}
            height={200}
            data={data}
            // syncId="anyId"
            // margin={{
            //   top: 10,
            //   right: 30,
            //   left: 0,
            //   bottom: 0,
            // }}
          >
            <XAxis dataKey={data.timstamp} />
            <YAxis dataKey="y" />
            <Tooltip />
            <Line dataKey="y" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        
      </div>
    );
  
}
export default Recharts