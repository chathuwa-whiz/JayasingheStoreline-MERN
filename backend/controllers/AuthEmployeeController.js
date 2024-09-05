import Employee from '../models/EmployeeModel.js';
import bcryptjs from 'bcryptjs';

export const signup = async(req,res,next) => {

    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newEmployee = new Employee ({username,email,password:hashedPassword});

    try{
        await newEmployee.save();
        res.status(201).json('Employee Created Successfully ! ');
    }catch(error){
        next(error);
    }
    
};