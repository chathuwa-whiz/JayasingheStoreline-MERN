import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Employee Details
const employeeSchema = new Schema({
    empID:{
        type:String,
        required:true,
    },

    fullName:{
        type:String,
        required:true,
    },

    dateOfBirth:{
        type:Date,
        required:true,
    },

    gender:{
        type:String,
        required:true,
    },

    contactNumber:{
        type:Number,
        required:true,
    },

    email:{
        type:String,
        required:true,
    },

    address:{
        type:String,
        required:true,
    },

    jobTitle:{
        type:String,
        required:true,
    },

    employmentStatus:{
        type:String,
        required:true,
    },

    dateOfJoining:{
        type:Date,
        required:true,
    },

    basicSalary:{
        type:Number,
        required:true,
    },

    payrollDetails:{
        type:String,
        required:true,
    },

    skills:{
        type:String,
    },

    emergencyContactNumber:{
        type:Number,
        required:true,
    },

    notes:{
        type:String,
    },
});

const employee = mongoose.model("Employee", employeeSchema);
export default employee;