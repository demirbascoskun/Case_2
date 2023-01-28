import {  useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import axiosInstance from "../../helper/global_axios";


export default function Login(){

    let navigate = useNavigate();


    const [userData, setUserData] = useState({})
    const [error, setError] = useState([])

    const handleChange = (e) => {
        let key = e.target.name
        let value = e.target.value
        setUserData(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    const loginUser = () => {
        axiosInstance.post('/account/token', userData).then((res) => {
            setError([])
            window.localStorage.setItem('user_token',res.data.token)
            navigate('/')
           
           
        }).catch((err) => {
            setError(err.response.data?.non_field_errors)
        })
        
    }
    return(
        <>
    
  
        <div id="login">
        <div className="container">
            
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <div id="login-form" className="form" >
                            <h3 className="text-center text-info">Login</h3>

                            <div className="form-group">
                                <label htmlFor="username" className="text-info">Username:</label><br/>
                                <input onChange={handleChange} type="text" name="username" id="username" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password:</label><br/>
                                <input onChange={handleChange} type="password" name="password" id="password" className="form-control"/>
                            </div>
                            <div>
                                    {error?.map((error,index) => {
                                        return (
                                            <p key={index} style={{ color: "red" }}>{error}</p>
                                        )
                                    })}
                                </div>
                            <div className="form-group">
                                <input onClick={loginUser} name="submit" className="btn btn-info btn-md" value="submit"/>
                            </div>
                            <div id="register-link">
                            <Link  to={"/register"}><h5>Register</h5></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}