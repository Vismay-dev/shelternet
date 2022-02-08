import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AOS from 'aos';
import "aos/dist/aos.css"
import RotateLoader from 'react-spinners/RotateLoader'


const AllShelters = (props) => {
  const [shelters, setShelters] = useState([]);


  useEffect(() => {
    AOS.init({
      duration : 1600
    });
  }, []);

  let [loading, setLoading] = useState(false);
  useEffect(()=> {
    setLoading(true)

    setTimeout(()=> {
      setLoading(false)
    },500)


  },[])



    const history = useHistory()
    useEffect(()=> {
      if(shelters.length==0){
        axios.post(process.env.NODE_ENV==='production'?'https://codex-shelternet.herokuapp.com/api/user/getshelters':'http://localhost:4000/api/user/getshelters',{token:sessionStorage.getItem('token')}).then(res=> {
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


    
    
        
            return (<>{!loading?
           <div class="bg-gradient-to-r from-white to-yellow-50 ">
          <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 class="text-4xl bottom-8 -mt-1 relative font-extrabold tracking-tight text-gray-900 text-center">Shelters/Agencies in UAE</h2>
        
            <div class="mt-9 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              
        
        
        
        
        
            {shelters?
shelters.map(shelter=> {return(
  <div data-aos="fade-up" data-aos-once='true' class="group relative mb-8 shadow-md pb-2 bg-slate-100">
          <div   class="w-full min-h-80 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80">
            <img  src={shelter.image} alt="Organization" class="w-full h-full object-center object-cover lg:w-full lg:h-full"/>
          </div>
          <div class="mt-4 flex justify-center">
            <div>
              <h3 class="text-md text-gray-700">
                <a class = 'hover:cursor-pointer'
                onClick = {()=>{selectShelter(shelter._id)}}>
                  <span aria-hidden="true" class="absolute text-xl inset-0 pl-2 text-center"></span>
                {shelter?shelter.name:''}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500 text-center">                      {shelter?shelter.location:''}
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
        </div>:<div class = 'bg-gradient-to-r from-white to-yellow-50 w-screen h-screen  justify-center align-middle pb-24'>
        <div class = 'mx-auto relative text-center top-1/2 '><RotateLoader  color={'#F5A623'} loading={loading} size={30} margin= {20}/>
        </div></div>
        }
            </>)
}

export default AllShelters;
