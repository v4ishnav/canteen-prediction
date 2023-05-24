import React from 'react'
import "./Card.css"
const Card = ({name,sale}) => {
  return (
    <div className='card'>
      <h3>{name}</h3>
      <h3>{sale}</h3>
    </div>
  )
}

export default Card
