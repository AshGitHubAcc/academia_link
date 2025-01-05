import api from "../api"
import { useState } from "react"

export default function CreateDock() {

    const [dockInfo, setDockInfo] = useState({
        title: '',
        body: '',
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

            const response = await api.post('/api/rooms/', dockInfo)
            console.log("Scuessful", response)

            
        } catch (error) {
            console.log('erorr: ', error)
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