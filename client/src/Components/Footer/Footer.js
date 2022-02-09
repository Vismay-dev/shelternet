
const Footer = () => {

    return (
        <footer className="px-4 lg:py-10 sm:py-3 pt-0 pb-3 bg-gradient-to-r from-amber-700 to-amber-600 opacity-80 dark:text-gray-100 md:-mb-80  relative -mt-10">
        <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:space-y-0">
            <div className="flex flex-row relative lg:top-0 sm:-top-3 top-0 lg:right-0  lg:mx-0 mx-auto space-x-4 sm:space-x-8">
                <ul className="flex flex-wrap items-center -mt-2 -top-1  left-2  space-x-4  sm:w-48 w-80 sm:space-x-8 relative lg:text-base lg:top-0 lg:pt-0 pt-1  text-center mx-auto    xs3:text-sm text-base">
                    <li>
                        <a href="#">Terms of Use</a>
                    </li>
                    <li>
                        <a href="#">Privacy</a>
                    </li>
                </ul>
            </div>  
                   {/* <br/> <div className="block text-md bottom-3 dark:text-coolGray-400 relative xs3:right-0 xs3:mt-0 xs3:mb-0 mb-2 mt-7 right-3">© Copyright 2022. All Rights Reserved.</div> */}
        </div>
        <p className = 'text-center text-sm top-4 mb-1 mt-1 relative dark:text-coolGray-400'>© Copyright 2022. All Rights Reserved.</p>
    </footer>
    )
}

export default Footer
