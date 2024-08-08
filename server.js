const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()
const expenseRoutes=require('./routes/expenses')
const PORT= 5000;


app.use(cors())
app.use(bodyParser.json())
app.use('/expenses',expenseRoutes)
mongoose.connect('mongodb://localhost:27017/expense',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})



app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`)
})