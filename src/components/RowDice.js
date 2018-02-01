import React, { Component } from 'react'
import shuffle from 'shuffle-array'
import UnselectedDice from './UnselectedDice'
import SelectedDice from './SelectedDice'
import update from 'immutability-helper'

class RollDice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unselectedDice: [],
            selectedDice: [],
            rollCounter: 3,
            message: `3 rolls left`
        }
    }

    startRoll = () => {
        const sides = ['one','two','three','attack','energy','heart']
        const unselectedDice = []
        sides.map((obj,index) => {
            return unselectedDice.push({"id": index,"value":`${shuffle(sides)[0]}`})
        })
        this.setState({
            unselectedDice:unselectedDice, 
            selectedDice:[], 
            rollCounter: 2,
            message:`2 rolls left`
        })
    }

    select = (side) => {
        side.id++
        const selectedDice = this.state.selectedDice.concat([side])
        this.setState({selectedDice: selectedDice})
        const index = this.state.unselectedDice.findIndex(unselectedDice=> unselectedDice.id === side.id)
        this.setState({
            unselectedDice: update(this.state.unselectedDice, {$splice: [[index, 1]]})
        })
    }
    rollUnselectedDice = () => {
        const sides = ['one','two','three','attack','energy','heart']
        const unselectedDice = []
        this.state.unselectedDice.map((obj,index) => {
            return unselectedDice.push({"id": index++,"value":`${shuffle(sides)[0]}`})
        })
        const currentCounter = this.state.rollCounter
        if (this.state.rollCounter > 1) {
            this.setState({
                unselectedDice: unselectedDice,
                rollCounter: currentCounter - 1,
                message:`${this.state.rollCounter - 1} rolls left`
            })
        } else {
            const selectedDice = this.state.selectedDice.concat(unselectedDice)
            this.setState({
                unselectedDice: [],
                rollCounter: currentCounter - 1,
                selectedDice: selectedDice,
                message:`${this.state.rollCounter - 1} rolls left`
            })
        }
    }

    moveToUnselected = (side) => {
        const index = this.state.selectedDice.findIndex(unselectedDice => unselectedDice.id === side.id)
        this.setState({
            selectedDice: update(this.state.selectedDice, {$splice: [[index, 1]]}),
            unselectedDice: update(this.state.unselectedDice, {$unshift: [side]})
        })
    }

    renderGame() {
        if (this.state.rollCounter === 3) {
            return(
                <div className={"initialScreen"}>
                    <h1>Dice App For The Awesome King Of Tokyo Board Game</h1>
                    <p>Made in honor of Josh Allred</p>
                    <button onClick={this.startRoll}>Start A Round</button>
                </div>
            )
        } else {
            return(
                <div>
                    <div className={"newGame"}>
                        <button onClick={this.startRoll}>Start A New Round</button>
                        <h1>{this.state.message}</h1>
                    </div>
                    <div className={"unselectedContainer"}>
                        {this.renderUnselectedDice()}
                    </div>
                    <div className={"selectedContainer"}>
                        <h1>Selected Dice</h1>
                        {this.state.selectedDice.map(dice=>{
                            return(
                            <div className={"selectedDice"}>
                                <SelectedDice moveToUnselected={this.moveToUnselected} dice={dice} key={dice.id} />
                            </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    }

    renderUnselectedDice() {
        if (this.state.rollCounter > 0) {
            return (
                <div> 
                    <h1>Unselected Dice</h1>
                    <div className={"unselected"}>
                        <button className={"unselectedButton"} onClick={this.rollUnselectedDice}>Roll Unselected Dice</button>
                    </div>
                    {this.state.unselectedDice.map(dice=>{return(
                        <div className={"unselectedDice"}>
                            <UnselectedDice dice={dice} key={dice.id} select={this.select}/>
                        </div>
                    )})}
                    
                </div>
            )
        } else {
            return(
                <div><h1>You are out of rolls. Start New Game</h1></div>
            )
        }
    }

    render() {
        return(
            <div>
                {this.renderGame()}
            </div>
        )
    }
}

export default RollDice