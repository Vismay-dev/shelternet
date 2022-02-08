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

    const baseUrl = process.env.PUBLIC_URL;



    console.log(sessionStorage.getItem('token')?true:false)
return (

<>
<Switch>
    <Route path = {baseUrl + '/home'}><Landing/></Route>
  
    <Route path =  {baseUrl + '/shelters'}><AllShelters injectShelter = {inject}/></Route>
   
        <Route path = {baseUrl+'/shelter'}><Shelter preID = {currentId}/></Route>


        <Route path = {baseUrl+'/createshelter'}><CreateShelter/></Route>


    <Route path = {baseUrl+'/'}><Redirect to = '/home'/></Route>

</Switch>


</>

)
}

export default MainContent