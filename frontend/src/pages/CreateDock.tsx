import api from "../api"
import { useState, useEffect } from "react"

export default function CreateDock() {
    const [topics, setTopics] = useState([])

    const [dockInfo, setDockInfo] = useState({
        title: '',
        body: '',
        topic: '',
    })

    const [error, setError] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        if (dockInfo.title === '' || dockInfo.topic === '') { 
            setError(true)
            return null
        }
        setError(false)

        try {
            const response = await api.post('/api/rooms/', dockInfo);
            
            if (response.data.message === "successful") {
                console.log("Server response: request valid\n", response.data);
            } else {
                console.log("Server response: request invalid\n", response.data);
            }
            
        } catch (error) {
            console.error("=========== API request error ===========\n", error.message)
            // server error
        }
    }

    async function getAllTopics() {
        try {

            const response = await api.get(`/api/topics/`)
            console.log("Server response: request valid\n", response.data.results);
            
            setTopics(response.data.results)
                
            
        } catch (error) {
            console.error("=========== API request error ===========\n", error.message)
            // server error
        }

        
    }

    useEffect(()=>{
        getAllTopics()
    }, [])


    return (

        <div className="h-[500px] flex justify-center items-center">
            <form action="" className="flex bg-gray-600 p-10 gap-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input 
                        name='title' 
                        value={dockInfo.title} 
                        onChange={(e) => setDockInfo({ ...dockInfo, title: e.target.value })} 
                        className="flex-grow-0 flex-shrink-0 w-52 h-10 bg-gray-700" 
                    />
                    {error && dockInfo.title === '' ? <div>Title can't be empty</div> : null}
                </div>
                
                <div>
                    <label htmlFor="body">Body</label>
                    <textarea 
                        name='body' 
                        value={dockInfo.body} 
                        onChange={(e) => setDockInfo({ ...dockInfo, body: e.target.value })} 
                        className="w-[300px] h-52 bg-gray-700" 
                    />
                </div>

                <div>
                    <label htmlFor="topics">Topic</label>
                    <select 
                        id="topics" 
                        name="options" 
                        value={dockInfo.topic} 
                        onChange={(e) => setDockInfo({ ...dockInfo, topic: e.target.value })} 
                        className="w-20 h-5"
                    >
                        <option value="" disabled>Select an option</option>
                        {topics.map((ele, index)=>(
                            <option key={index} value={ele.id}>{ele.name}</option>
                        ))
                        }
                    </select>
                    {error && dockInfo.topic === '' ? <div>Topic can't be empty</div> : null}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
