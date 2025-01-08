import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../api"
import { useNavigate } from "react-router-dom"




export default function Home() {

    const navigate = useNavigate()
    const [docks, setDocks] = useState([])
    const [roomDeleted, setRoomDeleted] = useState(false)
    const [topics, setTopics] = useState([])


    async function getAllDocks() {
        try {
            const response = await api.get('/api/rooms/')
            setDocks(response.data)
            console.log(response.data)
            
        } catch (error) {
            console.log("ERROR: ", error)
        }
    }

    async function getAllTopics() {
        try {

            const response = await api.get(`/api/topics/`)
            
            setTopics(response.data)
            console.log("Server response: request valid\n", response.data);
                
            
        } catch (error) {
            console.error("=========== API request error ===========\n", error.message)
            // server error
        }

        
    }

    useEffect(()=>{
        getAllTopics()
    }, [])
    

    useEffect(()=>{
        getAllDocks()


    },[roomDeleted])


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





    return (
        <div className="h-[85%]">
            <h1>HOME</h1>

            <Link to='/home/create-dock' className="text-[30px] border">Dock +</Link>

            <div className="flex bg-gray-600 h-full">

                <div className="flex-1 w-[29%] h-[80%] bg-gray-500 p-5">
                    {topics.map((ele,index)=>(
                        <div key={index} className="mb-5 bg-gray-400 w-[60%] p-2">{ele.name}</div>
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
