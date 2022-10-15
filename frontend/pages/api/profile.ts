import Axios from "axios";

// import Profile from "../profile";
import { backend } from '../../config';

interface social{
    github:string | ""
}
 
interface Profile {
    name:string | ""
    social:social | undefined
    profession:string | ""
    description:string | ""
    availableFor:string | ""
    profile: FormData | undefined
} 

// type updateProfile=>(any)

export const updateProfile= async ({name="",social=undefined,profession="",availableFor="",profile=undefined}:Profile) =>{
    try {
      
        const {data}= await backend.put<Profile>("/updateprofile",{name,social,profession,availableFor,profile})
        return data;

    } catch (error) {
        if(Axios.isAxiosError(error)){
            throw error.message;

        }else{
             throw  "An Expected Error";

        }
    }
}


