import { NextPage } from "next";
// import {Image} from "next/image";
import React ,{useState,useEffect}from "react";

// import styles from "../styles/Profile.module.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProfile, updateProfile,updateLanguage } from "./api/profile";
import Link from "next/link";

const Profile = () => {
  const filter= {
    id: 'color',
    name: 'Color',
    options: [
      { value: "cpp", label: 'C++' },
      { value: "java", label: 'Java' },
      { value: "javascript", label: 'JavaScript' },
      { value: "golang", label: 'Golang' },
      { value: "ruby", label: 'Ruby' },
      { value: "python", label: 'Python' },
      { value: "python", label: 'SQL' },
      { value: "csharp", label: 'C#' },
    ],
  }



  const [languages,setLanguages]=useState(filter.options.map((option,index)=>{
    return (
      {[option.value]:false}
    )
  }))
  
  // const [profession,setProfession]=useState("Student")
  const [socialLink,setSocialLink]=useState<social>({
    Github:"",
    Linkedin:""
  });
  const {Github,Linkedin} =socialLink
  const [profile,setProfile]=useState({
    name:"",
    description:"",
    availableFor:"hackathon",
    profession:"student"
  })
const {name,description,availableFor,profession}=profile

const onChangeProfile=(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>)=>{
  setProfile({...profile,[e.target.name]:e.target.value})
}

const onChangeLanguage=(e:React.ChangeEvent<HTMLInputElement>,position:number)=>{
  const newLanguage=languages.map((item,index)=>
    index===position ? {[e.target.value]:!item[e.target.value]}:{...item})
    console.log(newLanguage)
  setLanguages(newLanguage)
}
const onSubmitLanguage=async (e:React.FormEvent<HTMLButtonElement>)=>{
  e.preventDefault();
  try {
    
    await updateLanguage(languages)
    toast.success("Success fully saved the data")
  
  } catch (err) {
    console.log(err)
    let errorS=String(err)
    toast.error(errorS)
  }

}
const onChangeSocial=(e:React.ChangeEvent<HTMLInputElement> )=>{
  setSocialLink({...socialLink,[e.target.name]:e.target.value})
}

  // const [profession, setProfession] = React.useState<string |"">("student");
  // const [available,setAvailable]=React.useState<string |  "">("hackathon")
  const [image,setImage]=useState<FormData | undefined>(undefined);
  const onChangeImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
    let formdata=new FormData()
    console.log(e.target.value[0]);
    
    formdata.append("image",e.target.value[0])
    console.log(formdata.get("image"))
    setImage(formdata)
  }

const onSubmit=async (e:React.FormEvent<HTMLButtonElement>)=>{
  e.preventDefault();
  
  const Profile:Profile={name:name,profession,availableFor,social:socialLink,profile:image,description}
  console.log(Profile);
  try {
    await updateProfile(Profile)
    toast.success("Success fully saved the data")
  
  } catch (err) {
    console.log(err)
    let errorS=String(err)
    toast.error(errorS)
  }
}


const getProfileToShow=async(signal:AbortSignal)=>{
  try {
    const data=await getProfile(signal)
   console.log(data)
   if(data==undefined){
    return
   }
  setProfile({...profile,name:data?.name,description:data?.description==null?"":data?.description})
  if(data?.social===null){
    return
  }
  setSocialLink(data?.social)
  } catch (err) {
    console.log(err)
    let errorS=String(err)
    toast.error(errorS)
  }
}
useEffect(()=>{
const controller = new AbortController();
const signal=controller.signal
getProfileToShow(signal)

return ()=>{controller.abort()}
},[])
  return (
    <>
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
    Change Profile
   <div className="max-w-3xl mx-auto">
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
           
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form className="space-y-6" action="#" method="POST">
            
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-12 sm:col-span-6">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="first-name"
                    value={name}
                    required
                    onChange={onChangeProfile}
                    autoComplete="given-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                </div>
                {/* <div className="grid grid-cols-6 gap-6"> */}
                  <div className="col-span-12 sm:col-span-6">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Github url
                  </label>
                  <input
                    type="url"
                    name="Github"
                    id="github"
                    value={Github}
                    onChange={onChangeSocial}
                    required
                    // autoComplete="given-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                
                </div>
                {/* </div> */}
                <div className="col-span-12 sm:col-span-6">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    LindedIn url
                  </label>
                  <input
                    type="url"
                    name="Linkedin"
                    id="linkedin"
                    value={Linkedin}
                    onChange={onChangeSocial}
                    required
                    // autoComplete="given-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                
                </div>
              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  About
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="description"
                    rows={3}
                    value={description}
                    onChange={onChangeProfile}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Write about yourself"
             
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">Brief description for yourself. </p>
              </div>

              <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Profession
                  </label>
                  <select
                    // id="country"
                    name="profession"
                    value={profession}
                    onChange={onChangeProfile}
                    // autoComplete="country-name"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {/* <option>Unite</option> */}
                    <option value={"student"} >Student</option>
                    <option value={"working"} >Working</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Available For
                  </label>
                  <select
                    // id="country"
                    name="availableFor"
                    value={availableFor}
                    onChange={onChangeProfile}
                    // autoComplete="country-name"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {/* <option>Unite</option> */}
                    <option value={"hackathon"} >Hackathon</option>
                    <option value={"dsa"} >DSA</option>
                    <option value={"competative_programing"}>Competative Programing</option>
                  </select>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                <div className="mt-1 flex items-center space-x-5">
                  <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    
                    {/* <Image src={""} alt={"Image"} /> */}
                    {/* <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg> */}
                  </span>
                
                  <input
                    type="file"
                    // value={image}
                    name="image"
                    accept="image"
                    placeholder="Choose a image"
                    onChange={onChangeImage}
                    className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  />
                  
                 
                </div>
              </div> <div className="flex justify-end">
        <button
          type="button"
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={onSubmit}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
     
      </form>
    
              
           
          </div>
        </div>
      </div>

      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Choose Language</h3>
            <p className="mt-1 text-sm text-gray-500"></p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                        {filter.options.map((option, optionIdx:number) => (
                            <div key={optionIdx} className="flex items-center">
                              <input
                                // id={`${section.id}-${optionIdx}`}
                                // name={`${option.id}[]`}
                                
                                // defaultValue={option.value}
                                // checked={onChangeLanguage()}
                                value={option.value}
                                onChange={(e)=>onChangeLanguage(e,optionIdx)}
                                type="checkbox"
                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                            ))
                        }

             
              <div className="flex justify-end">
        <button
          type="button"
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={onSubmitLanguage}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
            </form>
          </div>
        </div>
      </div>


    </div>
</div>

</div>
        {JSON.stringify(languages)}
      {/* {JSON.stringify({name:name,profession,availableFor,social:socialLink,profile:image,description})} */}
      <ToastContainer/>
    </>
  );
};

export default Profile;


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
