import React,{useState} from "react"


const Looking=()=>{


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




return (
   


)


}
}


export default Looking;