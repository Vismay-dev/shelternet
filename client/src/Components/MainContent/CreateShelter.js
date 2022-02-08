import { useState,useEffect } from "react"
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import AOS from 'aos';
import "aos/dist/aos.css"

const CreateShelter = () => {

  const [shelter, setShelter] = useState({
    //list object keys and values given in the form
    name: '',
    location: '',
    desc:'',
    contact: '',
    email: '',
    site: '',
    steps:'',
    repPosition:'',


  
  })

  useEffect(() => {
    AOS.init({
      duration : 1600
    });
  }, []);

  const [image,setImage] = useState()

  const data = new FormData();

  //create change handler
  const handleChange = (event) => {
    const { name, value } = event.target
      setShelter({ ...shelter, [name]: value });
  }

  const imageChange = (event) => {
    setImage(event.target.files[0])
  }

  //error state
  const [errors, setErrors] = useState({
    error:''
  })
  const [preShelter, setPreShelter] = useState()

  useEffect(()=> {
    
      axios.post(process.env.NODE_ENV==='production'?'https://codex-shelternet.herokuapp.com/api/user/getshelter':'http://localhost:4000/api/user/getshelter',{token:sessionStorage.getItem('token')}).then(res=> {
        setPreShelter(
          res.data.center
        )
        if(res.data.center){
          setShelter(res.data.center)
        }
        if(!res.data.center){
          sessionStorage.setItem('isShelterCreated', false)
        }
        console.log(res.data)
      }).catch(err=> {
        console.log(err.response)
      })

     
      
    
},[])

  //create submit handler
  const handleSubmit = (event) => {
    event.preventDefault();

    data.append('shelter', JSON.stringify(shelter))
    data.append('token', sessionStorage.getItem('token'))
    data.append('images',image)
    data.append('editing',preShelter?true:false)

    console.log(shelter)

    console.log(new File([image],'image'))
    

    axios.post(process.env.NODE_ENV==='production'?'https://codex-shelternet.herokuapp.com/api/user/createshelter':'http://localhost:4000/api/user/createshelter', data,{
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res=> {



    sessionStorage.setItem('shelter', shelter.name);
    sessionStorage.removeItem('preID');

      history.push('/shelter');
     }).catch(err=> {
       console.log(err.response.data)
       setErrors({error:err.response.data.message})
     })
  } 

  const history = useHistory()

  const [url,setUrl] = useState('')

  useEffect(()=> {
    if(image) {
      // const reader = new FileReader();
      // var urlNew;
      const objectUrl = window.URL.createObjectURL(image);
      // console.log(urlNew)

      setUrl(objectUrl)

    }

  },[image])
 


    return (
        <>
                    <h1 class = 'text-3xl text-center font-bold mt-10'>Save Details to {preShelter?'Edit':'Create'} Shelter</h1>
                    <div  class = 'container mx-auto mt-10 mb-20 border-t-2 border-b-2 rounded-md '>
                      
                    <form onSubmit = {handleSubmit}>

            <div>
        <div data-aos="fade-up" data-aos-once='true' className="md:grid md:grid-cols-3 md:gap-6 mx-auto relative border-amber-400 border-2 rounded-md pt-5 pr-5 pl-3 pb-6 ">
          <div className="md:col-span-1 ">
            <div className="px-24 sm:px-0">
              <h3 className="text-lg font-medium leading-6 mt-4 text-gray-900">Shelter/Agency Information</h3>
              <p className="text-sm text-gray-600 mt-4">
                This information will be displayed publicly. Kindly be careful.
                Your Organisation will be placed on the platform after approval.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 ">
              <div className="shadow-xl sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block  text-sm font-medium text-gray-700">
                        Name of Organisation
                      </label>
                      <input
                                            onChange = {handleChange}

                      required={!preShelter?true:false}
                        type="text"
                        name="name"
                        placeholder = {preShelter?preShelter.name:''}
                        id="email-address"
                        className="mt-1 border-2 border-gray-200 p-2 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm  rounded-md"
                      />
                    </div>
                  <div class = 'col-span-6'>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      About
                    </label>
                    <div className="mt-1">
                      <textarea
                      onChange = {handleChange}
                      required={!preShelter?true:false}
                        id="about"
                        name="desc"

                        rows={3}
                        className="shadow-sm  p-2 focus:ring-amber-500 focus:border-amber-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="you@example.com"
                        defaultValue={preShelter?preShelter.desc:''}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description of your organization.
                    </p>
                  </div>
                    <div className="col-span-6">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Where can users apply for Animal Adoption?
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          http://
                        </span>
                        <input
                                              onChange = {handleChange}

                        required={!preShelter?true:false}
                          type="text"
                          name="site"
                          placeholder = {preShelter?preShelter.site:''}

                          id="company-website"
                          className="border-2 border-gray-200 focus:ring-amber-500 focus:border-amber-500 flex-1 block w-full rounded-none rounded-r-md p-2 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>



                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      What are the steps users can take to apply for adoption?
                    </label>
                    <div className="mt-1">
                      <textarea
                                            onChange = {handleChange}

                      required={!preShelter?true:false}
                        id="about"
                        name="steps"
                        placeholder = {preShelter?preShelter.steps:`- Step 1
- Step 2 
- Step 3 ....`}

                        rows={3}
                        className="shadow-sm  p-2 focus:ring-amber-500 focus:border-amber-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        defaultValue={''}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Kindly enter this information in pointers.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Address/Location
                    </label>
                    <div className="mt-1">
                      <textarea
                      required={!preShelter?true:false}
                      onChange = {handleChange}
                      placeholder = {preShelter?preShelter.location:''}

                        id="about"
                        name="location"
                        rows={3}
                        className="shadow-sm  p-2 focus:ring-amber-500 focus:border-amber-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        defaultValue={''}
                      />
                    </div>
                   
                  </div>

                 

                 

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Public Images (Upload a Photo that illustrates your Organisation - Logo Recommended)</label>
                    <div className="mt-1 flex justify-center px-6 pb-8 pt-1 border-2 border-gray-300 border-dashed rounded-md">
                      <div className={`space-y-1 text-center relative ${shelter||preShelter?  'top-3' : ''}`}>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className={`relative ${preShelter&&preShelter.image||image?'w-40 pl-0 pr-11 text-center':''} cursor-pointer bg-white rounded-md font-medium ${preShelter&&preShelter.image||image?'text-green-600 hover:text-green-500 focus-within:ring-green-500':'text-amber-600 hover:text-amber-500 focus-within:ring-amber-500'} focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 `}
                          >
                            {preShelter&&preShelter.image||image?<span class = 'relative left-5'>Image Uploaded (Click to Change)</span>:<span>Upload an Image</span>}
                            <input onChange = {imageChange} required={!preShelter?true:false} id="file-upload" accept="image/*" name="images" type="file" className="sr-only" />

                          </label>
                         {preShelter&&preShelter.image||image?'':
                          <p className="pl-1">or drag and drop</p>}
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>

                        
                      </div>
                     { preShelter||shelter||image?<img class = ' scale-50 w-40 h-40 -mb-14 bottom-5 -mr-8 mt-2 relative' src = {image?url:preShelter&&preShelter.image||shelter&&shelter.image}></img>:''}
                    </div>
                  </div>
                </div>
               
              </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div data-aos="fade-up" data-aos-once='true' className="mt-10 sm:mt-0 border-amber-400 border-2 rounded-md pt-5 pr-5 pl-3 pb-6 ">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Representative - Public Information</h3>
              <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 ">
              <div className="shadow-xl overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    
                  <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                                            onChange = {handleChange}
                                            placeholder = {preShelter?preShelter.fullName:''}

                      required={!preShelter?true:false}
                        type="text"
                        name="fullName"
                        id="email-address"
                        className="border-2 border-gray-200 mt-1  p-2 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm  rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Contact No.
                      </label>
                      <input
                                            onChange = {handleChange}
                                            placeholder = {preShelter?preShelter.contact:''}

                      required={!preShelter?true:false}
                        type="text"
                        name="contact"
                        id="email-address"
                        className="mt-1  p-2 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-2 border-gray-200 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                                            onChange = {handleChange}
                                            placeholder = {preShelter?preShelter.email:''}
                      required={!preShelter?true:false}
                        type="text"
                        name="email"
                        id="email-address"
                        className="mt-1  p-2 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-2 border-gray-200 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                       Your Position in the Organisation.
                      </label>
                      <input
                                            onChange = {handleChange}
                                            placeholder = {preShelter?preShelter.repPosition:''}

                      required={!preShelter?true:false}
                        type="text"
                        name="repPosition"
                        id="email-address"
                        className="mt-1  p-2 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-2 border-gray-200 rounded-md"
                      />
                    </div>

{/* 
                    <div class = 'relative right-52 mt-20'>
                    <label className="block text-md font-medium text-gray-700 left-4 relative">Photo</label>
                    <div className="mt-1 items-center">
                      <span className="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <input
                      onClick = {imageChange}
                      id="file-upload" accept="image/*" name="images" type="file"
                        className="ml-5 h-10 pr-0.5 text-center w-52 pl-2  hover:cursor-pointer relative right-20 mt-2 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                      >
                        
                      </input>
                    </div>
                  </div> */}
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    Save and Move to Shelter
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
</form>

      

     
      </div>
        </>

    )
}

export default CreateShelter
