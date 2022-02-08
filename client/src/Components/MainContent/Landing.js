import aggregatorimg from './images/aggregator.jpg'
import AOS from 'aos';
import "aos/dist/aos.css"
import { useEffect, useState } from 'react';
import RegModal from '../Authentication/RegModal'
import AboutModal from '../Authentication/AboutModal'
import RotateLoader from 'react-spinners/RotateLoader'


const Landing = () => {

    
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
        },1000)
    
    
      },[])

      const [regModalShow, setRegModalShow] = useState(false)
      const [aboutModalShow, setAboutModalShow] = useState(false)
      const showModalReg = ()=> {
        setRegModalShow(true);}
        const showModalAbout = ()=> {
            setAboutModalShow(true);
}
      const closeFuncAbout = () => {setAboutModalShow(false)}
      const closeFuncReg = () => {setRegModalShow(false)}


    return (
        <>
         {
                regModalShow?
                <RegModal close = {closeFuncReg}/>
                 :''
              }
       {
                aboutModalShow?
                <AboutModal close = {closeFuncAbout}/>
                 :''
              }

              {!loading?
        <div class="w-full px-6 mb-16 mt-8 pt-2 relative bg-gradient-to-r ">
            <div data-aos="fade-up" data-aos-once='true' class="mt-8 relative rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 container mx-auto flex flex-col items-center pt-12 sm:pt-24 pb-24 sm:pb-32 md:pb-48 lg:pb-56 xl:pb-64">
               <img class="mr-2 lg:mr-12 mt-2 lg:mt-12 absolute right-0 top-0"  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg2.svg" alt="bg"/>
               <img class="ml-2 lg:ml-12 mb-2 lg:mb-12 absolute bottom-0 left-0" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg3.svg" alt="bg"/>
               
                <div class="w-11/12 sm:w-2/3 mb-5 sm:mb-16">
                    <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white font-bold leading-tight">Want to help a stray animal? We're the place!</h1>
                </div>
                <div class="flex justify-center items-center mb-10 sm:mb-20">
                    <button class="hover:text-white hover:bg-transparent lg:text-xl hover:border-white border bg-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-amber-700	focus:ring-white rounded text-amber-700 px-4 sm:px-8 py-1 sm:py-3 text-sm" onClick = {showModalReg}>Get Started</button>
                    <button class="hover:bg-white hover:text-amber-700 lg:text-xl hover:border-amber-600 ml-3 sm:ml-6 bg-transparent transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-amber-700 focus:ring-white hover:bg-indigo-700-800 rounded border border-white text-white px-4 sm:px-8 py-1 sm:py-3 text-sm" onClick = {showModalAbout}>Learn More</button>
                </div>
            </div>
            <div class="container mx-auto flex justify-center md:-mt-64 -mt-20 sm:-mt-40">
                <div data-aos="fade-up" data-aos-once='true' class="relative mb-14  rounded-md sm:w-2/3 w-11/12 shadow-md">
                    <img src={aggregatorimg} alt="Sample Page" role="img"  />
                </div>
            </div>
        </div>:<div class = 'bg-gradient-to-r from-white to-yellow-50 w-screen h-screen  justify-center align-middle pb-24'>
        <div class = 'mx-auto relative text-center top-1/2 '><RotateLoader  color={'#F5A623'} loading={loading} size={30} margin= {20}/>
        </div></div>}
    </>
    )
}

export default Landing