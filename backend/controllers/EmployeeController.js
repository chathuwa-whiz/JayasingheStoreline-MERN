import Employee from "../models/EmployeeModel.js";

//Display Employee
export const getAllEmployees = async(req,res,next)=>{
    //Get all employees
    try{
        const employees=await Employee.find();

        //Not Found
        if(!employees){
            return res.status(404).json({message:"Employee not found"});
        }

        //Display all employees
        return res.status(200).json({employees});
        
    }catch(err){
        console.log(err);
    }
};

//Insert Employee Profile
export const addEmployee = async(req,res,next)=>{
    const {empID,fullName,dateOfBirth,gender,contactNumber,email,address,jobTitle,employmentStatus,dateOfJoining,basicSalary,payrollDetails,skills,emergencyContactNumber,notes} = req.body;

    let employees;

    try{
        employees = new Employee({empID,fullName,dateOfBirth,gender,contactNumber,email,address,jobTitle,employmentStatus,dateOfJoining,basicSalary,payrollDetails,skills,emergencyContactNumber,notes});
        await employees.save();
    }catch(err){
        console.log(err);
    }

    //Not Insert employees
    if(!employees){
        return res.status(404).send({message:"Unable to add employee"});
    }
    return res.status(200).json({employees});
};

//Get by ID
export const getById = async(req,res,next)=>{

    const id=req.param.id;

    let employee;

    try{
        employee = await Employee.findById(id);
    }catch(err){
        console.log(err);
    }
    if(!employee){
        return res.status(404).send({message:"Employee Not Found"});
    }
    return res.status(200).json({employee});

};

//Update Employee Details
export const updateEmployee = async(req,res,next)=>{
    
    const id=req.param.id;
    const {empID,fullName,dateOfBirth,gender,contactNumber,email,address,jobTitle,employmentStatus,dateOfJoining,basicSalary,payrollDetails,skills,emergencyContactNumber,notes} = req.body;

    let employees;

    try{
        employees = await Employee.findByIdAndUpdate(id,{empID,fullName,dateOfBirth,gender,contactNumber,email,address,jobTitle,employmentStatus,dateOfJoining,basicSalary,payrollDetails,skills,emergencyContactNumber,notes});
        employees = await employees.save();
    }catch(err){
        console.log(err);
    }
    if(!employees){
        return res.status(404).send({message:"Employee Not Updated"});
    }
    return res.status(200).json({employees});
};

//Delete Employee
export const deleteEmployee = async(req,res,next)=>{
    const id = req.param.id;

    let employee;

    try{
        employee = await Employee.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }
    if(!employee){
        return res.status(404).send({message:"Employee Not Deleted"});
    }
    return res.status(200).json({employee});
};