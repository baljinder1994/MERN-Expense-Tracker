const mongoose=require('mongoose')

const expenseShema=new mongoose.Schema({
    amount:{type:Number,required:true},
    travelMode:{type:String,required:true},
    employeeName:{type:String,required:true},
    createdBy:{type:String,required:true},
    status:{type:String,required:true},
    travelDestination:{type:String,required:true},
    otherSpends:{type:String,required:true},
   category:{type:String,required:true},
   date:{type :Date, default: Date.now}
   
})

const Expense=mongoose.model('Expense',expenseShema)
module.exports=Expense