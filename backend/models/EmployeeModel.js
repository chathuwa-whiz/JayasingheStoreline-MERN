import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema({
    name: {type:String,required:true},
    description:{type:String,required:true},
    basicSalary:{type:Number,required:true},
    // image:{type:String,required:true},
    category:{type:String,required:true},
    dob:{type:String,required:true},
    nic:{type:String,required:true}
})

const employeeModel = mongoose.models.employee || mongoose.model("employee",employeeSchema)

export default employeeModel