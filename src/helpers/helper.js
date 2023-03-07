import jwt_decode from 'jwt-decode';
import instance from '../utils/baseUrl';




/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}


// make api request
export async function authenticate(username){
    try {
        return await instance.post('/user/authenticate',{username})
    } catch (error) {
        return {error : "Usrename doesn't exist"}
    }
}

//get user details     
export async function getUser({username}){
    try {
        const { data } = await instance.get(`/user/users/${username}`)
        return data
    } catch (error) {
        return { error : "Password doesn't match..!"}
    }
}

//register user function
export async function proceedToSignup(credentials){
    try {
        const { username,email } = credentials;
        const { data } =await instance.post('/user/verifySignup',{username,email})
        if( data ){
            const { data : {code} , status } = await instance.get('/user/generateOtp');
            if(status === 201){
                const { status ,data : { message } } = await instance.post('/user/createMail',{ username , userEmail:email })
                return Promise.resolve(message); 
            }
        }
        return Promise.resolve('Action cant perform write now.'); 
    } catch (error) {
        return Promise.reject(error)
    }
}

//login call

export async function login({username, password}){
    try {
        if(username){
            const { data } =await instance.post('/user/login',{username,password})
            console.log(data);
            return Promise.resolve({data })
        }
    } catch (error) {
        return Promise.reject(error )
    }
} 

//update user 

export async function updateUser(response){
    try {
        const token = await localStorage.getItem('token')
        const data = await instance.put('/user/update', response , { headers:{"Authorization":`Bearer ${token}`}})
        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({error:"Couldn't update user"})
    }
}

export async function generateOtp(username){
    try {
        const { data : {code} ,status} =await instance.get('/user/generateOtp',{params:{username}})
        if(status === 201){
            let { data:{ email } } = await getUser({username})
            let text = `Your password recovery otp is ${code}. Verify and recover your password.`;
            await instance.post('/user/createMail', {username,userEmail:email,text,subject : "Password Recovery"})
        }   
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({error:"Can't send otp"})
    }
}

export async function verifyOTP(code ,signupCredentials ){
    console.log(code,signupCredentials.username);
    try {
        await instance.get('/user/verifyOtp', { params : { code }}).then(async ()=>{
        const { data , status } =await instance.post('/user/signup',signupCredentials)
        return { data, status }
       })
    } catch (error) {
        return Promise.reject(error); 
    }
}

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await instance.put('/user/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}




