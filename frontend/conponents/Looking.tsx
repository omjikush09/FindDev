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
                                // onChange={(e)=>onChangeLanguage(e,optionIdx)}
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
        //   onClick={onSubmitLanguage}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
        </div>
            </form>
          </div>
        </div>
      </div>
)


}
}


export default Looking;