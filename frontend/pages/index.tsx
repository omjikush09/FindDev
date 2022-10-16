import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Fragment, useState,useEffect } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, PlusSmIcon } from '@heroicons/react/solid'
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'

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
      { value: "sql", label: 'SQL' },
      { value: "csharp", label: 'C#' },
    ],
  },
  {
    id: 'looking',
    name: 'Looking For',
    options: [
      { value: "hackathon", label: 'Hackathon' },
      { value: "competative_programing", label: 'Competative Programing' },
      { value: "dsa", label: 'Data structure and Algorithm ' },
     
    ],
  },
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
const people = [
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
]
function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}


const Home: NextPage = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [values,setValues]=useState({
    users:[],
    looding:false,

  })
  const {users,looding}=values
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

const onChangeProfession=(e:React.ChangeEvent<HTMLInputElement>)=>{
  setProfession(e.target.value)
}
// @ts-ignore
  const getProfilesToShow=async(choice,signal:AbortSignal)=>{
    try {
      
      const data=await getAllUser(profession,choice,signal)
     console.log(data)
     if(data==undefined){
      return
     }
     setValues({...values,looding:false,users:data})
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
    setValues({...values,looding:true})
  const controller = new AbortController();
  const signal=controller.signal
  getProfilesToShow(choice,signal)
  
  return ()=>{controller.abort()}
  },[choice,profession])


  const languagesToShow=(languages:any)=>{
    const list= new Array();
    for(const l in languages){
      if(languages[l]===true){
        list.push(l)
      }
    }
    return (list.map(i=>`   ${i} `))
  }


  return (
    <div className="bg-white">
      <div className="text-right mr-52 mt-8" > <Link href="/profile" ><button
        type="button"
        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >Profile</button></Link></div>
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
            <h1 className="text-4xl  font-extrabold tracking-tight text-gray-900">Find  Teammates</h1>
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
                    value={profession}// @ts-ignore
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
              
              {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full" /> */}
              {/* /End replace */}
              <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {users.length>0 && users.map((person:any) => (
        <li
          key={person?.id}
          className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div className="flex-1 flex flex-col p-8">
            <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"} alt="" />
            <h3 className="mt-6 text-gray-900 text-sm font-medium text-xl">{person?.name}</h3>
            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-gray-500 text-sm">{person.title}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
              Languages{` `}{` `}
                {person?.Language!=null && <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                {languagesToShow(person?.Language) }
                </span>       }
              </dd>
            </dl>
          </div>
          <div className="w-auto">
          {person?.description && person.description}
            </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="w-0 flex-1 flex">
                <a
                  href={`mailto:${person.email}`}
                  className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                >
                  {/* <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" /> */}
                  <span className="ml-3">Email</span>
                </a>
              </div>
              <div className="-ml-px w-0 flex-1 flex">
                { person?.social?.Github && 
                <a
                  href={`${person?.social?.Github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  {/* <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" /> */}
                  <span className="ml-3">Github</span>
                </a>}
              </div>
              <div className="-ml-px w-0 flex-1 flex">
                { person?.social?.Linkedin && 
                <a
                  href={`${person?.social?.Linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  {/* <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" /> */}
                  <span className="ml-3">LinkedIn</span>
                </a>}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
            </div>
          </div>
        </main>
      </div>
      {/* {JSON.stringify(choice)} */}
    </div>
  )
}

export default Home
