import mongoose from 'mongoose';

const addEmployeeSchema = new mongoose.Schema(
    {
        id:{
            type:Number,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        dob:{
            type:Date,
            required:true,
        },
        gender:{
            type:String,
            required:true,
        },
        contact:{
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
        dateOfJoin:{
            type:Date,
            required:true,
        },
        status:{
            type:String,
            required:true,
        },
        location:{
            type:String,
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
        emergencyContact:{
            type:Number,
            required:true,
        },
        qualifications:{
            type:String,
            required:true,
        },
        experience:{
            type:String,
            required:true,
        },
        nic:{
            type:String,
            required:true,
        },
        imageUrls:{
            type:Array,
            required:true,
        },

        
    },{timestamps:true}
)

const Add = mongoose.model('Add',addEmployeeSchema);

export default Add;