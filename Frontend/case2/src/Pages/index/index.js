import {  useLayoutEffect, useState } from 'react'
import fileicon from '../../assets/images/fileicon.png'
import axiosInstance from '../../helper/global_axios'

export default function IndexPage() {

    const [chosedFile, setChosedFile] = useState("")
    const [singleFileData, setSingleFileData] = useState([])
    const [chosedSalesRevenue, setChosedSalesRevenue] = useState({})
    const [filterData, setFilterData] = useState({})


    const [data, setData] = useState([])

    const handleChange = (e) => {
        let key = e.target.name
        let value = e.target.value
        setFilterData(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    const extractfilename = (value = " ") => {
        let index_of_certain_char = "excel_files"
        let new_index = value.indexOf(index_of_certain_char, "/")
        return value.slice(new_index + index_of_certain_char.length).substring(0, 15) + "..."

    }


    const getuploadedfiles = () => {
        axiosInstance.get('/main/files').then((res) => {
            setData(res.data)
        }).catch((err) => {
            console.log(err, 'errupload')
           
        })
    }

    useLayoutEffect(() => {
        getuploadedfiles()
    }, [])



    const getSingleExcelfile = (item) => {
        setChosedFile(item)
        axiosInstance.get('/main/files/' + item.id).then((res) => {
            setSingleFileData(res.data)

        }).catch((err) => {
            console.log(err, 'errupload')
        })
    }


    const getChoosedFileSalesRevenue = () => {
        let category = filterData.category
        let yearmonth = filterData.yearmonth
        let query = `?category=${category}&yearmonth=${yearmonth}`
        axiosInstance.get('/main/files/' + chosedFile.id + "/filter" + query).then((res) => {
            setChosedSalesRevenue(res.data)

        }).catch((err) => {
            console.log(err, 'errupload')
        })
    }

    return (
        <>
            <div id="main_container" >
                <h2 style={{ textAlign: "center" }}>Choose a file below</h2>
                <div style={{ display: "flex", width: "80%", justifyContent: "space-evenly", marginTop: 20, flexWrap: "wrap", overflow: "hidden", height: 200, margin: "0 auto" }}>
                    {data.length < 1 && <h1>No File !</h1>}
                    {data?.map((item) => {
                        return (
                            <div className='filesingle' onClick={() => {
                                getSingleExcelfile(item)
                            }} key={item.id} style={{ background: "white", margin: 5, width: 200, textAlign: "center", borderRadius: 15 }}>
                                <img src={fileicon} alt="" style={{ maxHeight: "80%", maxWidth: "80%" }} />
                                <div>{extractfilename(item.file)}</div>
                            </div>
                        )
                    })}
                </div>
                <div style={{ textAlign: "center", marginTop: 15, color: "white" }}>Chosen file name : {(chosedFile.file)}</div>
                <div style={{ display: "flex", width: "50%", justifyContent: "space-evenly", margin: "5% auto" }}>
                    <div style={{ flex: 1, marginRight: 10 }}>
                        <label style={{ width: "100%", textAlign: "center", borderBottom: "1px solid white", paddingBottom: 4, color: "white" }}>Choose Yearmonth</label>
                        <select name='yearmonth' onChange={handleChange} className="form-control select2">
                            <option>{!chosedFile ? "Select a file from above" : "Select"}</option>
                            {singleFileData?.yearmonth_unique?.map((yearmonth, index) => {

                                return(<option key={index} value={yearmonth}>{yearmonth}</option>)
                            })}
                        </select>
                    </div>
                    <div style={{ flex: 1, marginLeft: 10 }}>
                        <label style={{ width: "100%", textAlign: "center", borderBottom: "1px solid white", paddingBottom: 4, color: "white" }}>Category Level 3</label>
                        <select name='category' onChange={handleChange} className="form-control select2">
                            <option>{!chosedFile ? "Select a file from above" : "Select"}</option>
                            {singleFileData?.category_unique?.map((category, index) => {
                                return (<option key={index} value={category}>{category}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    {Object.keys(filterData).length >1 && (
                        <>
                            <label style={{ fontSize: 25, color: "white" }}>Mean : {chosedSalesRevenue?.sales_revenue_avarage}</label>
                            <label style={{ fontSize: 25, color: "white" }}>Sum : {chosedSalesRevenue?.sales_revenue_sum}</label>

                            <button onClick={getChoosedFileSalesRevenue} type="button" className="btn btn-info">Send</button>
                        </>
                    )
                    }

                </div>
            </div>
        </>
    )
}