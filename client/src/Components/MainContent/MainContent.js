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
  
    <Route path = '/shelters'>{sessionStorage.getItem('token')!==null?<AllShelters injectShelter = {inject}/>:<Redirect to ='/'/>}</Route>
   
        <Route path = '/shelter'>{sessionStorage.getItem('token')!==null?<Shelter preID = {currentId}/>:<Redirect to ='/'/>}</Route>


        <Route path = '/createshelter'>{sessionStorage.getItem('token')!==null?<CreateShelter/>:<Redirect to ='/'/>}</Route>


    <Route path = '/'><Redirect to = '/home'/></Route>

</Switch>


</>

)
}

export default MainContent