
//  validation of login form
import { toast } from "react-hot-toast";

export async function loginformValidate(values){
    const errors = usernameVerify({},values) && passwordVerify({},values)
    return errors;
}

export async function signupformValidation(values){
    const errors = usernameVerify({}, values) && emailVerify({},values) && passwordVerify({},values);
    return errors;
}

function emailVerify(error = {}, values){
    if(!values.email){
        error.email = toast.error("Email required...!");
    }
    return error;
}

function passwordVerify(error = {}, values){
    if(!values.password){
        error.password = toast.error("Password required...!")
    }else if(values.password.includes(" ")){
        error.password = toast.error("Invalid password...!")
    }else if(values.password.length < 6 ){
        error.password = toast.error("Password should contain atleast 6 characters ..!")
    }
    return error;
}

function usernameVerify(error = {}, values){
    if(!values.username){
        error.userName = toast.error("Username is required...!")
    }else if(values.username.length < 3){
        error.username = toast.error("Username should contain atleast 3 characters..!")
    }

    return error;
}