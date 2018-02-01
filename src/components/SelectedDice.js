import React from 'react'
import '../App.css';

const SelectedDice = (props) => {

    return(
        <div className={props.dice.value} onClick={() => props.moveToUnselected(props.dice)}>{props.dice.value}</div>
    )
}

export default SelectedDice