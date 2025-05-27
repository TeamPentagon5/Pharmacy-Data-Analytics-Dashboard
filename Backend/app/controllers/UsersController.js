import addnewModel from "../model/addnewModel.js";
import UsersModel from "../model/UsersModel.js";
import EmailSend from "../utility/emailUtility.js";
import { EncodeToken } from "../utility/tokenUtility.js";

export const Registration=async(req,res)=>{
    try{
        let reqBody=req.body;
        await UsersModel.create(reqBody)
        return res.json({status:"success","Message":"User registered successfully"})
    }catch(err){
return res.json({status:"failed","Message":err.toString()})
    }

}

export const Login = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await UsersModel.findOne(reqBody);

        if (data === null) {
            return res.json({ status: "failure", Message: "User does not exist" });
        } else {
            // Login success - Token Encode
            let token = EncodeToken(data['NIDNumber'], data['_id']);

            // Add user's name in response
            return res.json({
                status: "success",
                Token: token,
                user: { name: data.name }, // <-- Make sure `name` field exists in DB
                Message: "User login successful!"
            });
        }
    } catch (err) {
        return res.json({ status: "failed", Message: err.toString() });
    }
};


export const ProfileDetails=async(req,res)=>{
    try{
        let user_id=req.headers['user_id'];
        let data=await UsersModel.findOne({"_id":user_id})
        return res.json({status:"success","Message":"User registered successfully",data:data})
    }catch(err){
        return res.json({status:"failed","Message":err.toString()})
    }
}


export const ProfileUpdate=async(req,res)=>{

    try {
        let user_id=req.headers['user_id'];
        await UsersModel.updateOne({"_id":user_id},req.body)
        res.json({status:"success","Message":"User Update successfully"})
    }catch(err){
        return res.json({status:"failed","Message":err.toString()})
    }
}
export const Added = async (req, res) => {
    try {
        console.log(req.body);

        let reqBody = req.body;
        await addnewModel.create(reqBody);
        res.status(200).json({
            status: "success",
            Message: "Medicine added successfully",
        });
    } catch (err) {
        res.json({ status: "failed", Message: err.toString() });
    }
};


  export const getdate = async (req, res) => {
    try {
      let data = await addnewModel.find();
      return res.json({
        status: "success",
        Message: "Data fetched successfully",
        data: data,
      });
    } catch (err) {
      return res.status(500).json({ status: "failed", Message: err.toString() });
    }
  };



export const updateData = async (req, res) => {
    try {
        const { id } = req.params; // extract ID from URL
        const updatedData = req.body;

        const result = await addnewModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!result) {
            return res.status(404).json({ status: "failed", Message: "Data not found" });
        }

        res.status(200).json({
            status: "success",
            Message: "Data updated successfully",
            data: result,
        });
    } catch (err) {
        res.status(500).json({ status: "failed", Message: err.toString() });
    }
};


export const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await addnewModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ status: "failed", Message: "Data not found" });
        }

        res.status(200).json({
            status: "success",
            Message: "Data deleted successfully",
        });
    } catch (err) {
        res.status(500).json({ status: "failed", Message: err.toString() });
    }
};

export const EmailVerify=async(req,res)=>{

try{
    let email=req.params.email;
    let data=await UsersModel.findOne({email:email})
    if(data==null){
        return res.json({status:"failure","Message":"Email does not exist"})
    }
    else{
        let code=Math.floor(100000+Math.random()*900000)
        let EmailTo=data['eamil'];
        let EmailText="Your Code is"+code;
        let EmailSubject="Task manager varification code"
        await EmailSend(EmailTo,EmailText,EmailSubject)

        await UsersModel.updateOne({email:email},{otp:code})
        return res.json({status:"success","Message":"Email successfully"})
    }

}catch(err){
    return res.json({status:"failed","Message":err.toString()})
}
}
;

export const CodeVerify=async(req,res)=>{
    try {
        let email=req.params.email;
        let code=req.params.code;

        let data=await UsersModel.findOne({email: email,otp:code})
        if(data==null){
            return res.json({status:"fail","Message":"Wrong Verification Code"})
        }
        else {
            return res.json({status:"success","Message":"Verification successfully"})
        }
    }catch (e) {
        return res.json({status:"fail","Message":err.toString()})
    }
};



export const ResetPassword=async(req,res)=>{

    try {
        let reqBody=req.body;
        let data=await UsersModel.findOne({email: reqBody['email'],otp:reqBody['code']})
        if(data==null){
            return res.json({status:"fail","Message":"Wrong Verification Code"})
        }
        else {
            await UsersModel.updateOne({email: reqBody['email']},{
                otp:"0", password:reqBody['password'],
            })
            return res.json({status:"success","Message":"User ResetPassword successfully"})
        }
    }

    catch (err) {
        return res.json({status:"fail","Message":err.toString()})
    }

}





