import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AOS from 'aos';
import "aos/dist/aos.css"

const AllShelters = (props) => {
  const [shelters, setShelters] = useState([]);


  useEffect(() => {
    AOS.init({
      duration : 1600
    });
  }, []);



    const history = useHistory()
    useEffect(()=> {
      if(shelters.length==0){
        axios.post(process.env.NODE_ENV!=='production'?'http://localhost:4000/api/user/getshelters':'http://localhost:4000/api/user/getshelters',{token:sessionStorage.getItem('token')}).then(res=> {
          setShelters(res.data);        
      }).catch(err=> {
        console.log(err.response.data.message)
      })}


      
      
    },[])

    const selectShelter = (i) => {
      console.log(i)
      history.push('/shelter');
      props.injectShelter(i);
      sessionStorage.setItem('preID',i)
    }


    
    
        
            return (<>
           <div class="bg-white">
          <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 class="text-4xl bottom-8 -mt-1 relative font-extrabold tracking-tight text-gray-900 text-center">Shelters/Agencies in UAE</h2>
        
            <div class="mt-9 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              
        
        
        
        
        
            {shelters?
shelters.map(shelter=> {return(
  <div data-aos="fade-up" data-aos-once='true' class="group relative mb-8">
          <div   class="w-full min-h-80 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80">
            <img  src={shelter.image} alt="Organization" class="w-full h-full object-center object-cover lg:w-full lg:h-full"/>
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-md text-gray-700">
                <a class = 'hover:cursor-pointer'
                onClick = {()=>{selectShelter(shelter._id)}}>
                  <span aria-hidden="true" class="absolute text-xl inset-0"></span>
                {shelter?shelter.name:''}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">                      {shelter?shelter.location:''}
</p>
            </div>
            <p class="text-sm font-medium text-gray-900 top-1 relative"></p>
          </div>
        </div>)})
:
<></>
}  
        
        
        
        
        
        
        
        
        
        
        
        
        
        
            </div>
          </div>
        </div>
            </>)
}

export default AllShelters;