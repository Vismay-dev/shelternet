import { useRef, useEffect } from 'react'
import dog from '../Nav/dog.png'



const AboutModal = (props) => {

  const myRef = useRef()


  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!myRef.current || myRef.current.contains(event.target)) {
          return;
        }
        props.close();
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because the passed-in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [myRef, () => props.close()]
  );

  const modal = <div ref = {myRef} id = 'modal' data-aos="fade-up" data-aos-once='true' class="pr-6 z-50 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-12/12">
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
  <h2 class="mt-6 mb-5 text-center text-3xl font-extrabold text-gray-900">
    About Us
  </h2>

  <h3 class = 'text-center mt-2 relative pt-6 pb-3'>"Shelternet is a Non-Profit Organization which aims to make the pet adoption process in the UAE simpler and accessible to all. <br/><br/> As the co-founders of this platform, we were deeply moved when we came across an instagram post that reported a dog shelter shutting down. Many animals under the shelter's care were left homeless due to a lack of adoption and support. <br/><br/> Inspired by that incident, this website was created in the hope that fostered stray animals in shelters and adoption centers can get a new home and family." <br/><br/> - Vismay Suramwar and Saatvik Sharma, the Co-founders of Shelternet</h3>
</div>


  
</div>
</div>



          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
    <button onClick = {props.close} type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
      Close
    </button>
  </div>
</div>

  window.onclick = function(event) {
    }

    return (<div  class="fixed z-40 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div  class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay, show/hide based on modal state. */}
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
      {/* This element is to trick the browser into centering the modal contents. */}
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
      
        {/* Modal panel, show/hide based on modal state. */}
  {modal}
      
    </div>
  </div>
    )
}

export default AboutModal