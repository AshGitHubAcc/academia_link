
import api from "../api"


export default function Testing() {

    
    async function fetchData() {
        try {

            const response = await api.get(`/api/messages/`)
            console.log(response.data)
    
            
        } catch (error) {
            console.log("ERROR: ", error)
        }
    }

    fetchData()




    return (

        <div>
            Testing
        </div>
    )
}