const express=require('express')
const router=express.Router()
const Expense=require('../models/expense')

router.get('/',async(req,res) =>{
    try{
        const expenses=await Expense.find()
        res.json(expenses)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.post('/',async(req,res) =>{
    const expense=new Expense(req.body)
    try{
        const newExpense= await expense.save()
        res.status(201).json(newExpense)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

router.put('/:id',async(req,res) =>{
    try{
        const updatedExpense=await Expense.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(updatedExpense)
    }catch(err){
        res.status(400).json({message:err.message}
            
        )
    }
})


module.exports=router