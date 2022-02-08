import NavBar from './Components/Nav/NavBar'
import MainContent from './Components/MainContent/MainContent';
import Footer from './Components/Footer/Footer';
import RotateLoader from 'react-spinners/RotateLoader'
import { useEffect , useState} from 'react';

function App() {  

  let [loading, setLoading] = useState(false);
  useEffect(()=> {
    setLoading(true)

    setTimeout(()=> {
      setLoading(false)
    },2200)


  },[])

 

  return (
    <div className="App">
      <NavBar/>
      {!loading?<MainContent/>:<div class = ' bg-gradient-to-r from-white to-yellow-50 w-screen h-screen  justify-center align-middle pb-24'>
        <div class = 'mx-auto relative text-center top-1/2 right-1 '><RotateLoader  color={'#F5A623'} loading={loading} size={30} margin= {20}/>
        </div></div>}
      
      <Footer/>
    </div>
  );
}

export default App;
