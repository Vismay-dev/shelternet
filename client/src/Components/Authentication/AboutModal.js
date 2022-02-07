import dog from '../Nav/dog.png'



const AboutModal = (props) => {


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
        <h2 class="mt-6 mb-5 text-center text-3xl font-extrabold text-gray-900">
          About Us
        </h2>
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
    </div>
  </div>
    )
}

export default AboutModal