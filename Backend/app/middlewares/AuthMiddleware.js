import {DecodeToken} from "../utility/tokenUtility.js";

export default (req,res,next)=>{
    let token=req.headers['token']
    let decode=DecodeToken(token)
    if(decode===null){
        res.status(401).send({status:"fail",message:"No token found"})
    }
    else{
        //RETRIVE FROM TOKEN
        let email=decode.email;
        let user_id=decode.user_id;

        //Add  with request Header
        req.headers.email=email;
        req.headers.user_id=user_id;

        next()

    }
}