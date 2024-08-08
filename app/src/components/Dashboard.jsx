import React, { useEffect, useState,useRef } from 'react'
import AddExpense from './AddExpense'
import axios from 'axios'
import {Bar,Pie,Line, Doughnut} from 'react-chartjs-2'
import EditExpense from './EditExpense'
import 'chart.js/auto'
const Dashboard = () => {
    const[data,setData]=useState([])
    const[editExpense,setEditExpense]=useState(null)
    const editFormRef=useRef(null)

   const fetchData = async () => {
       axios.get('http://localhost:5000/expenses')
       .then(response=> setData(response.data))
       .catch(error=> console.log(error))
   }
   useEffect(() =>{
    fetchData()
   },[])

   const handleEditClick=(expense) =>{
    setEditExpense(expense)
    if(editFormRef.current){
        editFormRef.current.scrollIntoView({behavior:'smooth'})
    }
    }

   const handleUpdate=() =>{
    fetchData();
    setEditExpense(null)
   }


   const getChartData = (field) => {
    const chartData=data.reduce((acc,curr)=>{
        acc[curr[field]]=(acc[curr[field]] || 0) + curr.amount
        return acc;
   },{})

  
   return{
    labels:Object.keys(chartData),
    datasets:[{
        label:`Sum of Amount by ${field}`,
        data:Object.values(chartData),
        backgroundColor:'rgba(75,192,192,0.6)'
    }]
   }
   }

   const getMonthlySummary=()=>{
    const monthlyData=data.reduce((acc,curr) =>{
        const date=new Date(curr.date)
        if(!isNaN(date)){
            const month=date.getMonth()
            acc[month]=(acc[month] || 0) + curr.amount
        }
        return acc;
    },{})
    return{
        labels:Object.keys(monthlyData).map(month => new Date(0,month).toLocaleString('default',{month:'short'})),
        datasets:[{
            label:'Monthly Expense Summary',
            data:Object.values(monthlyData),
            backgroundColor:'rgba(153,102,255,0.6'
        }]
    }
   }

   
   const getYearlySummary=()=>{
       const yearlyData=data.reduce((acc,curr) =>{
        const date=new Date(curr.date)
        if(!isNaN(date)){
            const year=date.getFullYear();
            acc[year]=(acc[year] || 0) + curr.amount
        }
        return acc;
       },{})
       return{
        labels:Object.keys(yearlyData),
        datasets:[{
            label:'Yearly Expense Summary',
            data:Object.values(yearlyData),
            backgroundColor:'rgba(255,99,132,0.6)'
        }]
       }
   }

   const getCategorySummary=()=>{
       const categoryData=data.reduce((acc,curr)=>{
        const category= curr.category;
        if(category){
            acc[category] =(acc[category] || 0) + curr.amount;
        }
        return acc
       },{})
       return{
        labels:Object.keys(categoryData),
        datasets:[{
            label:'Category Expense Summary',
            data:Object.values(categoryData),
             backgroundColor:'rgba(75,192,192,0.6)'
        }]
       }
   }
  
  return (
    <div>
        {editExpense ? (
            <div ref={editFormRef}>
            <EditExpense expense={editExpense} onUpdate={handleUpdate} onCancel={() => setEditExpense(null)}/>
           </div>
        ):(
<AddExpense onAdd={fetchData} />
        )}
    <div className='chart-container'>
     
      <div className='chart-item'><Bar data={getChartData('travelMode')}/></div>
      <div className='chart-item'><Bar data={getChartData('employeeName')}/></div>
      <div className='chart-item'><Bar data={getChartData('createdBy')}/></div>
      <div className='chart-item'><Bar data={getChartData('status')}/></div>
      <div className='chart-item'><Pie data={getChartData('travelDestination')}/></div>
      <div className='chart-item'><Pie data={getChartData('otherSpends')}/></div>
      <div className='chart-item'><Line data={getMonthlySummary()}/></div>
      <div className='chart-item'><Line data={getYearlySummary()}/></div>
      <div className='chart-item'><Doughnut data={getCategorySummary()}/></div>
      </div>
      <div>
        <h3>Expense List</h3>
        <ul>
            {data.map(expense =>(
                <li key={expense._id}>
                    {expense.amount} - {expense.category}
                    <button onClick={() =>handleEditClick(expense)}>Edit</button>
                </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
