import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import { useHistory } from 'react-router-dom'
import {AiOutlineWarning} from 'react-icons/ai'
import axios from 'axios'
import { trusted } from 'mongoose'
import AOS from 'aos';
import RotateLoader from 'react-spinners/RotateLoader'
import "aos/dist/aos.css"

const Shelter = (props) => {
  const history = useHistory()
  const [shelter, setShelter] = useState()
  const [repName, setRepName] = useState()
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
    },600)

  },[])

  useEffect(()=> {
    if(sessionStorage.getItem('preID')){
  
      axios.post(process.env.NODE_ENV==='production'?'https://codex-shelternet.herokuapp.com/api/user/getshelteronid':'http://localhost:4000/api/user/getshelteronid',{token:sessionStorage.getItem('token'), id:sessionStorage.getItem('preID')}).then(res=> {
        setShelter(
          res.data.center
        )
        console.log(res.data.center)

        if(res.data.center){
          sessionStorage.setItem('isShelterCreated', true)

        }
    
      }).catch(err=> {
        console.log(err.response)
      })
      
    }else if(!shelter){

        axios.post(process.env.NODE_ENV==='production'?'https://codex-shelternet.herokuapp.com/api/user/getshelter':'http://localhost:4000/api/user/getshelter',{token:sessionStorage.getItem('token')}).then(res=> {
          setShelter(
            res.data.center
          )
          if(res.data.center){
            sessionStorage.setItem('isShelterCreated', true)

          }
        }).catch(err=> {
          console.log(err.response)
        })
        
      }
  },[sessionStorage])

const product = {
  name: '',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Shelters/Agencies' },
  
  ],
  image: 
   
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Organization',
    },
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
'Brand Description'  ,
highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  return (

    <div className="bg-white">
      {
        sessionStorage.getItem('isShelterCreated')!=='false'||sessionStorage.getItem('isShelterCreated')===null?

      <div className="pt-6" > 
    
        <nav aria-label="Breadcrumb">
          <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center hover:cursor-pointer">
                  <a class = 'hover:cursor-pointer' onClick = {
                    ()=> {history.push('/shelters')}
                  } className="mr-2  text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm  relative">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {shelter?shelter.name:''}
              </a>
            </li>
          </ol>
        </nav>

{sessionStorage.getItem('isShelter')==='true'? 
!sessionStorage.getItem('preID')||shelter&&sessionStorage.getItem('shelter')===shelter.name?<button data-aos="fade-up" data-aos-once='true'
type="submit"
onClick = {() => {history.push('/createshelter')}}
className="mb-2 w-1/6 ring-4 mx-auto bg-white border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-black hover:bg-amber-600 hover:text-white focus:outline-none ring-offset-2 ring-amber-600"
>
Edit Shelter/Agency Page
</button>:'': 
''}
     

        {/* Image gallery */}
        <div data-aos="fade-up" data-aos-once='true' className="mt-16 max-w-2xl mx-auto  lg:max-w-7xl px-80  mb-5  lg:grid lg:grid-cols-1 lg:gap-x-8">
          <div className="hidden aspect-w-3 aspect-h-3 rounded-lg overflow-hidden lg:block">
            <img
              src={shelter?shelter.image:''}
              alt={product.image.alt}
              className="w-full h-full object-center object-cover"
            />
          </div>
          
        
        </div>

        {/* Product info */}
        <div data-aos="fade-up" data-aos-once='true' className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight md:-mt-0 -mt-12 md:mb-0 mb-10  md:text-left text-center text-gray-900 sm:text-3xl">{shelter?shelter.name:''}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">{product.price}</p>

        
          <h3 class = 'text-2xl mb-7 relative top-2 font-bold text-center'>Representative</h3>
          <h3 class = 'text-center text-xl font-semibold mt-5 -mb-3'>{shelter?shelter.fullName:''}</h3>
          <h3 class = 'text-center text-md mt-3 mb-12'>{shelter?shelter.repPosition:''}</h3>


          <h3 class = 'text-2xl font-bold text-center  mb-3 md:top-0 -top-6 relative'>Contact Details</h3>
          <h3 class = 'text-sm md:mt-5 mt-2 text-center md:top-0 -top-6 relative'>Email Address: {shelter?shelter.email:''}</h3>
          <h3 class = 'text-sm text-center md:top-0 -top-6 md:mb-0 -mb-7 relative'>Mobile/Landline Number: {shelter?shelter.contact:''}</h3>


            

             
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base md:text-left text-center text-gray-900">{shelter? shelter.desc.replace('/n','&#10;'):''}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium md:text-left text-center text-gray-900">Steps to Adopt</h3>

              <div className="mt-4 md:text-left text-center">
               {shelter?shelter.steps.replace('/n','&#10;'):''}
              </div>
            </div>

            <div className="mt-10">
              

              <button
                type="submit"
                onClick = {shelter?()=> {
                  window.open(shelter.site, '_blank')}:()=>{}}
                className="mt-14 md:-mb-10 -mb-4 w-1/3 ring-4 mx-auto bg-white border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-black hover:bg-amber-600 hover:text-white focus:outline-none ring-offset-2 ring-amber-600"
              >
                Apply to Adopt
              </button>
            </div>
          </div>
        </div> 
         </div>
         :   <><div class = 'h-screen w-screen bg-gradient-to-r  -mb-36 from-white to-yellow-100'><AiOutlineWarning class = 'text-center text-7xl mx-auto relative top-52'/><br/><h2 class = ' top-52 text-4xl mb-80  font-semibold text-center relative'>A Shelter Has Not Been Created</h2></div></> }    
  </div>          
  
  
  
              
  )}

    export default Shelter