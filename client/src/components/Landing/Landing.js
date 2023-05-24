import React, { useEffect, useState } from 'react'
import "./Landing.css"
import Card from '../Card/Card'
import axios from "axios"

const Landing = () => {
  const [sales, setSales] = useState(null)
  const [prediction, setPrediction] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/sales")
        setSales(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: `${sales} consider the above data set for sales for different dishes on different days. the values of each keys in the dictionary is of the form [sold ,total quantity made in the day] . Predict the number of dishes to be made tomorrow from the given data so that nothing is wasted and every customer is serviced and give the result as a dictionary with the given dishes as key and the total dishes to be made as value for the key. strictly return only the json without any comments and without changing the dishes in the data. the output should be of the format {
          "Chappathi": 43,
          "Idli": 25,
          "Poori": 32,
          "Idiyappam": 26,
          "Egg Curry": 20,
          "Masala Curry": 18,
          "Kadala Curry": 13,
          "Chicken Curry": 23,
          "Meals": 82,
          "Chicken Biriyani": 72
          } without changing the keys in the dictionary `
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const getPrediction = async () => {
      try {
        const response = await fetch('http://localhost:5000/prediction', options);
        const pred = await response.json();
        setPrediction(pred)
      } catch (error) {
        console.log(error);
      }
    }

    if (sales && !prediction) {
      getPrediction()
    }
  }, [sales, prediction])

  return (
    <div className='landing'>
      <div className='heading'>
        <h1>Food Demand Prediction</h1>
      </div>
      <div className='table' >
        <div className='table-heading'>
          <h3>Dish</h3>
          <h3>Expected Sales</h3>
        </div>
        <div className='card-container'>
          {prediction === null ? <h1>Loading...</h1> : (
            Object.entries(prediction).map(([name, sale]) => (
              <Card name={name} sale={sale} key={name} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Landing
