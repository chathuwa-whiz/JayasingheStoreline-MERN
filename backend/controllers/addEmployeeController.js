import Add from '../models/addEmployeeModel.js'

export const addEmployee = async(req,res,next)=>{
    try{
        const add = await Add.create(req.body);
        return res.status(201).json(add);
    }catch(error){
        next(error);
    }
};