import { backend } from "../../config";

type valuesSignin={
    email:string,
    password:string
}

type valuesSignup = valuesSignin & {
   name:string
}


export const signin=async (values:valuesSignin)=>{
    try {
        const {data}=await backend.post("api/signin",values)
        return data
    } catch (error:any) {
        if(error.response.data.error){            
            throw new Error(error.response.data.error)
        }
        throw new Error("Something went wrong") 
    } 
}
export const signup=async (values:valuesSignup)=>{
    try {
        const {data}=await backend.post("api/signup",values)
        return data
    } catch (error:any) {
        if(error.response.data.error){ 
            throw new Error(error.response.data.error)
        }
        throw new Error("Something went wrong") 
    } 
}