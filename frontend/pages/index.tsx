import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Fragment, useState,useEffect } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, PlusSmIcon } from '@heroicons/react/solid'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getAllUser } from "./api/profile";
const filters = [
  {
    id: 'color',
    name: 'Language',
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
  },
  // {
  //   id: 'category',
  //   name: 'Category',
  //   options: [
  //     { value: 'new-arrivals', label: 'All New Arrivals' },
  //     { value: 'tees', label: 'Tees' },
  //     { value: 'crewnecks', label: 'Crewnecks' },
  //     { value: 'sweatshirts', label: 'Sweatshirts' },
  //     { value: 'pants-shorts', label: 'Pants & Shorts' },
  //   ],
  // },
  // {
  //   id: 'sizes',
  //   name: 'Sizes',
  //   options: [
  //     { value: 'xs', label: 'XS' },
  //     { value: 's', label: 'S' },
  //     { value: 'm', label: 'M' },
  //     { value: 'l', label: 'L' },
  //     { value: 'xl', label: 'XL' },
  //     { value: '2xl', label: '2XL' },
  //   ],
  // },
]
function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}


const Home: NextPage = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [choice,setChoice]=useState(filters[0].options.map((option,index)=>{
    return (
      {[option.value]:false}
    )
  }))

  const onChangeChoice=(e:React.ChangeEvent<HTMLInputElement>,position:number)=>{
    const newLanguage=choice.map((item,index)=>
      index===position ? {[e.target.value]:!item[e.target.value]}:{...item})
      console.log(newLanguage)
      setChoice(newLanguage)
  }

const [profession,setProfession]=useState("student")

const onChangeProfession=(e:React.ChangeHandler<HTMLInputElement>)=>{
  setProfession(e.target.value)
}

  const getProfilesToShow=async(choice,signal:AbortSignal)=>{
    try {
      
      const data=await getAllUser(profession,choice,signal)
     console.log(data)
     if(data==undefined){
      return
     }
    // setProfile({...profile,name:data?.name,description:data?.description==null?"":data?.description})
    // if(data?.social===null){
    //   return
    // }
    // setSocialLink(data?.social)
    } catch (err) {
      console.log(err)
      let errorS=String(err)
      toast.error(errorS)
    }
  }
  useEffect(()=>{
  const controller = new AbortController();
  const signal=controller.signal
  getProfilesToShow(choice,signal)
  
  return ()=>{controller.abort()}
  },[choice,profession])

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                
                <form className="mt-4">
                  {filters.map((section) => (
                    <Disclosure as="div" key={section.name} className="border-t border-gray-200 pt-4 pb-4">
                      {({ open }) => (
                        <fieldset>
                          <legend className="w-full px-2">
                            <Disclosure.Button className="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="text-sm font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 h-7 flex items-center">
                                <ChevronDownIcon
                                  className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </legend>
                          <Disclosure.Panel className="pt-4 pb-2 px-4">
                           
                        
                  <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`${section.id}-${optionIdx}-mobile`}
                                    name={`${section.id}[]`}
                                    // defaultValue={option.value}
                                    value={option.value}
                                    
                                    onChange={(e)=>onChangeChoice(e,optionIdx)}
                                    type="checkbox"
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`${section.id}-${optionIdx}-mobile`}
                                    className="ml-3 text-sm text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </fieldset>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="border-b text-center border-gray-200 pb-10">
            <h className="text-4xl  font-extrabold tracking-tight text-gray-900">Find  Teammates</h>
            <p className="mt-4 text-base text-gray-500">
              Checkout out  all the Devlopers
            </p>
          </div>

          <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>

              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-sm font-medium text-gray-700">Filters</span>
                <PlusSmIcon className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </button>
                  
              <div className="hidden lg:block">
                <form className="divide-y divide-gray-200 space-y-10">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Profession
                  </label>
                  <select
                    // id="country"
                    name="profession"
                    value={profession}
                    onChange={onChangeProfession}
                    // autoComplete="country-name"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {/* <option>Unite</option> */}
                    <option value={"student"} >Student</option>
                    <option value={"working"} >Working</option>
                  </select>
                  {filters.map((section, sectionIdx) => (
                    <div key={section.name} className={sectionIdx === 0 ? undefined : 'pt-10'}>
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                        <div className="pt-6 space-y-3">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                value={option.value}
                                onChange={(e)=>onChangeChoice(e,optionIdx)}
                                type="checkbox"
                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <label htmlFor={`${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))}
                </form>
              </div>
            </aside>

            {/* Product grid */}
            <div className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
              {/* Replace with your content */}
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full" />
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
      {JSON.stringify(choice)}
    </div>
  )
}

export default Home
