import NavBar from './Components/Nav/NavBar'
import MainContent from './Components/MainContent/MainContent';
import Footer from './Components/Footer/Footer';
import { BrowserRouter,Redirect, Route,Switch,Routes,useLocation, useHistory} from "react-router-dom"

function App() {  

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <MainContent/>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
