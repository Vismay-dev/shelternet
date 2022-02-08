import AllShelters from "./AllShelters"
import Shelter from "./Shelter"
import Landing from './Landing'
import CreateShelter from './CreateShelter'
import {useState} from 'react'
import { BrowserRouter,Redirect, Route,Switch,Routes,useLocation, useHistory} from "react-router-dom"





const MainContent = ()=> {
    const [currentId, setCurrentId] = useState()
    const inject = (i) => {
        setCurrentId(i);
    }


    console.log(sessionStorage.getItem('token')?true:false)
return (

<>
<Switch>
    <Route path = '/home'><Landing/></Route>
  
    <Route path = '/shelters'><AllShelters injectShelter = {inject}/></Route>
   
        <Route path = '/shelter'><Shelter preID = {currentId}/></Route>


        <Route path = '/createshelter'><CreateShelter/></Route>


    <Route path = '/'><Redirect to = '/home'/></Route>

</Switch>


</>

)
}

export default MainContent