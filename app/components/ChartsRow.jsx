'use client'

import { Sparklines,SparklinesLine,SparklinesReferenceLine } from "react-sparklines"

//Here I will be using the React-SparkLines package to create the 5day forecast

function Card ({ title, unit, data }) {
  const avg = data.length ? (data.reduce((a,b )=> a+b, 0)/data.length).toFixed(1): '-'
  return (
    <section>
      <div>
        <strong> {title}</strong> <span>({unit})</span>
      </div>

      {data.length ? (
        <Sparklines data={data} margin={6}>

          <SparklinesLine />
          <SparklinesReferenceLine type="avg" />

        </Sparklines>
      ): (
        <div>No Data</div>
      )}
      <div>avg: {avg} {unit} </div>
    </section>
  )
}

export default function ChartsRow({temps = [], pressures = [], humidities = []}){
  return (
    <div>
      <Card title="Temperature" unit="F" data={temps} />
      <Card title="Pressure" unit="hPa" data= {pressures}/>
      <Card title="HUmidity" unit="%" data= {humidities}/>
    </div>
  )
}