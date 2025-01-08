import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../api"
import { useNavigate, useSearchParams } from "react-router-dom"

import { Navigate } from "react-router-dom"

export default function Home() {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [docks, setDocks] = useState([])
    const [roomDeleted, setRoomDeleted] = useState(false)
    const [topics, setTopics] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [submitSearchQuery, setSubmitSearchQuery] = useState(false)




    async function getAllDocks() {
        try {
            const query = searchParams.get('query')
            
            let url = '/api/rooms/'
            
            if (query !== 'all' && query) {
                url += `?topic=${query}`
            }
            console.log("Final URL:", url)
            
            const response = await api.get(url)
            console.log(response.data)
            setDocks(response.data.results)
            
        } catch (error) {
            console.log("ERROR: ", error)
        }
    }

    async function getAllTopics() {
        try {

            const response = await api.get(`/api/topics/`)
            console.log("Server response: request valid\n", response.data);
            
            setTopics(response.data.results)
                
            
        } catch (error) {
            console.error("=========== API request error ===========\n", error.message)
            // server error
        }

        
    }

    useEffect(()=>{
        getAllTopics()
    }, [])
    

    useEffect(() => {
        getAllDocks()
    }, [roomDeleted, searchParams, submitSearchQuery])
    


    async function handleDockDelete(dockId) {

        try {

            const response = await api.delete(`/api/rooms/${dockId}/`)
            
            if (response.data.message === "successful") {
                console.log("Server response: request valid\n", response.data);
                setRoomDeleted(!roomDeleted)
            } else {
                console.log("Server response: request invalid\n", response.data);
            }
            
        } catch (error) {
            console.error("=========== API request error ===========\n", error.message)
            // server error
        }
    }

    function handleSearch(e) {
        e.preventDefault()
        navigate(`/home/?query=${searchValue}`)
        setSubmitSearchQuery(!submitSearchQuery)
    }



    return (
        <div className="h-[85%]">
            <h1>HOME</h1>


            <Link to='/home/create-dock' className="text-[30px] border">Dock +</Link>

            <div className="flex bg-gray-600 h-full">

                <div className="flex-1 w-[29%] h-[80%] bg-gray-500 p-5">

                    <form onSubmit={(e)=>handleSearch(e)}>
                        <input type="text" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
                        <button type="submit">Submit</button>
                    </form>
                    

                    <Link to={`/home`}>
                        <button className="mb-5 bg-gray-400 w-[60%] p-2">All</button>
                    </Link>

                    {topics.map((ele,index)=>(
                        <Link to={`/home/?query=${encodeURIComponent(ele.name)}`} key={index} >
                            <button className="mb-5 bg-gray-400 w-[60%] p-2">{ele.name}</button>
                        </Link>
                    ))}
                </div>

                <div className="flex flex-col gap-5 p-2 mx-20 flex-[5]">
                {docks.map((dock) => (
                    <div key={dock.id}  className="bg-gray-500 p-3 hover:cursor-pointer flex ">
                        
                        <div onClick={()=>navigate(`/home/dock/${dock.id}`)} className="flex-[8]" >
                            {dock.title} 
                            <small> Creator: {dock.creator?.username}</small>
                            <div>{dock.body}</div>
                        </div>
                        <div className="flex-1">
                            <button onClick={()=> handleDockDelete(dock.id)}>Delete</button>
                            <button onClick={()=>navigate('/home/update-dock', {state: docks.find((ele)=> ele.id === dock.id) }   )} >Update</button>

                        </div>

                    </div>
                    ))
                }


            </div>

            <div className="flex-1">
                asd
            </div>



            </div>

           
            



        </div>
    )
}
