// import Profile from "../profile";
import { backend } from '../../config';

interface social{
    Github:string | "",
    Linkedin:string |""
  }
interface Profile {
    name:string | ""
    social:social 
    profession:string | ""
    description:string | ""
    availableFor:string | ""
    profile: FormData | undefined
} 

// type updateProfile=>(any)

export const updateProfile= async ({name="",social={Github:"",Linkedin:""},profession="",availableFor="",profile=undefined,description=""}:Profile) =>{
    try {
      
        const {data}= await backend.put<Profile>("/api/updateprofile",{name,social,profession,availableFor,profile,description})
        return data;

    } catch (error:any) {
        if(error.response?.data?.error){ 
            throw new Error(error.response.data.error)
        }
        throw new Error("Something went wrong") 
    }
}

export const getProfile= async (signal:AbortSignal) =>{
    try {
      
        const {data}= await backend.get("/api/getuser",{signal})
        return data;

    } catch (error:any) {
        console.log(error);
        if (error?.name== 'CanceledError'){
           return
        }
        if(error.response?.data?.error){ 
            throw new Error(error.response.data.error)
        }
        throw new Error("Something went wrong") 
    }
}

export const updateLanguage= async (language: {
    [x: string]: boolean;
}[]) =>{
    try {
        const body={};
        for(let i=0;i<language.length;i++){
            console.log(language[i])
          Object.assign(body,language[i]);
        }
        const {data}= await backend.post("/api/updatelanguage",{...body})
        return data;
    } catch (error:any) {
        console.log(error);
        if (error?.name== 'CanceledError'){
           return
        }
        if(error.response?.data?.error){ 
            throw new Error(error.response.data.error)
        }
        throw new Error("Something went wrong") 
    }
}
export const updateLooking= async (language: {
    [x: string]: boolean;
}[]) =>{
    try {
        const body={};
        for(let i=0;i<language.length;i++){
            console.log(language[i])
          Object.assign(body,language[i]);
        }
        const {data}= await backend.post("/api/looking",{...body})
        return data;
    } catch (error:any) {
        console.log(error);
        if (error?.name== 'CanceledError'){
           return
        }
        if(error.response?.data?.error){ 
            throw new Error(error.response.data.error)
        }
        throw new Error("Something went wrong") 
    }
}


export const getAllUser= async (profession:string,choice:{
    [x: string]: boolean;
}[],signal?:AbortSignal) =>{

    try {
        const body={};
        for(let i=0;i<choice.length;i++){
            console.log(choice[i])
            // @ts-ignore
            if(choice[i]===false){
                continue;
            }
          Object.assign(body,choice[i]);
        }
        const sendParam={}
        for (const value in body){
            // @ts-ignore
            if(body[value]===false){
                continue;
            }
            console.log(value)
            // @ts-ignore
            Object.assign(sendParam,{[value]:body[value]});
        }
        Object.assign(sendParam,{profession});
        console.log(sendParam)

        const {data}= await backend.get("/api/getallusers",{signal,params:sendParam})
        return data;

    } catch (error:any) {
        console.log(error);
        if (error?.name== 'CanceledError'){
           return
        }
        if(error.response?.data?.error){ 
            throw new Error(error.response.data.error)
        }
        throw new Error("Something went wrong") 
    }
}