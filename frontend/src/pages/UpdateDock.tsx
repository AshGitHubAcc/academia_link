import { useParams, useLocation, useNavigate } from "react-router"
import api from "../api"
import { useState } from "react"

export default function UpdateDock() {

    const navigate = useNavigate()
    const location = useLocation()
    const dockData = location.state

    const [dockInfo, setDockInfo] = useState({
        title: dockData.title,
        body: dockData.body,
    })
    const [error, setError] = useState(false)



    async function handleSubmit(e) {

        e.preventDefault()
        if (dockInfo.title === '') {
            setError(true)
            return null
        }
        setError(false)

        
        try {

            const response = await api.patch(`/api/rooms/${dockData.id}/`, dockInfo)
            
            if (response.data.message === "successful") {
                console.log("Server response: request valid\n", response.data);
                navigate('/home')
            } else {
                console.log("Server response: request invalid\n", response.data);
            }
            
        } catch (error) {
            console.error("=========== API request error ===========\n", error.message)
            // server error
        }

    }


    return (
        <div className="h-[500px] flex justify-center items-center">
            <form action="" className="flex bg-gray-600 p-10 gap-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input name='title' value={dockInfo.title} onChange={(e)=> setDockInfo({...dockInfo, title: e.target.value})} className="flex-grow-0 flex-shrink-0 w-52 h-10 bg-gray-700"/>
                    {error ? <div>Title cant be empty</div> : null}
                </div>

                <label htmlFor="body">Body</label>
                <textarea name='body' value={dockInfo.body} onChange={(e)=> setDockInfo({...dockInfo, body: e.target.value})} className="w-[300px] h-52 bg-gray-700"/>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}