import React, { useState } from 'react'
import axios from 'axios'
const AddExpense = ({onAdd}) => {
    const[amount,setAmount]=useState('')
    const[travelMode,setTravelMode]=useState('')
    const[employeeName,setEmployeeName]=useState('')
    const[createdBy,setCreatedBy]=useState('')
    const[status,setStatus]=useState('')
    const[travelDestination,setTravelDestination]=useState('')
    const[otherSpends,setOtherSpends]=useState('')
    const[category,setCategory]=useState('')

    const handleSubmit= async (e) =>{
        e.preventDefault()
        const newExpense={
            amount,
            travelMode,
            employeeName,
            createdBy,
            status,
            travelDestination,
            otherSpends,
            category,
            date:new Date()

        }
        try{
            await axios.post('http://localhost:5000/expenses',newExpense)
           onAdd();

            setAmount('')
            setTravelMode('')
            setEmployeeName('')
            setCreatedBy('')
            setStatus('')
            setTravelDestination('')
            setOtherSpends('')
            setCategory('')

        }catch(error){
            console.error('Error adding expense',error)
        }
    }

  return (
    <>
   <form onSubmit={handleSubmit} className='add-expense-form'>
        <input type="number" placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value) }required></input>
        <input type="text" placeholder='Travel Mode' value={travelMode} onChange={(e) => setTravelMode(e.target.value) }required></input>
        <input type="text" placeholder='Employee Name' value={employeeName} onChange={(e) => setEmployeeName(e.target.value) }required></input>
        <input type="text" placeholder='Created By' value={createdBy} onChange={(e) => setCreatedBy(e.target.value) }required></input>
        <input type="text" placeholder='Status' value={status} onChange={(e) => setStatus(e.target.value) }required></input>
        <input type="text" placeholder='Travel Destination' value={travelDestination} onChange={(e) => setTravelDestination(e.target.value) }required></input>
        <input type="number" placeholder='Other Spends' value={otherSpends} onChange={(e) => setOtherSpends(e.target.value) }required></input>
        <input type="text" placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value) }required></input>
        <button type="submit">Add Expense</button>
    </form>
   </>
  )
}

export default AddExpense
