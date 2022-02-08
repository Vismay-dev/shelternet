/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Popover, Transition } from '@headlessui/react'
import ContactModal from '../Authentication/ContactModal'
import AboutModal from '../Authentication/AboutModal'
import dog from './dog.png'
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
  UserGroupIcon
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import LogModal from '../Authentication/LogModal'
import RegModal from '../Authentication/RegModal'
import ExitModal from '../Authentication/ExitModal'
const solutions = [
  {
    name: 'About Us',
    description: "Learn More About Shelternet.",
    href: '#',
    icon: ViewGridIcon,
  }
]
const callsToAction = [
  // { name: 'Our Team', href: '#', icon: UserGroupIcon , action: 'contact' },
]
const resources = [

  {
    name: 'About Us',
    description: 'Learn about the significance of this platform!',
    icon: BookmarkAltIcon,
    action: 'about'
  }

]
const recentPosts = [
  { id: 1, name: 'Boost your conversion rate', href: '#' },
  { id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#' },
  { id: 3, name: 'Improve your customer experience', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function NavBar() {
  const history = useHistory()

    const [logModalShow, setLogModalShow] = useState(false)
    const [exitModalShow, setExitModalShow] = useState(false)
    const [contactModalShow, setContactModalShow] = useState(false)
    const [aboutModalShow, setAboutModalShow] = useState(false)

    const showModalLog = ()=> {
        setLogModalShow(true);}
    const showModalReg = ()=> {
        setRegModalShow(true);}
      const showModalOut = ()=> {
        setExitModalShow(true);}
        const showModalContact = ()=> {
          setContactModalShow(true);
          closeFuncAbout()}
          const showModalAbout = ()=> {
            setAboutModalShow(true);
            closeFuncContact()}
      

        const location = useLocation();


        const [regModalShow, setRegModalShow] = useState(false)


        const closeFuncLog = () => {setLogModalShow(false)}
        const closeFuncReg = () => {setRegModalShow(false)}
        const closeFuncOut = () => {setExitModalShow(false)}
        const closeFuncAbout = () => {setAboutModalShow(false)}
        const closeFuncContact = () => {setContactModalShow(false)}

        const buttonRef1 = useRef();
        const buttonRef2 = useRef();


  return (
      <>{
        logModalShow?
        <LogModal close = {closeFuncLog}/>
         :''
      }
       {
                regModalShow?
                <RegModal close = {closeFuncReg}/>
                 :''
              }
              {
                exitModalShow?
                <ExitModal close = {closeFuncOut}/>
                 :''
              }
               {
                contactModalShow?
                <ContactModal close = {closeFuncContact}/>
                 :''
              } {
                aboutModalShow?
                <AboutModal close = {closeFuncAbout}/>
                 :''
              }
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
       
        
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#" className = ' scale-150'>
              <span className="sr-only">Workflow</span>
              <span class = 'text-xl lg:visible invisible text-gray-600  font-semibold left-8 lg:top-1.5 relative lg:mr-3 -mr-20 inline'>Shelternet</span>
              <img
                className="h-8 w-auto sm:h-10 inline"
                src={dog}
                alt=""
              />
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-4 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          {sessionStorage.getItem('token')!==null?<>
          <div class = 'md:visible invisible space-x-10'>
           <a onClick = {()=> {
             history.push('/shelters')
           }}
           className="text-base font-medium hover:cursor-pointer text-gray-500 hover:text-gray-900">
           All Shelters
         </a>{sessionStorage.getItem('isShelter')==='true'?<>
         <a onClick = {()=> {

           if(location.pathname === '/shelter' && sessionStorage.getItem('preID')!==null){
            sessionStorage.removeItem('preID')
            window.location.reload();
           }else {
            sessionStorage.removeItem('preID')
            history.push('/shelter')
           }
          
        }} className="text-base font-medium text-gray-500 hover:cursor-pointer hover:text-gray-900">
        My Shelter
      </a>
      <a onClick = {()=> {
          history.push('/createshelter')
        }}
         className="text-base font-medium text-gray-500 hover:cursor-pointer hover:text-gray-900">
        {sessionStorage.getItem('isShelterCreated')==='false'?'Create Shelter':'Edit Shelter Details'}
      </a>
      
     
         </>
         :''
         }
   </div>
         </>
          :<Popover.Group  as="nav" className="hidden md:flex space-x-10">
           

         

            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
    
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group bg-white px-2 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
                    )}
                  >
                    <span  >Learn More</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel ref = {buttonRef1} className="absolute z-20 hover:cursor-pointer left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {resources.map((item) => (
                            <a
                              key={item.name}
                              onClick = {()=> {
                                showModalAbout()}}
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                            >
                              <item.icon className="flex-shrink-0 h-6 w-6 text-amber-600" aria-hidden="true" />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div  className="px-5 py-1 bg-gray-50 sm:px-8 sm:py-8">
                          <div>
                          {callsToAction.map((item) => (
                            <div key={item.name} className="flow-root">
                              <a
                              onClick = {showModalContact}
                              className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                              >
                                <item.icon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                                <span className="ml-3">{item.name}</span>
                              </a>
                            </div>
                          ))}
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {sessionStorage.getItem('token')===null?<>
            <a href="#" onClick = {showModalLog} className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
              Sign in
            </a>
            <a
            onClick = {showModalReg}
              href="#"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700"
            >
              Sign up
            </a></>:
            <a
            onClick = {showModalOut}
              href="#"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700"
            >
            Log Out
            </a>
           
          }</div>
       
        </div>
    
      </div>
    
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 z-30 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                 
                </div>
                <div className="-mr-2">
                  <Popover.Button ref={buttonRef1} className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {solutions.map((item) => (
                    <a
                    onClick = {()=> {
                      buttonRef1.current.click()
                      showModalAbout()}}
                      key={item.name}
                      href={item.href}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    >
                      <item.icon className="flex-shrink-0 h-6 w-6 text-amber-600" aria-hidden="true" />
                      <span className="ml-3 text-lg font-medium text-gray-900">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
             
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700"
                >
                  Sign up
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{' '}
                  <a href="#" className="text-amber-600 hover:text-amber-500">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
          
        </Popover.Panel>
      </Transition>
    </Popover>
    </>
  )
}
