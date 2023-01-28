import {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Header() {
    const navigate = useNavigate()
    const [userLoggedIn,setUserLoggedIn]=useState(false)



    useEffect(()=>{
        setUserLoggedIn(!!localStorage.getItem('user_token'))
    })

    const logout_user =()=>{
        window.localStorage.removeItem('user_token')
        navigate('/login')
    } 



    return (
        <nav style={{display:"flex",width:"100%",height:80,borderBottom:"1px solid white"}}>
          <div style={{flex:1,alignItems:"center",display:"flex",paddingLeft:15,justifyContent:"center"}}>
            <div style={{flex:0.8,display:"flex",justifyContent:"space-around"}}>
          <h4><a style={{textDecoration:"none",color:"white",}} href="/">Filter Page</a></h4>
          <h4><a  style={{textDecoration:"none",color:"white"}} href="/upload">Upload Excel</a></h4>
          </div>
        
          </div>
          <div style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center"}}>
          <h4>
            {userLoggedIn
            ? <button onClick={logout_user} style={{textDecoration:"none",color:"white",outline:"none",border:"none",background:"transparent"}}>Logout</button>
            : <a style={{textDecoration:"none",color:"white",outline:"none",border:"none",background:"transparent"}} href="/login">Login</a>
            }
            </h4>
          </div>

        </nav>
    )
}