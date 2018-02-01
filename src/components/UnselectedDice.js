import React from 'react'
import '../App.css';

const UnselectedDice = (props) => {
    return (
      <div className={props.dice.value} onClick={() => props.select(props.dice)}>{props.dice.value}</div>
    )
}

export default UnselectedDice

