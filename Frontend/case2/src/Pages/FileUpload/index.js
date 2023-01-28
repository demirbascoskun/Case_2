import { useState } from "react"
import { useNavigate } from "react-router-dom"
import spinner from '../../assets/images/spinner.gif'
import axiosInstance from "../../helper/global_axios"

export default function FileUploadPage() {
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [loading,setLoading]=useState(false)

    const uploadExcelFile = ()=>{
        axiosInstance.post('/main/files',{"file":file}).then((res)=>{
            navigate('/')
        }).catch((err)=>{
            console.log(err,'errupload')
        })
    }

    return (
        <div id="main_container" style={{justifyContent: "center", alignItems: "center", display: "flex" }}>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Add your excel file</h5>
                    <p className="card-text">After uploaded, you can see your excel file at Filter Page</p>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <input accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={(e) => {
                            setFile(e.target.files[0])

                        }} type={"file"} style={{ marginBottom: 10 }} />
                        {loading && 
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <img src={spinner} width={40} height={40} style={{ borderRadius: "50%" }} />
                        </div>
                        }
                        {!!file && <button onClick={uploadExcelFile} type="button" className="btn btn-success">Send</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}