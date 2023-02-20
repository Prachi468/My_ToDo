import React from 'react'
import './Card.css'

function Card(props) {
  return (
    <div className='card-maincontainer'>
      <div className='todo-card'>
        {props.title}
        <div className='card-button-container'>
          {props.isCompleted === false ? <button className='card-button' onClick={() => props.complete(props.id)}>Completed Tasks</button>:<></>}
          <button className='card-button' onClick={() => props.delete(props.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Card
