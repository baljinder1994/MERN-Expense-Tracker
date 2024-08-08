import React, { useState,useEffect } from 'react'
import axios from 'axios'
const EditExpense = ({expense,onUpdate,onCancel}) => {
    const[amount,setAmount]=useState('')
    const[travelMode,setTravelMode]=useState('')
    const[employeeName,setEmployeeName]=useState('')
    const[createdBy,setCreatedBy]=useState('')
    const[status,setStatus]=useState('')
    const[travelDestination,setTravelDestination]=useState('')
    const[otherSpends,setOtherSpends]=useState('')
    const[category,setCategory]=useState('')

    useEffect(() =>{
     setAmount(expense.amount);
     setTravelMode(expense.travelMode)
     setEmployeeName(expense.employeeName)
     setCreatedBy(expense.createdBy)
     setStatus(expense.status)
     setTravelDestination(expense.travelDestination)
     setOtherSpends(expense.otherSpends)
     setCategory(expense.category)
    },[expense])

    const handleSubmit= async (e) =>{
        e.preventDefault()
        const updateExpense={
            amount,
            travelMode,
            employeeName,
            createdBy,
            status,
            travelDestination,
            otherSpends,
            category,
            date:new Date(expense.date)

        }
        try{
            await axios.put(`http://localhost:5000/expenses/${expense._id}`,updateExpense)
           onUpdate();

           

        }catch(error){
            console.error('Error updating expense',error)
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
        <button type="submit">Update </button>
        <button type="button" onClick={onCancel}>Cancel </button>
    </form>
   </>
  )
}

export default EditExpense
