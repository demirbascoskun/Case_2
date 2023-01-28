import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helper/global_axios"
import LoadingIndicator from "../../partials/custom_components/LoadingIndicator"


export default function Register() {

    let navigate = useNavigate();

    const [userData, setUserData] = useState({})
    const [error, setError] = useState([])
    const [loading,setLoading]=useState(false)

    let timer

    const handleChange = (e) => {
        let key = e.target.name
        let value = e.target.value
        setUserData(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    const showLoadingForaWhile = ()=>{
        timer=setTimeout(()=>{setLoading(false)},500)

    }

    const registerUser = () => {
        setLoading(true)
        axiosInstance.post('/account/register', userData).then((res) => {
            setError([])
            res.status == 201 &&  navigate('/login');  
        }).catch((err) => {
            showLoadingForaWhile()
            setError(err?.response.data.error || [err?.response.data.username?.error] )
        })
    }

    useEffect(()=>{return ()=>{clearTimeout(timer)}},[timer])


    return (
        <div id="login">
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <div id="login-form" className="form" >
                                <h3 className="text-center text-info">Register</h3>
                                <div className="form-group">
                                    <label htmlFor="username" className="text-info">Username:</label><br />
                                    <input  onChange={handleChange} type="text" name="username" id="username" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-info">Password:</label><br />
                                    <input  onChange={handleChange} type="password" name="password" id="password" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password2" className="text-info">Re-Password:</label><br />
                                    <input  onChange={handleChange} type="password" name="password2" id="password2" className="form-control" />
                                </div>
                                <div>
                                    {error?.map((error,index) => {
                                        return (
                                            <p key={index} style={{ color: "red" }}>{error}</p>
                                        )
                                    })}
                                </div>
                                <div className="form-group">
                                    {loading
                                    ?
                                    <LoadingIndicator style={{width:40,height:40,borderRadius:"50%"}}/>
                                    :
                                    <input onClick={registerUser} type="submit" name="submit" className="btn btn-info btn-md" value="Send" />
                                }
                                </div>
                                <div id="register-link">
                                    <a href="/login" className="text-info">Login Here</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}