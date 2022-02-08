import AOS from 'aos';
import "aos/dist/aos.css"
import { useEffect, useState } from "react";
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import dog from '../Nav/dog.png'

const RegModal = (props)=> {
    useEffect(() => {
        AOS.init({
          duration : 1000
        });
      }, []);

      const history = useHistory()

    


      //create state for sign up
      const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        username: "",
        repOfShelter:"",
        isShelter:false
      });


      const [errors, setErrors] = useState({
        error:''
      });


      const handleChange = (event) => {
       
        const { name, value } = event.target;
        if(event.target.name === "isShelter"){
            setUser({...user,isShelter:event.target.checked})
        }else {
          setUser({ ...user, [name]: value });
        }
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(user)

           axios.post(process.env.NODE_ENV==='production'?'https://codex-shelternet.herokuapp.com/api/user/register':'http://localhost:4000/api/user/register', user).then(res=> {
            console.log(res.data)
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('isShelter', user.isShelter);
            history.push(!res.data.user.isShelter?'/shelters':'/createshelter')

            props.close()

           }).catch(err=> {
             console.log({error:err.response.data.message})
             setErrors({error:err.response.data.message})
           })
        } 



    return (<div  class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div  class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay, show/hide based on modal state. */}
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    
        {/* This element is to trick the browser into centering the modal contents. */}
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    
        
          {/* Modal panel, show/hide based on modal state. */}
    
        <div data-aos="fade-up" data-aos-once='true' class="pr-6 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-12/12">
          <div class="bg-white px-4 pt-2 pb-2 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class=" text-center sm:mt-0 sm:ml-4 sm:text-left">   
                <div>
                  <p class="text-lg text-gray-500">
    
    
    {/* form starts here */}
                  <div class="right-2 min-h-full flex items-center justify-center py-3 px-7 sm:px-6 lg:px-5">
      <div class="max-w-md w-full space-y-8">
        <div>
        <img class="mx-auto h-12 w-auto scale-150" src={dog} alt="Workflow"/>
          <h2 class="mt-6 mb-5 text-center text-4xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form class="mt-20 top-1 space-y-6 mb-4" onSubmit = {handleSubmit}>
          <input class="text-md" type="hidden" name="remember" value="true"/>
          <div class="rounded-md shadow-sm -space-y-px ">
            <div>
              <label for="email-address" class="sr-only">Full Name</label>
              <input onChange = {handleChange} id="email-address" name="fullName" type="text"  required class="appearance-none rounded-none relative block w-full px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-md" placeholder="Full Name"/>
            </div>
            <div>
              <label for="password" class="sr-only">Email Address</label>
              <input onChange = {handleChange} id="password" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-2 mb-12 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-md" placeholder="Email Address"/>
            </div>
          </div>
          <div class="rounded-md shadow-sm -space-y-px ">
            <div>
              <label for="email-address" class="sr-only">Username</label>
              <input onChange = {handleChange} id="email-address" name="username" type="text"  required class="appearance-none rounded-none relative block w-full px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-md" placeholder="Username"/>
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input onChange = {handleChange} id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-2 mb-12 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-md" placeholder="Password"/>
            </div>
          </div>
          <div class="rounded-md shadow-sm -space-y-px ">
            <div class="flex items-center  bottom-3 relative mx-auto mb-4">
              <input onChange = {handleChange} id="remember-me" name="isShelter" type="checkbox" class="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"/>
              <label for="remember-me" class="ml-2 block text-base text-gray-900">
                Do you represent an animal shelter/agency?
              </label>
            </div>
            {user.isShelter?<> <div>
              <label for="password" class="sr-only">Password</label>
              <input onChange = {handleChange} id="password" name="repOfShelter" type="text"  required class="appearance-none rounded-none relative block w-full px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-md" placeholder="Name of Shelter/Agency"/>
            </div>
            
            <div>
            <label for="password" class="sr-only">Password</label>
            <input onChange = {handleChange} id="password" name="adminCode" type="text"  required class="appearance-none rounded-none relative block w-full px-2 mb-12 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-md" placeholder="Admin Code"/>
          </div></>:''}
           
          </div>
    
        
    
          <div>
            <button type="submit" class="mt-6 top-2 group relative w-full flex justify-center py-1 px-4 border border-transparent text-md font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-amber-500 group-hover:text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </span>
             Register
            </button>
          </div>
        </form>
      </div>
    </div>
    

                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick = {props.close} type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>)




   
    }
    
    export default RegModal